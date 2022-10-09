from typing import Union, List, Optional
from fastapi import APIRouter, Depends, Response
from queries.drivers import DriverIn, DriverOut, DriverRepository, Error

router = APIRouter()

@router.post("/drivers", response_model = Union[DriverOut, Error])
def create_a_driver(
    driver: DriverIn,
    response: Response,
    repo: DriverRepository = Depends()
):
    response.status_code = 200
    return repo.create_driver(driver)

@router.get("/drivers", response_model=Union[List[DriverOut], Error])
def get_all_drivers(
    repo:
    DriverRepository = Depends(),
):
    return repo.get_all_drivers()


@router.get("/drivers/{driver_id}", response_model=Optional[DriverOut])
def get_one_driver(
    driver_id: int,
    response: Response,
    repo: DriverRepository = Depends(),
) -> DriverOut:
    driver = repo.get_one_driver(driver_id)
    if driver is None:
        response.status_code = 404
    return driver

@router.put("/drivers/{driver_id}", response_model=Union[DriverOut, Error])
def update_driver(
    driver_id: int,
    driver: DriverIn,
    repo: DriverRepository = Depends(),
) -> Union[Error, DriverOut]:
    return repo.update_driver(driver_id, driver)

@router.delete("/drivers/{driver_id}", response_model=bool)
def delete_driver(
    driver_id: int,
    repo: DriverRepository = Depends(),
) -> bool:
    return repo.delete_driver(driver_id)