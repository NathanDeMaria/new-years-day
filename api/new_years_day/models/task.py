from new_years_day.db.base import Base
from pydantic import BaseModel

from .camel import to_camel


class BaseTask(BaseModel):
    name: str
    weight: float


class CreateTask(BaseModel):
    pass


class Task(BaseTask):
    task_id: str

    class Config:
        orm_mode = True
        alias_generator = to_camel
        allow_population_by_field_name = True
