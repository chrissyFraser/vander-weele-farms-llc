from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator
from typing import Union, List, Optional
from pydantic import BaseModel

from queries.accounts import (
    AccountIn,
    AccountOut,
    AccountQueries,
    DuplicateAccountError,
)
from queries.accounts import AccountOutWithPassword

class AccountForm(BaseModel):
    username: str
    password: str

class AccountToken(Token):
    account: AccountOut

class HttpError(BaseModel):
    detail: str

class AccountStatus(BaseModel):
    status: bool

router = APIRouter()


@router.post("/api/accounts", response_model=AccountStatus | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    accounts: AccountQueries = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = accounts.create(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.email, password=info.password)
    print(info.username)
    return AccountStatus(status=True)
    # form = AccountForm(username=info.email, password=info.password)
    # token = await authenticator.login(response, request, form, accounts)
    # return AccountToken(account=account, **token.dict())
    



@router.get("/api/accounts/{account_id}", response_model=Optional[AccountOut])
def get_one_account(
    account_id: str,
    response: Response,
    repo: AccountQueries = Depends(),
) -> AccountOut:
    account = repo.get(account_id)
    if account is None:
        response.status_code = 404
    print("ACCOUNT", account_id)
    return account


@router.get("/api/accounts", response_model=List[AccountOut])
def get_all_accounts(
    repo: AccountQueries = Depends(),
):
    return repo.get_all_accounts()