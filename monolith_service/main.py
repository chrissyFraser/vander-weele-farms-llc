from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from routers import produce
app = FastAPI()


@app.get("/is_working")
def is_working():
    return {"message": "Hello World"}

app.include_router(produce.router)