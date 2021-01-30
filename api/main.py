from typing import List
from fastapi import Depends, FastAPI
from sqlalchemy.orm import Session

from new_years_day import CreateTask, Task, TaskRepo, db, Work, WorkRepo, CreateWork

db.init()
app = FastAPI()


@app.post("/task", response_model=Task)
async def add_task(task: CreateTask, session: Session = Depends(db.get_db)):
    task_repo = TaskRepo(session)
    return task_repo.create_task(task)


@app.get("/task/all", response_model=List[Task])
async def get_tasks(session: Session = Depends(db.get_db)):
    task_repo = TaskRepo(session)
    return task_repo.get_tasks()


@app.post("/work", response_model=Work)
async def add_work(work: CreateWork, session: Session = Depends(db.get_db)):
    work_repo = WorkRepo(session)
    return work_repo.create_work(work)
