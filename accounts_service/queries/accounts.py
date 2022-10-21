from pydantic import BaseModel
from typing import List
from queries.pool import pool


class AccountIn(BaseModel):
    email: str
    password: str
    username: str
    roles: str


class AccountOut(BaseModel):
    id: str
    email: str
    username: str
    roles: str


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class DuplicateAccountError(ValueError):
    pass


class AccountQueries:
    def get_all_accounts(self) -> List[AccountOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT u.email as user_email, u.id, u.username, u.hashed_password, u.roles
                    FROM accounts u
                    """,
                )

                return [self.record_to_user_out(record) for record in result]

    def get(self, user_email: str) -> AccountOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                        SELECT u.email as user_email, u.id, u.username, u.hashed_password, u.roles
                        FROM accounts u
                        WHERE u.email = %s
                        """,
                    [user_email],
                )
                record = result.fetchone()
                if record is None:
                    return None
                print(record)
                return self.record_to_user_out(record)

    def record_to_user_out(self, record):
        print("Record", record)
        return AccountOutWithPassword(
            id=record[1],
            email=record[0],
            username=record[2],
            hashed_password=record[3],
            roles=record[4],
        )

    def create(self, info: AccountIn, hashed_password: str) -> AccountOutWithPassword:
        id = None

        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO accounts(
                        email, 
                        username,
                        hashed_password,
                        roles

                    )
                    VALUES
                        (%s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [info.email, info.username, hashed_password, info.roles],
                )
                id = result.fetchone()[0]

                old_data = info.dict()

                return AccountOutWithPassword(
                    id=id, hashed_password=hashed_password, **old_data
                )
    
