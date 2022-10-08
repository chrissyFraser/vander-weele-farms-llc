from typing import Union, List, Optional
from fastapi import APIRouter, Depends, Response
from queries.drivers import DriverIn, DriverOut, Error

router = APIRouter()