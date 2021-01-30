from typing import List

from sqlalchemy.orm import Session

from ..db import WorkTable
from ..models import Work, CreateWork


class WorkRepo:
    def __init__(self, db: Session):
        self._db = db

    def create_work(self, work: CreateWork) -> Work:
        db_work = WorkTable(
            duration_minutes=work.duration_minutes, task_id=work.task_id
        )
        self._db.add(db_work)
        self._db.commit()
        self._db.refresh(db_work)
        return db_work
