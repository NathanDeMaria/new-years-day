import json
import os
from typing import Tuple

import boto3
from sqlalchemy import create_engine


def create_db_engine():
    # Ew, but it gets the job done
    url = os.getenv("DB_URL")
    if url is None:
        raise ValueError("No DB_URL found")
    if url.startswith("sqlite"):
        return create_engine(url, connect_args={"check_same_thread": False})
    username, password = _get_username_password()
    db_name = os.environ["DB_NAME"]
    return create_engine(f"mysql+mysqldb://{username}:{password}@{url}/{db_name}")


def _get_username_password() -> Tuple[str, str]:
    secret_name = "new-years-day/db"
    region_name = "us-east-2"
    session = boto3.session.Session()
    client = session.client(service_name="secretsmanager", region_name=region_name)
    get_secret_value_response = client.get_secret_value(SecretId=secret_name)
    secret = json.loads(get_secret_value_response["SecretString"])
    return secret["username"], secret["password"]
