from typing import Union, List
from fastapi import APIRouter, Depends, Response
from queries.customers import CustomerIn, CustomerOut, CustomerRepository, Error

router = APIRouter()

@router.post("/customers", response_model=Union[CustomerOut, Error])
def create_a_customer(
    customer: CustomerIn,
    response: Response,
    repo: CustomerRepository = Depends()
):
    response.status_code = 400
    return repo.create_customer(customer)

@router.get("/customers", response_model=Union[list[CustomerOut], Error])
def get_all(
    repo: CustomerRepository = Depends(),
):
    return repo.get_all()