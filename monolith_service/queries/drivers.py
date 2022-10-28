from pydantic import BaseModel
from typing import Optional, List, Union
from queries.pool import pool


class DriverIn(BaseModel):
    driver_name: str


class DriverOut(BaseModel):
    id: int
    driver_name: str


class Error(BaseModel):
    message: str


class DriverRepository:
    def get_all_drivers(self) -> Union[Error, List[DriverOut]]:
        # try:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id, driver_name
                    FROM driver
                    """
                )

                return [
                    self.record_to_driver_out(record) for record in result
                ]
        # except Exception as e:
        #     return {"message": "Could not get all drivers"}

    def create_driver(self, driver: DriverIn) -> Union[DriverOut, Error]:
        id = None
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO driver(
                        driver_name
                    )
                    VALUES
                        (%s)
                        RETURNING id;
                    """,
                    [driver.driver_name],
                )
                id = result.fetchone()[0]
                return self.driver_in_to_out(id, driver)

    def driver_in_to_out(self, id: int, driver: DriverOut):
        old_data = driver.dict()
        return DriverOut(id=id, **old_data)

    def record_to_driver_out(self, record):
        return DriverOut(id=record[0], driver_name=record[1])

    def get_one_driver(self, driver_id: int) -> Optional[DriverOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id,
                            driver_name
                        FROM driver
                        WHERE id = %s
                        """,
                        [driver_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_driver_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that driver"}

    def delete_driver(self, driver_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM driver
                        WHERE id = %s
                        """,
                        [driver_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def update_driver(
        self, driver_id: int, driver: DriverIn
    ) -> Union[DriverOut, Error]:
        # try:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                        UPDATE driver
                        SET driver_name = %s
                        WHERE id = %s
                        """,
                    [driver.driver_name, driver_id],
                )

                return self.driver_in_to_out(driver_id, driver)
        # except Exception as e:
        #     return {"message": "Could not update that driver"}
