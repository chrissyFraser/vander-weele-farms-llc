import os

from fastapi.responses import JSONResponse
from fastapi import FastAPI, Header, Response
from fastapi.middleware.cors import CORSMiddleware
# from keys import ACCESS_KEY, S3_BUCKET, SECRET_ACCESS_KEY, REGION
from routers import produce, customers, drivers, orders
from typing import Any, Callable, Optional
from authenticator import authenticator
from fastapi import Depends, FastAPI
from db import AccountVOQueries
from functools import wraps

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST", "http://localhost:3000"),
        # os.environ.get["CORS_HOST", "https://vander-weele-farms-llc.gitlab.io/vander-weele-farms-llc"]
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
app.include_router(orders.router)
app.include_router(authenticator.router)
# app.include_router(keys.router)
