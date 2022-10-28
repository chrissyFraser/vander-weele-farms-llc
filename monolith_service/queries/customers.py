from pydantic import BaseModel
from typing import Optional, List, Union
from queries.pool import pool


class CustomerIn(BaseModel):
    customer_name: str
    customer_address: str
    customer_email: str
    priority_id: Optional[int]
    driver_id: Optional[int]


class CustomerOut(BaseModel):
    # id: int | None = None
    customer_name: str | None = None
    customer_address: str | None = None
    customer_email: str | None = None
    priority_id: Optional[int] | None = None
    driver_id: Optional[int] | None = None
    driver_name: Optional[str] | None = None


class Error(BaseModel):
    message: str


class Customer_Patch(BaseModel):
    priority_id: Optional[int] | None = None
    driver_id: Optional[int] | None = None


class CustomerRepository:
    def get_all_customers(self) -> Union[Error, List[CustomerOut]]:
        # try:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT c.id as customer_id, c.customer_name,
                        c.customer_address,
                        c.customer_email, c.priority_id,
                        d.id as driver_id, d.id, d.driver_name
                    FROM customer c
                    JOIN driver d on(c.driver_id = d.id)
                    """,
                )

                return [
                    self.record_to_customer_out(record) for record in result
                ]
        # except Exception as e:
        #     return {"message": "could not get all customers"}

    def create_customer(
        self, customer: CustomerIn
    ) -> Union[CustomerOut, Error]:
        id = None
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO customer(
                        customer_name,
                        customer_address,
                        customer_email,
                        priority_id,
                        driver_id
                    )
                    VALUES
                        (%s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        customer.customer_name,
                        customer.customer_address,
                        customer.customer_email,
                        customer.priority_id,
                        customer.driver_id,
                    ],
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
                "customer_name",
                "customer_address",
                "customer_email",
                "priority_id",
                "driver_id",
            ]
            for i, column in enumerate(description):
                if column.driver_id in customer_fields:
                    customer[column.driver_id] = row[i]
                customer["id"] = customer["id"]
            driver = {}
            driver_fields = ["id", "driver_name"]
            for i, column in enumerate(description):
                if column.id in driver_fields:
                    driver["id"] = driver["id"]
            customer["driver_id"] = driver["id"]
        return customer

    def customer_in_to_out(self, id: int, customer: CustomerIn):
        old_data = customer.dict()
        print(old_data)
        return CustomerOut(id=id, **old_data)

    def record_to_customer_out(self, record):
        print(record)
        return CustomerOut(
            id=record[0],
            customer_name=record[1],
            customer_address=record[2],
            customer_email=record[3],
            priority_id=record[4],
            driver_id=record[6],
            driver_name=record[7],
        )

    def get_one_customer(self, customer_id: int) -> Optional[CustomerOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT c.id as customer_id, c.customer_name,
                                c.customer_address,
                                c.customer_email, c.priority_id,
                                d.id as driver_id, d.id, d.driver_name
                        FROM customer c
                        JOIN driver d on(c.driver_id = d.driver_id)
                        WHERE c.id = %s
                        """,
                        [customer_id],
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
                        [customer_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def update_customer(
        self, customer_id: int, customer: CustomerIn
    ) -> Union[CustomerOut, Error]:
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
                          , priority_id = %s
                          , driver_id = %s
                        WHERE id = %s
                        """,
                        [
                            customer.customer_name,
                            customer.customer_address,
                            customer.customer_email,
                            customer.priority_id,
                            customer.driver_id,
                            customer_id,
                        ],
                    )
                    # old_data = customer.dict()
                    # return CustomerOut(id=customer_id, **old_data)
                    return self.customer_in_to_out(customer_id, customer)
        except Exception as e:
            print(e)
            return {"message": "Could not update that customer"}

    def update_customer_ids(
        self, customer_id: int, customer: Customer_Patch
    ) -> CustomerOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    lst = [
                        item[0]
                        for item in dict(customer).items()
                        if item[1] is not None
                    ]
                    columns = " = %s, ".join(lst) + " = %s"
                    lst_params = [
                        item
                        for item in dict(customer).values()
                        if item is not None
                    ]
                    lst_params.append(customer_id)
                    db.execute(
                        f"""
                        UPDATE customer
                        SET {columns}
                        WHERE id = %s
                        """,
                        lst_params,
                    )
                    conn.commit()
                    return self.get_one_customer(customer_id)
        except Exception as e:
            print(e)
            return {"Message": "Could not update that produce"}
