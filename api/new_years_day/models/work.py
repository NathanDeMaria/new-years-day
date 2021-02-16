from datetime import datetime
from pydantic import BaseModel

from .camel import to_camel
from .task import Task


class BaseWork(BaseModel):
    duration_minutes: float
    time: datetime


class CreateWork(BaseWork):
    task_id: str

    class Config:
        alias_generator = to_camel
        allow_population_by_field_name = True


class Work(BaseWork):
    work_id: str
    task: Task

    class Config:
        orm_mode = True
        alias_generator = to_camel
        allow_population_by_field_name = True
