from pydantic import BaseModel
from typing import Optional, List, Union
from queries.pool import pool

class CustomerIn(BaseModel):
    name: str
    email: str
    address: str

class CustomerOut(BaseModel):
    id: int
    name: str
    email: str
    address: str

class Error(BaseModel):
    message: str


class CustomerRepository:

    def get_all_customers(self) -> Union[Error, List[CustomerOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT c.id as customer_id, c.name, c.email, c.address
                        FROM customer c
                        """,
                    )
                    
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
                        name, 
                        email, 
                        address
                    )
                    VALUES
                        (%s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        customer.name,
                        customer.email,
                        customer.address
                    ]
                )
                id = result.fetchone()[0]
                # old_data = customer.dict()
                # return CustomerOut(id=id, **old_data)
                print(customer)
                return self.customer_in_to_out(id, customer)
                

    def customer_record_to_dict(self, row, description):
        customer = None
        if row is not None:
            customer = {}
            customer_fields = [
                "id",
                "name",
                "email",
                "address",
            ]
        return customer

    def customer_in_to_out(self, id: int, customer: CustomerIn):
        old_data = customer.dict()
        print(old_data)
        return CustomerOut(id = id, **old_data)
    
    def record_to_customer_out(self, record):
        print(record)
        return CustomerOut(
            id = record[0],
            name = record[1],
            email = record[2],
            address = record[3]
        )

    def get_one_customer(self, customer_id: int) -> Optional[CustomerOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT c.id as customer_id, c.name, c.email, c.address
                        FROM customer c
                        WHERE c.id = %s
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
        pass
        # try:
        #     with pool.connection() as conn:
        #         # get a cursor (something to run SQL with)
        #         with conn.cursor() as db:
        #             db.execute(
        #                 """
        #                 UPDATE customer
        #                 SET customer_name = %s
        #                   , customer_address = %s
        #                   , customer_email = %s
        #                   , priority_id = %s
        #                   , driver_id = %s
        #                 WHERE id = %s
        #                 """,
        #                 [
        #                     customer.customer_name,
        #                     customer.customer_address,
        #                     customer.customer_email,
        #                     customer.priority_id,
        #                     customer.driver_id,
        #                     customer_id
        #                 ]
        #             )
        #             # old_data = customer.dict()
        #             # return CustomerOut(id=customer_id, **old_data)
        #             return self.customer_in_to_out(customer_id, customer)
        # except Exception as e:
        #     print(e)
        #     return {"message": "Could not update that customer"}
