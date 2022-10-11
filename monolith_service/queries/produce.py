from typing import Union, List, Optional
from optparse import Values
import os
from tkinter import INSERT
from pydantic import BaseModel
from queries.pool import pool
from dataclasses import dataclass




@dataclass
class ProduceDataClass:
    data: int

    def __getitem__(self, item):
        return getattr(self, item)

@dataclass
class ProduceRequest:
    Produce_get: dict
        
    def __getitem__(self, key):
        return super().__getattribute__(key)

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

class Error(BaseModel):
    message: str

class Produce_update_available(BaseModel):
    available: Optional[bool]
    # height: Optional[int]
    # length: Optional[int]
    # width: Optional[int]
    
# class Produce_update_dimensions(BaseModel):
    
#     height: Optional[int]
#     length: Optional[int]
#     width: Optional[int]



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
            width = record[6],
        )
        
    def produce_in_to_out(self, id: int, produce: Produce_create):
        old_data = produce.dict()
        return Produce_get(id =id, **old_data)
    
    
    def get_single_produce_item(self, produce_id: int) -> Optional[Produce_get]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                            , product_name
                            , picture_file
                            , available
                            , height
                            , length
                            , width
                        FROM produce
                        WHERE id = %s
                        """,
                        [produce_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_produce_out(record)
        except Exception as e:
            print(e)
            return {"message": "could not get that customer"}
        
        
    def update_produce(self, produce_id: int, produce: Produce_create) -> Produce_get:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE produce
                            SET product_name = %s
                            , picture_file = %s
                            , available = %s
                            , height = %s
                            , length = %s
                            , width = %s
                        WHERE id = %s
                        """,
                        [
                            produce.product_name,
                            produce.picture_file,
                            produce.available,
                            produce.height,
                            produce.length,
                            produce.width,
                            produce_id,
                        ]
                        )
                    return self.produce_in_to_out(produce_id, produce)
        except Exception as e:
            print(e)
            return {"message": "Could not update that produce"}
    
    
    def delete_produce(self, produce_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor()as db:
                    db.execute(
                        """
                        DELETE FROM produce
                        WHERE id = %s
                        """,
                        [produce_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False
        
        
        
        
        
    def update_produce_available(self, produce_id: int, produce: Produce_update_available) -> Produce_get:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE produce
                        SET available = %s
                        WHERE id = %s
                        """,
                        [
                            produce.available,
                            # produce.height,
                            # produce.length,
                            # produce.width,
                            produce_id
                        ]
                        )
                    return self.get_single_produce_item(produce_id)
        except Exception as e:
            print(e)
            return {"message": "Could not update that produce"}
        
        
        
# def update_produce_dimensions(self, produce_id: int, produce: Produce_update_dimensions) -> Produce_get:
#         try:
#             with pool.connection() as conn:
#                 with conn.cursor() as db:
#                     db.execute(
#                         """
#                         UPDATE produce
#                         SET  height = %s, length = %s, width = %s,
#                         WHERE id = %s
#                         """,
#                         [
#                             produce.height,
#                             produce.length,
#                             produce.width,
#                             produce_id
#                         ]
#                         )
#                     return self.get_single_produce_item() , (produce_id)
#         except Exception as e:
#             print(e)
#             return {"message": "Could not update that produce"}