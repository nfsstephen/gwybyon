from fastapi import APIRouter
from typing import List
from datetime import datetime, timezone
import asyncio
from database import supabase
from models.chat import ChatMessage, ChatMessageCreate, ChatSession
from email_utils import send_chat_notification

router = APIRouter(prefix="/chat", tags=["chat"])


@router.post("/messages", response_model=ChatMessage)
async def create_chat_message(input: ChatMessageCreate):
    msg = ChatMessage(**input.model_dump())
    doc = msg.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()

    supabase.table('chat_messages').insert({
        'id': doc['id'],
        'session_id': doc['session_id'],
        'sender': doc['sender'],
        'sender_name': doc.get('sender_name', ''),
        'message': doc['message'],
        'timestamp': doc['timestamp'],
    }).execute()

    now = datetime.now(timezone.utc).isoformat()
    supabase.table('chat_sessions').upsert({
        'session_id': input.session_id,
        'visitor_name': input.sender_name or '',
        'last_message': input.message[:100],
        'last_message_at': now,
        'created_at': now,
    }, on_conflict='session_id').execute()

    if input.sender == "user":
        asyncio.create_task(
            send_chat_notification(
                input.session_id, input.message, input.sender_name or "Visitor"
            )
        )

    return msg


@router.get("/sessions/{session_id}/messages", response_model=List[ChatMessage])
async def get_session_messages(session_id: str):
    result = supabase.table('chat_messages') \
        .select('*') \
        .eq('session_id', session_id) \
        .order('timestamp', desc=False) \
        .limit(500) \
        .execute()

    messages = []
    for row in result.data:
        if isinstance(row.get('timestamp'), str):
            row['timestamp'] = datetime.fromisoformat(row['timestamp'])
        messages.append(row)
    return messages


@router.get("/sessions", response_model=List[ChatSession])
async def get_chat_sessions():
    result = supabase.table('chat_sessions') \
        .select('*') \
        .order('last_message_at', desc=True) \
        .limit(100) \
        .execute()

    sessions = []
    for row in result.data:
        for field in ['created_at', 'last_message_at']:
            if isinstance(row.get(field), str):
                row[field] = datetime.fromisoformat(row[field])
        sessions.append(row)
    return sessions
