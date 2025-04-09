from sqlalchemy import Column, Integer, String, Boolean, DateTime
from database import Base

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    completed = Column(Boolean, default=False)
    created_at = Column(DateTime)
