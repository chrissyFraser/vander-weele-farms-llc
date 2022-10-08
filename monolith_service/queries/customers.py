from pydantic import BaseModel
from typing import Optional, List, Union
from queries.pool import pool

class CustomerIn(BaseModel):
    customer_name: str
    customer_address: str
    customer_email: str
    driver_id: Optional[int]
    priority_id: Optional[int]

class CustomerOut(BaseModel):
    id: int
    customer_name: str
    customer_address: str
    customer_email: str
    driver_id: Optional[int]
    priority_id: Optional[int]

class Error(BaseModel):
    message: str


class CustomerRepository:


    def get_all_customers(self) -> Union[Error, List[CustomerOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, customer_name, customer_address, customer_email, driver_id, priority_id
                        FROM customer
                        """
                    )
                    # result = []
                    # for record in db:
                    #     customer = CustomerOut(
                    #         id = record[0],
                    #         customer_name = record[1],
                    #         customer_address = record[2],
                    #         customer_email = record[3],
                    #         driver_id= record[4],
                    #         priority_id= record[5],
                    #     )
                    #     result.append(customer)
                    # return result
                    return [ 
                        self.record_to_customer_out(record)
                        for record in result
                    ]
        except Exception as e:
            return {"message": "could not get all customers"}

    def create_customer(self, customer: CustomerIn) -> Union[CustomerOut, Error]:
        id = None
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO customer(
                        customer_name, 
                        customer_address, 
                        customer_email, 
                        driver_id, 
                        priority_id
                    )
                    VALUES
                        (%s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        customer.customer_name,
                        customer.customer_address,
                        customer.customer_email,
                        customer.driver_id,
                        customer.priority_id
                    ]
                )
                id = result.fetchone()[0]
                # old_data = customer.dict()
                # return CustomerOut(id=id, **old_data)
                return self.customer_in_to_out(id, customer)

    def customer_in_to_out(self, id: int, customer: CustomerIn):
        old_data = customer.dict()
        return CustomerOut(id = id, **old_data)
    
    def record_to_customer_out(self, record):
        return CustomerOut(
            id = record[0],
            customer_name = record[1],
            customer_address = record[2],
            customer_email = record[3],
            driver_id= record[4],
            priority_id= record[5],
        )





    def get_one_customer(self, customer_id: int) -> Optional[CustomerOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                            , customer_name
                            , customer_address
                            , customer_email
                            , driver_id
                            , priority_id
                        FROM customer
                        WHERE id = %s
                        """,
                        [customer_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_customer_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that customer"}
    
    def delete_customer(self, customer_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM customer
                        WHERE id = %s
                        """,
                        [customer_id]
                    )
                    return True
        except  Exception as e:
            print(e)
            return False

    def update_customer(self, customer_id: int, customer: CustomerIn) -> Union[CustomerOut, Error]:
        try:
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE customer
                        SET customer_name = %s
                          , customer_address = %s
                          , customer_email = %s
                          , driver_id = %s
                          , priority_id = %s
                        WHERE id = %s
                        """,
                        [
                            customer.customer_name,
                            customer.customer_address,
                            customer.customer_email,
                            customer.driver_id,
                            customer.priority_id,
                            customer_id
                        ]
                    )
                    # old_data = customer.dict()
                    # return CustomerOut(id=customer_id, **old_data)
                    return self.customer_in_to_out(customer_id, customer)
        except Exception as e:
            print(e)
            return {"message": "Could not update that customer"}
