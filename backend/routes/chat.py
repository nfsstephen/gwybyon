from fastapi import APIRouter
from typing import List
from datetime import datetime, timezone
import asyncio
from database import db
from models.chat import ChatMessage, ChatMessageCreate, ChatSession
from email_utils import send_chat_notification

router = APIRouter(prefix="/chat", tags=["chat"])


@router.post("/messages", response_model=ChatMessage)
async def create_chat_message(input: ChatMessageCreate):
    msg = ChatMessage(**input.model_dump())
    doc = msg.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.chat_messages.insert_one(doc)

    now = datetime.now(timezone.utc).isoformat()
    await db.chat_sessions.update_one(
        {"session_id": input.session_id},
        {
            "$set": {
                "last_message_at": now,
                "last_message": input.message[:100],
            },
            "$setOnInsert": {
                "session_id": input.session_id,
                "visitor_name": input.sender_name,
                "created_at": now,
            },
        },
        upsert=True,
    )

    if input.sender == "user":
        asyncio.create_task(
            send_chat_notification(
                input.session_id, input.message, input.sender_name or "Visitor"
            )
        )

    return msg


@router.get("/sessions/{session_id}/messages", response_model=List[ChatMessage])
async def get_session_messages(session_id: str):
    messages = (
        await db.chat_messages.find({"session_id": session_id}, {"_id": 0})
        .sort("timestamp", 1)
        .to_list(500)
    )
    for msg in messages:
        if isinstance(msg["timestamp"], str):
            msg["timestamp"] = datetime.fromisoformat(msg["timestamp"])
    return messages


@router.get("/sessions", response_model=List[ChatSession])
async def get_chat_sessions():
    sessions = (
        await db.chat_sessions.find({}, {"_id": 0})
        .sort("last_message_at", -1)
        .to_list(100)
    )
    for s in sessions:
        for field in ["created_at", "last_message_at"]:
            if isinstance(s.get(field), str):
                s[field] = datetime.fromisoformat(s[field])
    return sessions
