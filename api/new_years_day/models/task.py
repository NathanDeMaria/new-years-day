from new_years_day.db.base import Base
from pydantic import BaseModel


def _to_camel(snake: str) -> str:
    words = snake.split("_")
    return "".join([words[0], *map(str.title, words[1:])])


class BaseTask(BaseModel):
    name: str
    weight: float


class CreateTask(BaseModel):
    pass


class Task(BaseTask):
    task_id: str

    class Config:
        orm_mode = True
        alias_generator = _to_camel
        allow_population_by_field_name = True
