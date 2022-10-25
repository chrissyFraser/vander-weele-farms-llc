from main import app
from queries.accounts import AccountQueries, AccountOut
from fastapi.testclient import TestClient




get_one_account = AccountOut(id=111, email='me@123.com', password='helloworld', username='me')
get_accounts_list = [get_one_account]


class FakeCreateAccount:
    def get_one_account(self):
        return get_account



client = TestClient(app)



def test_create_account():
    app.dependency_overrides[AccountQueries] = FakeCreateAccount
    response = client.get("/api/accounts/111")
    assert response.status_code == 200
    assert response.json() == get_accounts_list
    app.dependency_overrides = {}  