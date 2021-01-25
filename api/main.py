from fastapi import Depends, FastAPI
from sqlalchemy.orm import Session

from new_years_day import CreateTask, Task, TaskRepo, db

db.init()
app = FastAPI()


@app.post("/task", response_model=Task)
async def add_task(task: CreateTask, session: Session = Depends(db.get_db)):
    task_repo = TaskRepo(session)
    return task_repo.create_task(task)
