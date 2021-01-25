from pydantic import BaseModel


class CreateTask(BaseModel):
    name: str
    weight: float


class Task(CreateTask):
    task_id: str

    class Config:
        orm_mode = True
