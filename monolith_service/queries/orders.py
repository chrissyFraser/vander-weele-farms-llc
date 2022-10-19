from sqlite3 import Cursor
from typing import Union, List, Optional
from optparse import Values
import os
from tkinter import INSERT
from pydantic import BaseModel
from queries.pool import pool
from dataclasses import dataclass
from typing import Optional, List, Union
from datetime import date



class OrderIn(BaseModel):
    customer_id: int
    produce_id: int
    driver_id: int
    order_date: date
    printed: bool

class OrderOut(BaseModel):
    id: int| None = None
    customer_id: int| None = None
    produce_id: int| None = None
    driver_id: int| None = None
    order_date: date| None = None
    printed: bool| None = None

class Error(BaseModel):
    message: str
    
class Order_Patch(BaseModel):
    id
    customer_id
    produce_id
    driver_id
    order_date
    printed



class OrderRepository:

    def get_all_orders(self) -> Union[Error, List[OrderOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        # """
                        # SELECT c.id as customer_id, c.customer_name, c.customer_address, c.customer_email, c.priority_id, 
                        #      d.id as driver_id, d.id, d.driver_name
                        # FROM customer c
                        # JOIN driver d on(c.driver_id = d.id)
                        # """,
                        # """
                        # SELECT o.id as order_id, o.order_date, o.printed,
                        #     d.id as driver_id
                        # FROM orders o
                        # JOIN driver d on(o.driver_id = d.id)

                        # SELECT o.id as order_id, o.printed,
                        #     c.id as customer_id
                        # FROM orders o
                        # JOIN customer c on(o.customer_id = c.id)

                        # SELECT o.id as order_id, o.printed,
                        #     p.id as produce_id
                        # FROM orders o
                        # JOIN produce p on(o.produce_id = p.id)
                        # """,
                        """
                        SELECT * FROM produce;
                        """

                    )
                    
                    return [ 
                        self.record_to_orders_out(record)
                        for record in result
                    ]
        except Exception as e:
            return {"message": "could not get all orders"}



    def create_order(self, order: OrderIn) -> Union[OrderOut, Error]:
        id = None
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO order(
                        customer_id
                        produce_id
                        driver_id
                        order_date
                        printed
                    )
                    VALUES
                        (%s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        order.customer_id,
                        order.produce_id,
                        order.driver_id,
                        order.order_date,
                        order.printed
                    ]
                )
                id = result.fetchone()[0]
                # old_data = order.dict()
                # return OrderOut(id=id, **old_data)
                print(order)
                return self.order_in_to_out(id, order)
                

    def order_record_to_dict(self, row, description):
        order = None
        if row is not None:
            order = {}
            order_fields = [
                "id",
                "customer_id",
                "produce_id",
                "driver_id",
                "order_date",
                "printed"
            ]
            for i, column in enumerate(description):
                if column.driver_id in order_fields:
                    order[column.driver_id] = row[i]
                order["id"] = order["id"]
            driver = {}
            driver_fields = [
                "id", 
                "driver_name"
            ]
            for i, column in enumerate(description):
                if column.id in driver_fields:
                    driver["id"] = driver["id"]
            order["driver_id"] = driver["id"]
        return order

    def order_in_to_out(self, id: int, order: OrderIn):
        old_data = order.dict()
        print(old_data)
        return OrderOut(id = id, **old_data)
    
    def record_to_order_out(self, record):
        print(record)
        return OrderOut(
            id = record[0],
            customer_id = record[1],
            produce_id = record[2],
            driver_id = record[3],
            priority_id= record[4],
            order_date= record[5],
            printed= record[6],
        )

    def get_one_order(self, order_id: int) -> Optional[OrderOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT c.id as customer_id, c.customer_name, c.customer_address, c.customer_email, c.priority_id, 
                             d.id as driver_id, d.id, d.driver_name
                        FROM customer c
                        JOIN driver d on(c.driver_id = d.driver_id)
                        WHERE c.id = %s
                        """,
                        [order_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_order_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that order"}
    
    def delete_order(self, order_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM order
                        WHERE id = %s
                        """,
                        [order_id]
                    )
                    return True
        except  Exception as e:
            print(e)
            return False

    def update_order(self, order_id: int, order: OrderOut) -> Union[OrderOut, Error]:
        try:
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE order
                        SET customer_id = %s
                          , produce_id = %s
                          , driver_id = %s
                          , order_date = %s
                          , printed = %s
                        WHERE id = %s
                        """,
                        [
                            order.customer_id,
                            order.produce_id,
                            order.driver_id,
                            order.order_date,
                            order.printed,
                            order_id
                        ]
                    )
                    # old_data = customer.dict()
                    # return CustomerOut(id=customer_id, **old_data)
                    return self.order_in_to_out(order_id, order)
        except Exception as e:
            print(e)
            return {"message": "Could not update that order"}
        
        
    def update_order_ids(self, order_id: int, order: Order_Patch) -> OrderOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    lst = [item[0] for item in dict(order).items() if item[1] is not None]
                    columns = " = %s, ".join(lst) + " = %s"
                    lst_params = [item for item in dict(order).values() if item is not None]
                    lst_params.append(order_id)
                    db.execute(
                        f"""
                        UPDATE order
                        SET {columns}
                        WHERE id = %s
                        """,
                        lst_params
                        )
                    conn.commit()
                    return self.get_one_order(order_id)
        except Exception as e:
            print(e)
            return {"message": "Could not update that produce"}