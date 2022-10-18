
from typing import Literal, Union, Optional
from urllib import response
from fastapi import APIRouter, Depends, Response
from fastapi.encoders import jsonable_encoder
from queries.produce import Error, Produce_update_available, ProduceQueries, Produce_get, Produce_create, ProduceDataClass, ProduceRequest


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
    response: Response,
    queries: ProduceQueries = Depends(),
)-> Produce_get:
    produce = queries.get_single_produce_item(produce_id)
    if response is None:
        response.status_code = 404
    return produce

@router.put("/api/produce/{produce_id}/put", response_model = Union[Produce_get, Error])
def update_produce(
    produce_id: int,
    produce: Produce_create,
    queries: ProduceQueries = Depends(),
) -> Union[Produce_get, Error]:
    return queries.update_produce(produce_id, produce)

@router.delete("/api/produce/{produce_id}/delete", response_model = bool)
def delete_produce(
    produce_id: int,
    queries: ProduceQueries = Depends(),
)-> bool:
    return queries.delete_produce(produce_id)


@router.patch("/api/produce/{produce_id}/patch", response_model = Produce_get)
def update_produce_available(
    produce_id: int,
    produce: Produce_update_available,
    queries: ProduceQueries = Depends(),
) -> Produce_get:
    # print(produce)
    return queries.update_produce_available(produce_id, Produce_update_available(
        product_name = produce.product_name,
        picture_file = produce.picture_file,
        available = produce.available,
        height = produce.height, 
        length = produce.length, 
        width = produce.width
        ))

