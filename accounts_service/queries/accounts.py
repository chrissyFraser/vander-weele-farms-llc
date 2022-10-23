from pydantic import BaseModel
from typing import List
from queries.pool import pool


class AccountIn(BaseModel):
    email: str
    password: str
    username: str


class AccountOut(BaseModel):
    id: str
    email: str
    username: str


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
                    SELECT u.id as id, u.email, u.username, u.hashed_password
                    FROM accounts u
                    ORDER BY id
                    """,
                )

                return [self.record_to_user_out(record) for record in result]

    def get(self, id: str) -> AccountOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                        SELECT u.id as id, u.email, u.username, u.hashed_password
                        FROM accounts u
                        WHERE u.id = %s
                        """,
                    [id],
                )
                record = result.fetchone()
                if record is None:
                    return None
                print(record)
                return self.record_to_user_out(record)

    def record_to_user_out(self, record):
        print("Record", record)
        return AccountOutWithPassword(
            id=record[0],
            email=record[1],
            username=record[2],
            hashed_password=record[3]
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
                        hashed_password

                    )
                    VALUES
                        (%s, %s, %s)
                    RETURNING id;
                    """,
                    [info.email, info.username, hashed_password],
                )
                id = result.fetchone()[0]

                old_data = info.dict()

                return AccountOutWithPassword(
                    id=id, hashed_password=hashed_password, **old_data
                )
    
    def update_user(
        self, id: str, account: AccountIn, hashed_password: str
    ) -> AccountOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE accounts
                        SET email = %s
                          , username = %s
                          , hashed_password = %s
                        WHERE id = %s
                        """,
                        [
                            
                            account.email,
                            account.username,
                            hashed_password,
                            id
                            
                        ],
                    )
                    
                    old_data = account.dict()
                    print(old_data)
                    return AccountOutWithPassword(id=id, hashed_password=hashed_password, **old_data)
        except Exception as e:
            print(e)
            return {"message": "Could not update that customer"}
