from sqlalchemy import Column, Float, Integer, ForeignKey
from sqlalchemy.orm import relationship

from .base import Base


class WorkTable(Base):
    __tablename__ = "work"

    work_id = Column(Integer, primary_key=True, index=True)
    duration_minutes = Column(Float)
    task_id = Column(Integer, ForeignKey("task.task_id"))

    task = relationship("TaskTable")
