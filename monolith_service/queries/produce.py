from typing import Optional
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
    id: int | None = None
    product_name: str | None = None
    picture_file: Optional[str] | None = None
    available: bool | None = None
    height: int | None = None
    length: int | None = None
    width: int | None = None


class Error(BaseModel):
    message: str


class Produce_update_available(BaseModel):
    product_name: str | None = None
    picture_file: Optional[str] | None = None
    available: Optional[bool] | None = None
    height: Optional[int] | None = None
    length: Optional[int] | None = None
    width: Optional[int] | None = None


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
                    ],
                )
                id = result.fetchone()[0]
                print(id)
                return self.produce_in_to_out(id, produce)

    def get_all_produce(self) -> list[Produce_get]:
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
                        id=record[0],
                        product_name=record[1],
                        picture_file=record[2],
                        available=record[3],
                        height=record[4],
                        length=record[5],
                        width=record[6],
                    )
                    result.append(produce)
                return result

    def record_to_produce_out(self, record):
        return Produce_get(
            id=record[0],
            product_name=record[1],
            picture_file=record[2],
            available=record[3],
            height=record[4],
            length=record[5],
            width=record[6],
        )

    def produce_in_to_out(self, id: int, produce: Produce_create):
        old_data = produce.dict()
        return Produce_get(id=id, **old_data)

    def get_single_produce_item(
        self, produce_id: int
    ) -> Optional[Produce_get]:
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
                        [produce_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_produce_out(record)
        except Exception as e:
            print(e)
            return {"message": "could not get that customer"}

    def update_produce(
        self, produce_id: int, produce: Produce_create
    ) -> Produce_get:
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
                        ],
                    )
                    return self.produce_in_to_out(produce_id, produce)
        except Exception as e:
            print(e)
            return {"message": "Could not update that produce"}

    def delete_produce(self, produce_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM produce
                        WHERE id = %s
                        """,
                        [produce_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def update_produce_available(
        self, produce_id: int, produce: Produce_update_available
    ) -> Produce_get:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    lst = [
                        item[0]
                        for item in dict(produce).items()
                        if item[1] is not None
                    ]
                    print(lst)
                    columns = " = %s, ".join(lst) + " = %s"
                    lst_params = [
                        item
                        for item in dict(produce).values()
                        if item is not None
                    ]
                    print(lst_params)
                    lst_params.append(produce_id)
                    db.execute(
                        f"""
                        UPDATE produce
                        SET {columns}
                        WHERE id = %s
                        """,
                        lst_params,
                    )
                    conn.commit()
                    return self.get_single_produce_item(produce_id)
        except Exception as e:
            print(e)
            return {"message": "Could not update that produce"}
