from typing import Literal, Union
from urllib import response
from fastapi import APIRouter, Depends, Response
from pydantic import BaseModel

from db import ProductQueries


router = APIRouter()


class Product_create(BaseModel):
    product_name: str
    picture_file: Union[str, None] = None
    available: bool
    height: int
    length: int
    width: int
    

class Products_get(BaseModel):
    id: int
    product_name: str
    picture_file: Union[str, None] = None
    available: bool
    height: int
    length: int
    width: int


@router.get("/api/products/", response_model = Products_get)
def get_products(queries: ProductQueries = Depends()):
    return{"products": queries.get_products}


@router.post("/api/products/", response_model = Products_get)
def create_product(
    product: Product_create,
    queries: ProductQueries = Depends()
):
    return queries.create_product(product)