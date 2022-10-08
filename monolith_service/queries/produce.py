from typing import Union, List, Optional
from optparse import Values
import os
from tkinter import INSERT
from pydantic import BaseModel
from queries.pool import pool

class Produce_create(BaseModel):
    product_name: str
    picture_file: Optional[str]
    available: bool
    height: int
    length: int
    width: int
    

class Produce_get(BaseModel):
    id: int
    product_name: str
    picture_file: Optional[str]
    available: bool
    height: int
    length: int
    width: int




class ProduceQueries:
    def create_produce(self, produce: Produce_create) -> Produce_get:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                result = cur.execute(
                    """
                    INSERT INTO produce(
                        product_name,
                        picture_file,
                        available,
                        height,
                        length,
                        width
                    )
                    VALUES(%s, %s, %s, %s, %s, %s)
                    RETURNING id
                    """,
                    [
                        produce.product_name,
                        produce.picture_file,
                        produce.available,
                        produce.height,
                        produce.length,
                        produce.width,
                    ]
                )
                id = result.fetchone()[0]
                print(id)
                return self.produce_in_to_out(id, produce)
                
        # if id is not None:
        #     return self.get_produce(id)
        
        
    def get_all_produce(self)-> list[Produce_get]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT 
                    id, 
                    product_name,
                    picture_file,
                    available,
                    height,
                    length,
                    width
                    FROM produce
                    ORDER BY id;
                    """
                )
                result = []
                for record in db:
                    produce = Produce_get(
                        id = record[0],
                        product_name = record[1],
                        picture_file = record[2],
                        available = record[3],
                        height= record[4],
                        length = record[5],
                        width = record[6]
                    )
                    result.append(produce)
                print(produce)
                return result
                # rows = cur.fetchall()
                # return [
                #     self.record_to_produce_out(record)
                #     for record in db
                # ]
            
    def record_to_produce_out(self, record):
        return Produce_get(
            id = record[0],
            product_name = record[1],
            picture_file = record[2],
            available = record[3],
            height= record[4],
            length = record[5],
            width = record[6]
        )
        
    def produce_in_to_out(self, id: int, produce: Produce_create):
        old_data = produce.dict()
        return Produce_get(id =id, **old_data)