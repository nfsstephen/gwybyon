from fastapi import APIRouter
from typing import List
from datetime import datetime
from database import supabase
from models.status import StatusCheck, StatusCheckCreate

router = APIRouter(tags=["status"])


@router.get("/")
async def root():
    return {"message": "Hello World"}


@router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()

    supabase.table('status_checks').insert({
        'id': doc['id'],
        'client_name': doc['client_name'],
        'status': 'ok',
        'timestamp': doc['timestamp'],
    }).execute()

    return status_obj


@router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    result = supabase.table('status_checks') \
        .select('*') \
        .order('timestamp', desc=True) \
        .limit(1000) \
        .execute()

    checks = []
    for row in result.data:
        if isinstance(row.get('timestamp'), str):
            row['timestamp'] = datetime.fromisoformat(row['timestamp'])
        checks.append(row)
    return checks
