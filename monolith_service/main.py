from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from routers import produce, customers, drivers
app = FastAPI()


@app.get("/is_working")
def is_working():
    return {"message": "Hello World"}

app.include_router(produce.router)
app.include_router(customers.router)
app.include_router(drivers.router)