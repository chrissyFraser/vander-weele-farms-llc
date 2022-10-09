from typing import Literal, Union, Optional
from urllib import response
from fastapi import APIRouter, Depends, Response

from queries.produce import ProduceQueries, Produce_get, Produce_create


router = APIRouter()




@router.get("/api/produce/", response_model = list[Produce_get]) 
def get_all_produce(
    queries: ProduceQueries = Depends()):
    return queries.get_all_produce()


@router.post("/api/produce/", response_model = Produce_get)
def create_produce(
    produce: Produce_create,
    queries: ProduceQueries = Depends()
):
    return queries.create_produce(produce)

@router.get("/api/produce/{produce_id}", response_model = Optional[Produce_get])
def get_single_produce_item(
    produce_id: int,
    queries: Produce_get = Depends()
)-> Produce_get:
    produce = queries.get_single_produce_item(produce_id)
    return produce