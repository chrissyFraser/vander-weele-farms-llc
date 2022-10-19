# authenticator.py
import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from db import AccountVOQueries, AccountVO


class MyAuthenticator(Authenticator):
    async def get_account_data(
        self,
        email: str,
        accounts: AccountVOQueries,
    ):
        pass

    def get_account_getter(
        self,
        accounts: AccountVOQueries = Depends(),
    ):
        pass

    def get_hashed_password(self, account: AccountVO):
        pass

    def get_account_data_for_cookie(self, account: AccountVO):
        pass


authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])
