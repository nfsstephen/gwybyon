from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from datetime import datetime, timezone
import uuid


class ChatMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    session_id: str
    sender: str
    message: str
    sender_name: Optional[str] = None
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ChatMessageCreate(BaseModel):
    session_id: str
    sender: str
    message: str
    sender_name: Optional[str] = None


class ChatSession(BaseModel):
    model_config = ConfigDict(extra="ignore")
    session_id: str
    visitor_name: Optional[str] = None
    last_message: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    last_message_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
