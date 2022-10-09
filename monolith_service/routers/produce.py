from typing import Literal, Union
from urllib import response
from fastapi import APIRouter, Depends, Response
from pydantic import BaseModel

from db import ProduceQueries


router = APIRouter()


class Produce_create(BaseModel):
    product_name: str
    picture_file: Union[str, None] = None
    available: bool
    height: int
    length: int
    width: int
    

class Produce_get(BaseModel):
    id: int
    product_name: str
    picture_file: Union[str, None] = None
    available: bool
    height: int
    length: int
    width: int




@router.get("/api/produce/", response_model = Produce_get)
def get_all_produce(queries: ProduceQueries = Depends()):
    
    return{"produce": queries.get_all_produce}


@router.post("/api/produce/", response_model = Produce_get)
def create_produce(
    produce: Produce_create,
    queries: ProduceQueries = Depends()
):
    return queries.create_produce(produce)