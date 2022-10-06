from pydantic import BaseModel
from typing import Optional, List, Union
from queries.pool import pool


class DriverIn(BaseModel):
    driver_name: str
    driver_id: int


class DriverOut(BaseModel):
    id: int
    driver_name: str
    driver_id: int
    

class Error(BaseModel):
    message: str