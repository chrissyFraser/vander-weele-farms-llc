from sqlite3 import Cursor
from typing import Union, List, Optional
from optparse import Values
import os
from tkinter import INSERT
from pydantic import BaseModel
from queries.pool import pool

class keysIn(BaseModel):
    name: str
    location: str
    access: str
    secret_key: str

class keysOut(BaseModel):
    id: int
    name: str
    location: str
    access: str
    secret_key: str