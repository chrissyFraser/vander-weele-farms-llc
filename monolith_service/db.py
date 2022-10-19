import os
from psycopg_pool import ConnectionPool
from pydantic import BaseModel

class AccountVO(BaseModel):
    id: str
    username: str
    email: str
    hashed_password: str
    roles: str

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])

class AccountVOQueries:
    pass
