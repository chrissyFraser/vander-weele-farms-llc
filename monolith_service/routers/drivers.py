from typing import Union, List, Optional
from fastapi import APIRouter, Depends, Response
from queries.drivers import DriverIn, DriverOut, DriverRepository, Error
from authenticator import authenticator


router = APIRouter()



# @router.get("/api/things")
# async def get_things(
#     account_data: Optional[dict] = Depends(authenticator.try_get_current_account_data),
# ):
#     if account_data:
#         return personalized_list
#     return general_list



@router.post("/drivers", response_model = Union[DriverOut, Error])

async def create_a_driver(
    driver: DriverIn,
    response: Response,
    repo: DriverRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    if "admin" in account_data.get("roles"):
        response.status_code = 200
        return repo.create_driver(driver)


@router.get("/drivers", response_model=Union[List[DriverOut], Error])
def get_all_drivers(
    repo:
    DriverRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    if "admin" in account_data.get("roles"):
        return repo.get_all_drivers()


@router.get("/drivers/{driver_id}", response_model=Optional[DriverOut])
def get_one_driver(
    driver_id: int,
    response: Response,
    repo: DriverRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
) -> DriverOut:
    if "admin" in account_data.get("roles"):
        driver = repo.get_one_driver(driver_id)
        if driver is None:
            response.status_code = 404
        return driver

@router.put("/drivers/{driver_id}", response_model=Union[DriverOut, Error])
def update_driver(
    driver_id: int,
    driver: DriverIn,
    repo: DriverRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
) -> Union[Error, DriverOut]:
    if "admin" in account_data.get("roles"):
        return repo.update_driver(driver_id, driver)


@router.delete("/drivers/{driver_id}", response_model=bool)
def delete_driver(
    driver_id: int,
    repo: DriverRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
) -> bool:
    if "admin" in account_data.get("roles"):
        return repo.delete_driver(driver_id)