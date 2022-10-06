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
    def get_all(self) -> Union[Error, List[CustomerOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, customer_name, customer_address, customer_email, driver_id, priority_id
                        FROM customers
                        """
                    )
                    result = []
                    for record in db:
                        customer = CustomerOut(
                            id = record[0],
                            customer_name = record[1],
                            customer_address = record[2],
                            customer_email = record[3],
                            driver_id= record[4],
                            priority_id= record[5],
                        )
                        result.append(customer)
                    return result
        except Exception as e:
            return {"message": "could not get all customers"}

    def create_customer(self, customer: CustomerIn) -> CustomerOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO customers
                        (customer_name, customer_address, customer_email, driver_id, priority_id)
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
                old_data = customer.dict()
                return CustomerOut(id=id, **old_data)