from typing import Union, Optional
from fastapi import APIRouter, Depends, Response, HTTPException, status
from queries.produce import (
    Error,
    Produce_update_available,
    ProduceQueries,
    Produce_get,
    Produce_create,
)
from authenticator import authenticator

router = APIRouter()

# THIS IS A TEST OF THINGS
@router.get("/api/produce/", response_model = list[Produce_get]) 
def get_all_produce(
    queries: ProduceQueries = Depends()):
        
        return queries.get_all_produce()


@router.post("/api/produce/", response_model=Produce_get)
def create_produce(
    produce: Produce_create,
    queries: ProduceQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    if "admin" in account_data.get("username"):
        print("ACCOUNT DATA", account_data)
        return queries.create_produce(produce)
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )


@router.get("/api/produce/{produce_id}", response_model=Optional[Produce_get])
def get_single_produce_item(
    produce_id: int,
    response: Response,
    queries: ProduceQueries = Depends(),
) -> Produce_get:
    produce = queries.get_single_produce_item(produce_id)
    if response is None:
        response.status_code = 404
    return produce


@router.put("/api/produce/{produce_id}/put", response_model=Union[Produce_get, Error])
def update_produce(
    produce_id: int,
    produce: Produce_create,
    queries: ProduceQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[Produce_get, Error]:
    if "admin" in account_data.get("username"):
        return queries.update_produce(produce_id, produce)
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )


@router.delete("/api/produce/{produce_id}/delete", response_model=bool)
def delete_produce(
    produce_id: int,
    queries: ProduceQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    print(account_data)
    if "admin" in account_data.get("username"):
        return queries.delete_produce(produce_id)
    else:
        print(account_data)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )


@router.patch("/api/produce/{produce_id}/patch", response_model=Produce_get)
def update_produce_available(
    produce_id: int,
    produce: Produce_update_available,
    queries: ProduceQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Produce_get:
    print(produce)
    if "admin" in account_data.get("username"):
        return queries.update_produce_available(
            produce_id,
            Produce_update_available(
                product_name=produce.product_name,
                picture_file=produce.picture_file,
                available=produce.available,
                height=produce.height,
                length=produce.length,
                width=produce.width,
            ),
        )
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )
