from typing import List

from sqlalchemy.orm import Session

from ..db import TaskTable
from ..models import Task, CreateTask


class TaskRepo:
    def __init__(self, db: Session):
        self._db = db

    def create_task(self, task: CreateTask) -> Task:
        db_task = TaskTable(name=task.name, weight=task.weight)
        self._db.add(db_task)
        self._db.commit()
        self._db.refresh(db_task)
        return db_task

    def get_tasks(self) -> List[Task]:
        return self._db.query(TaskTable).all()
