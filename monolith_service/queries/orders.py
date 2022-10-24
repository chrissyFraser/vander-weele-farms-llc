from sqlite3 import Cursor
from typing import Union, List, Optional
from optparse import Values
import os
from tkinter import INSERT
from pydantic import BaseModel
from queries.pool import pool
from dataclasses import dataclass
from typing import Optional, List, Union
from datetime import date, datetime



class OrderIn(BaseModel):
    customer_id: int
    produce_id: int
    qty: int
    driver_id: int
    order_date: str
    printed: bool

class OrderOut(BaseModel):
    id: int| None = None
    customer_name: str| None = None
    product_name: str| None = None
    qty: int| None = None
    driver_name: str| None = None
    order_date: date| None = None
    printed: bool| None = None

class Error(BaseModel):
    message: str
    
class Order_Patch(BaseModel):
    customer_id: int | None = None
    produce_id: int | None = None
    driver_id: int | None = None



class OrderRepository:

    def get_all_orders(self) -> Union[Error, List[OrderOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT o.id AS order_id, c.customer_name AS cutomer_name,
                        p.product_name AS product_name,
                        o.qty, d.driver_name AS driver_name, o.order_date, o.printed
                            
                        FROM orders AS o
                        LEFT OUTER JOIN customer c ON (o.customer_id=c.id)
                        LEFT OUTER JOIN produce p ON (o.produce_id=p.id)
                        LEFT OUTER JOIN driver d ON (o.driver_id=d.id) 
                        
                        """,

                    )
                    print(result)
                    return [ 
                        self.record_to_order_out(record)
                        for record in result
                    ]
        except Exception as e:
            return {"message": "could not get all orders"}



    def create_order(self, orders: OrderIn) -> Union[OrderOut, Error]:
        id = None
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO orders(
                        customer_id,
                        produce_id,
                        qty,
                        driver_id,
                        order_date,
                        printed
                    )
                    VALUES
                        (%s, %s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        orders.customer_id,
                        orders.produce_id,
                        orders.qty,
                        orders.driver_id,
                        orders.order_date,
                        orders.printed
                    ]
                )
                id = result.fetchone()[0]
                # old_data = orders.dict()
                # return OrderOut(id=id, **old_data)
                print(orders)
                return self.order_in_to_out(id, orders)
                

    def order_record_to_dict(self, row, description):
        orders = None
        if row is not None:
            orders = {}
            orders_fields = [
                "id",
                "customer_id",
                "produce_id",
                "qty",
                "driver_id",
                "order_date",
                "printed",
            ]
            for i, column in enumerate(description):
                if column.driver_id in orders_fields:
                    orders[column.driver_id] = row[i]
                orders["id"] = orders["id"]
            driver = {}
            driver_fields = [
                "id", 
                "driver_name"
            ]
            for i, column in enumerate(description):
                if column.id in driver_fields:
                    driver["id"] = driver["id"]
            orders["driver_id"] = driver["id"]


            for i, column in enumerate(description):
                if column.produce_id in orders_fields:
                    orders[column.produce_id] = row[i]
                orders["id"] = orders["id"]
            produce = {}
            produce_fields = [
                "id", 
                "product_name"
            ]
            for i, column in enumerate(description):
                if column.id in produce_fields:
                    produce["id"] = produce["id"]
            orders["produce_id"] = produce["id"]
            for i, column in enumerate(description):
                if column.id in produce_fields:
                    produce["id"] = produce["id"]
            orders["produce_id"] = produce["id"]


            for i, column in enumerate(description):
                if column.customer_id in orders_fields:
                    orders[column.customer_id] = row[i]
                orders["id"] = orders["id"]
            customer = {}
            customer_fields = [
                "id", 
                "customer_name"
            ]
            for i, column in enumerate(description):
                if column.id in customer_fields:
                    customer["id"] = customer["id"]
            orders["customer_id"] = customer["id"]
        
        return orders

    def order_in_to_out(self, id: int, orders: OrderIn):
        old_data = orders.dict()
        print(old_data)
        return OrderOut(id = id, **old_data)
    
    def record_to_order_out(self, record):
        print(record)
        return OrderOut(
            id=record[0],
            customer_name=record[1],
            product_name=record[2],
            qty=record[3],
            driver_name=record[4],
            order_date=record[5],
            printed=record[6],
        )

    def get_one_order(self, order_id: int) -> Optional[OrderOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT o.id AS order_id, c.customer_name AS cutomer_name,
                        p.product_name AS product_name,
                        o.qty, d.driver_name AS driver_name, o.order_date, o.printed
                            
                        FROM orders AS o
                        LEFT OUTER JOIN customer c ON (o.customer_id=c.id)
                        LEFT OUTER JOIN produce p ON (o.produce_id=p.id)
                        LEFT OUTER JOIN driver d ON (o.driver_id=d.id)
                        WHERE o.id = %s 
                        """
                        ,
                        [order_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_order_out(record)
        except Exception as e:
            print(e)
            return {"message": "could not get that order"}
    
    def delete_order(self, order_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM orders
                        WHERE id = %s
                        """,
                        [order_id]
                    )
                    return True
        except  Exception as e:
            print(e)
            return False

    def update_order(self, order_id: int, orders: OrderOut) -> Union[OrderOut, Error]:
        try:
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE orders
                        SET customer_id = %s
                          , produce_id = %s
                          , qty = %s
                          , driver_id = %s
                          , order_date = %s
                          , printed = %s
                        WHERE id = %s
                        """,
                        [
                            
                            orders.customer_id,
                            orders.produce_id,
                            orders.qty,
                            orders.driver_id,
                            orders.order_date,
                            orders.printed,
                            order_id
                        ]
                    )
                    # old_data = orders.dict()
                    # return OrdersOut(id=order_id, **old_data)
                    return self.order_in_to_out(order_id, orders)
        except Exception as e:
            print(e)
            return {"message": "could not update that order"}
        
        
    def update_order_ids(self, order_id: int, orders: Order_Patch) -> OrderOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    lst = [item[0] for item in dict(orders).items() if item[1] is not None]
                    columns = " = %s, ".join(lst) + " = %s"
                    lst_params = [item for item in dict(orders).values() if item is not None]
                    lst_params.append(order_id)
                    db.execute(
                        f"""
                        UPDATE orders
                        SET {columns}
                        WHERE id = %s
                        """,
                        lst_params
                        )
                    conn.commit()
                    return self.get_one_order(order_id)
        except Exception as e:
            print(e)
            return {"message": "could not update that order"}