from typing import Union, List, Optional
from fastapi import APIRouter, Depends, Response, HTTPException, status
from queries.drivers import DriverIn, DriverOut, DriverRepository, Error
from authenticator import authenticator


router = APIRouter()


  
@router.post("/api/drivers", response_model=Union[DriverOut, Error])
async def create_a_driver(
    driver: DriverIn,
    response: Response,
    repo: DriverRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    if "admin" in account_data.get("username"):
        response.status_code = 200
        return repo.create_driver(driver)
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )


@router.get("/drivers", response_model=Union[List[DriverOut], Error])
def get_all_drivers(
    repo: DriverRepository = Depends(),
    # account_data: dict = Depends(authenticator.get_current_account_data),
):
    if "admin" in account_data.get("username"):
        return repo.get_all_drivers()
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )




@router.get("/api/drivers/{driver_id}", response_model=Optional[DriverOut])
def get_one_driver(
    driver_id: int,
    response: Response,
    repo: DriverRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> DriverOut:
    if "admin" in account_data.get("username"):
        driver = repo.get_one_driver(driver_id)
        if driver is None:
            response.status_code = 404
        return driver
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )


@router.put("/api/drivers/{driver_id}", response_model=Union[DriverOut, Error])
def update_driver(
    driver_id: int,
    driver: DriverIn,
    repo: DriverRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[Error, DriverOut]:
    if "admin" in account_data.get("username"):
        return repo.update_driver(driver_id, driver)
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )


@router.delete("/api/drivers/{driver_id}", response_model=bool)
def delete_driver(
    driver_id: int,
    repo: DriverRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    if "admin" in account_data.get("username"):
        return repo.delete_driver(driver_id)
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )
