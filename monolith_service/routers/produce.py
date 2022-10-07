from typing import Literal, Union
from urllib import response
from fastapi import APIRouter, Depends, Response
from pydantic import BaseModel
from queries.produce import ProduceQueries, Produce_get, Produce_create


router = APIRouter()




@router.get("/api/produce/", response_model = Produce_get)
def get_all_produce(queries: ProduceQueries = Depends()):
    return{"produce": queries.get_all_produce}


@router.post("/api/produce/", response_model = Produce_get)
def create_produce(
    produce: Produce_create,
    queries: ProduceQueries = Depends()
):
    return queries.create_produce(produce)