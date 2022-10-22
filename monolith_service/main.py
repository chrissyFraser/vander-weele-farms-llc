import os

from fastapi.responses import JSONResponse
from fastapi import FastAPI, Header, Response
from fastapi.middleware.cors import CORSMiddleware
from routers import produce, customers, drivers, keys
from typing import Any, Callable, Optional
from authenticator import authenticator
from fastapi import Depends, FastAPI
from db import AccountVOQueries
from functools import wraps

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST", "http://localhost:3000")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/is_working")
def is_working():
    return {"message": "Hello World"}

app.include_router(produce.router)
app.include_router(customers.router)
app.include_router(drivers.router)
app.include_router(authenticator.router)
app.include_router(keys.router)
