from typing import List, Optional

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

    def get_works(self, offset: int = 0, limit: Optional[int] = None) -> List[Work]:
        if limit is None:
            assert offset == 0, "limit = None and offset = 0 mean 'get all'"
            return self._db.query(WorkTable).all()
        return self._db.query(WorkTable).limit(limit).offset(offset).all()
