from sqlalchemy import Column, Float, Integer, String
from sqlalchemy.orm import relationship

from .base import Base


class TaskTable(Base):
    __tablename__ = "task"

    task_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(32), unique=True)
    weight = Column(Float)
