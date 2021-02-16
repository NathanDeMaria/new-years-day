from sqlalchemy import Column, DateTime, Float, Integer, ForeignKey
from sqlalchemy.orm import relationship

from .base import Base


class WorkTable(Base):
    __tablename__ = "work"

    work_id = Column(Integer, primary_key=True, index=True)
    duration_minutes = Column(Float)
    time = Column(DateTime)
    task_id = Column(Integer, ForeignKey("task.task_id"))

    task = relationship("TaskTable")
