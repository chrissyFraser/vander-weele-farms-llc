from typing import Optional
from fastapi import FastAPI, Header, Response
from starlette.status import HTTP_200_OK, HTTP_401_UNAUTHORIZED
from fastapi.middleware.cors import CORSMiddleware
import os
from routers import accounts
from authenticator import authenticator

app = FastAPI()

app.include_router(accounts.router)
app.include_router(authenticator.router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST", "http://localhost:3000"),
        # os.environ.get("CORS_HOST", ["PUBLIC_URL"])
        ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

