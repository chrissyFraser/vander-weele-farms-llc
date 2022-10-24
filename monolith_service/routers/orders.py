from queries.orders import (
    OrderIn, 
    OrderOut, 
    OrderRepository, 
    Error, 
    Order_Patch,
)
from typing import Union, List, Optional
from fastapi import APIRouter, Depends, Response, HTTPException, status

router = APIRouter()

@router.post("/api/orders", response_model=Union[OrderOut, Error])
def create_order(
    orders: OrderIn,
    response: Response,
    repo: OrderRepository = Depends()
):
    response.status_code = 200
    return repo.create_order(orders)




@router.get("/api/orders", response_model=Union[List[OrderOut], Error])
def get_all_orders(
    repo: OrderRepository = Depends(),
):
    return repo.get_all_orders()






@router.get("/api/orders/{order_id}", response_model=Optional[OrderOut])
def get_one_order(
    order_id: int,
    response: Response,
    repo: OrderRepository = Depends(),
) -> OrderOut:
    order = repo.get_one_order(order_id)
    if order is None:
        response.status_code = 404
    return order

@router.put("/api/orders/{order_id}", response_model=Union[OrderOut, Error])
def update_order(
    order_id: int,
    order: OrderIn,
    repo: OrderRepository = Depends(),
) -> Union[Error, OrderOut]:
    return repo.update_order(order_id, order)

@router.delete("/orders/{order_id}", response_model=bool)
def delete_order(
    order_id: int,
    repo: OrderRepository = Depends(),
) -> bool:
    return repo.delete_order(order_id)

@router.patch("/api/orders/{order_id}", response_model = OrderOut)
def update_order_ids(
    customer_id: int,
    customer: Order_Patch,
    repo: OrderRepository = Depends(),
) -> OrderOut:
    return repo.update_order_ids(order_id, Order_Patch(
        customer_id = orders.customer_id,
        produce_id = orders.produce_id,
        driver_id = orders.driver_id
    ))