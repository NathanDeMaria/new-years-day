import os

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from .engine import create_db_engine


engine = create_db_engine()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def init():
    Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
