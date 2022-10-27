from typing import Union, List, Optional
from fastapi import APIRouter, Depends, Response, HTTPException, status
from queries.customers import (
    CustomerIn,
    CustomerOut,
    CustomerRepository,
    Error,
    Customer_Patch,
)
from authenticator import authenticator

router = APIRouter()


@router.post("/api/customers", response_model=Union[CustomerOut, Error])
def create_customer(
    customer: CustomerIn,
    response: Response,
    repo: CustomerRepository = Depends(),
    account_data: Optional[dict] = Depends(authenticator.get_current_account_data),
):
    if account_data:
        print(account_data)
        response.status_code = 200
        print("Successfully created customer")
        return repo.create_customer(customer)
    else:
        raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid token",
                    headers={"WWW-Authenticate": "Bearer"},
                )


@router.get("/api/customers", response_model=Union[List[CustomerOut], Error])
def get_all_customers(
    repo: CustomerRepository = Depends(),
    account_data: Optional[dict] = Depends(authenticator.get_current_account_data),
):
    print(account_data.get("username")) 
    if "admin" in account_data.get("username"):
            print("YES")
            return repo.get_all_customers()
    else:
        raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid token",
                    headers={"WWW-Authenticate": "Bearer"},
                )



##############################################################################

@router.get("/api/customers/{customer_id}", response_model=Optional[CustomerOut])
def get_one_customer(
    customer_id: int,
    response: Response,
    repo: CustomerRepository = Depends(),
    account_data: Optional[dict] = Depends(authenticator.get_current_account_data),
) -> CustomerOut:
    # if "admin" in account_data.get("username"):
    customer = repo.get_one_customer(customer_id)
    if customer is None:
        response.status_code = 404
        return customer
    else:
        raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid token",
                    headers={"WWW-Authenticate": "Bearer"},
                )


@router.put("/api/customers/{customer_id}", response_model=Union[CustomerOut, Error])
def update_customer(
    customer_id: int,
    customer: CustomerIn,
    repo: CustomerRepository = Depends(),
    account_data: Optional[dict] = Depends(authenticator.get_current_account_data),
) -> Union[Error, CustomerOut]:
    if "admin" in account_data.get("username"):
        return repo.update_customer(customer_id, customer)
    else:
        raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid token",
                    headers={"WWW-Authenticate": "Bearer"},
                )


@router.delete("/api/customers/{customer_id}", response_model=bool)
def delete_customer(
    customer_id: int,
    repo: CustomerRepository = Depends(),
    account_data: Optional[dict] = Depends(authenticator.get_current_account_data),
) -> bool:
    if "admin" in account_data.get("username"):
        return repo.delete_customer(customer_id)
    else:
        raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid token",
                    headers={"WWW-Authenticate": "Bearer"},
                )


@router.patch("/api/customers/{customer_id}", response_model=CustomerOut)
def updata_customer_ids(
    customer_id: int,
    customer: Customer_Patch,
    repo: CustomerRepository = Depends(),
    account_data: Optional[dict] = Depends(authenticator.get_current_account_data),
) -> CustomerOut:
    if "admin" in account_data.get("username"):
        return repo.update_customer_ids(
            customer_id,
            Customer_Patch(
                priority_id=customer.priority_id, driver_id=customer.driver_id
            ),
        )
    else:
        raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid token",
                    headers={"WWW-Authenticate": "Bearer"},
                )
