from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()


@app.get("/is_working")
def is_working():
    return {"message": "Hello World"}