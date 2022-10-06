from typing import Union, List, Optional
from fastapi import APIRouter, Depends, Response
from queries.customers import CustomerIn, CustomerOut, CustomerRepository, Error

router = APIRouter()

@router.post("/customers/", response_model=Union[CustomerOut, Error])
def create_a_customer(
    customer: CustomerIn,
    response: Response,
    repo: CustomerRepository = Depends()
):
    response.status_code = 400
    return repo.create_customer(customer)




@router.get("/customers/", response_model=Union[List[CustomerOut], Error])
def get_all_customers(
    repo: CustomerRepository = Depends(),
):
    return repo.get_all_customers()






# @router.get("/customers/{customer_id}", response_model=Optional[CustomerOut])
# def get_one_customer(
#     customer_id: int,
#     response: Response,
#     repo: CustomerRepository = Depends(),
# ) -> CustomerOut:
#     customer = repo.get_one_customer(customer_id)
#     if customer is None:
#         response.status_code = 404
#     return customer

# @router.put("/customers/{customer_id}", response_model=Union[CustomerOut, Error])
# def update_customer(
#     customer_id: int,
#     customer: CustomerIn,
#     repo: CustomerRepository = Depends(),
# ) -> Union[Error, CustomerOut]:
#     return repo.update_customer(customer_id, customer)

# @router.delete("/customers/{customer_id}", response_model=bool)
# def delete_customer(
#     customer_id: int,
#     repo: CustomerRepository = Depends(),
# ) -> bool:
#     return repo.delete_customer(customer_id)