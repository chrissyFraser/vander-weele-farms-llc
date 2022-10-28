from main import app
from queries.accounts import AccountQueries, AccountOut
from fastapi.testclient import TestClient


get_all_accounts = AccountOut(
    id=111, email="me@123.com", password="helloworld", username="me"
)
get_accounts_list = [get_all_accounts]


class FakeGetAllAccounts:
    def get_all_accounts(self):
        return get_accounts_list


client = TestClient(app)


def test_create_account():
    app.dependency_overrides[AccountQueries] = FakeGetAllAccounts
    response = client.get("/api/accounts")
    assert response.status_code == 200
    assert response.json() == get_accounts_list
    app.dependency_overrides = {}
