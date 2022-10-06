from fastapi import FastAPI
from routers import customers

app = FastAPI()


@app.get("/is_working")
def is_working():
    return {"message": "Hello World"}

app.include_router(customers.router)