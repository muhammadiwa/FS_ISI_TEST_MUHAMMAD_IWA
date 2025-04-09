from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class TaskBase(BaseModel):
    title: str

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    completed: Optional[bool] = None

class Task(TaskBase):
    id: int
    completed: bool
    created_at: datetime

    class Config:
        orm_mode = True
