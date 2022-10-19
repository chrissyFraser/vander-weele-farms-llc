from typing import Union, List, Optional
from fastapi import APIRouter, Depends, Response
from queries.customers import (
    CustomerIn,
    CustomerOut,
    CustomerRepository,
    Error,
    Customer_Patch,
)
from authenticator import authenticator

router = APIRouter()


# @router.get("/api/things")
# async def get_things(
#     account_data: Optional[dict] = Depends(authenticator.try_get_current_account_data),
# ):
#     if account_data:
#         return personalized_list
#     return general_list


@router.post("/customers", response_model=Union[CustomerOut, Error])
def create_a_customer(
    customer: CustomerIn,
    response: Response,
    repo: CustomerRepository = Depends(),
    account_data: Optional[dict] = Depends(authenticator.get_current_account_data),
):
    if "admin" in account_data.get("roles"):
        print("Yay!!!!!!!!!!!!!!!!!!", account_data)
        response.status_code = 200
        return repo.create_customer(customer)
    else:
        response.status_code = 404
        return "Unauthorized"


@router.get("/customers", response_model=Union[List[CustomerOut], Error])
def get_all_customers(
    repo: CustomerRepository = Depends(),
    account_data: Optional[dict] = Depends(authenticator.get_current_account_data),
):
    if "admin" in account_data.get("roles"):
        return repo.get_all_customers()


@router.get("/customers/{customer_id}", response_model=Optional[CustomerOut])
def get_one_customer(
    customer_id: int,
    response: Response,
    repo: CustomerRepository = Depends(),
    account_data: Optional[dict] = Depends(authenticator.get_current_account_data),
) -> CustomerOut:
    if "admin" in account_data.get("roles"):
        customer = repo.get_one_customer(customer_id)
        if customer is None:
            response.status_code = 404
        return customer


@router.put("/customers/{customer_id}", response_model=Union[CustomerOut, Error])
def update_customer(
    customer_id: int,
    customer: CustomerIn,
    repo: CustomerRepository = Depends(),
    account_data: Optional[dict] = Depends(authenticator.get_current_account_data),
) -> Union[Error, CustomerOut]:
    if "admin" in account_data.get("roles"):
        return repo.update_customer(customer_id, customer)


@router.delete("/customers/{customer_id}", response_model=bool)
def delete_customer(
    customer_id: int,
    repo: CustomerRepository = Depends(),
    account_data: Optional[dict] = Depends(authenticator.get_current_account_data),
) -> bool:
    if "admin" in account_data.get("roles"):
        return repo.delete_customer(customer_id)


@router.patch("/customers/{customer_id}", response_model=CustomerOut)
def updata_customer_ids(
    customer_id: int,
    customer: Customer_Patch,
    repo: CustomerRepository = Depends(),
    account_data: Optional[dict] = Depends(authenticator.get_current_account_data),
) -> CustomerOut:
    if "admin" in account_data.get("roles"):
        return repo.update_customer_ids(
            customer_id,
            Customer_Patch(
                priority_id=customer.priority_id, driver_id=customer.driver_id
            ),
        )
