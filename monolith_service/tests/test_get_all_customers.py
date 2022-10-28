from main import app
from queries.customers import CustomerRepository, CustomerOut
from fastapi.testclient import TestClient


get_all_customers = CustomerOut(
    id=8,
    name="Lolly",
    email="lolly@email.com",
    address="76 Sweets St",
)
get_accounts_list = [get_all_customers]


class FakeGetAllCustomers:
    def get_all_customers(self):
        return get_accounts_list


class FakeAccountData:
    def get_current_account_data(self):
        return {}


client = TestClient(app)
# headers = {
#     "Authorization": f"Bearer "
# }


def test_get_customers_is_protected():
    app.dependency_overrides[CustomerRepository] = FakeGetAllCustomers
    response = client.get("/api/customers")
    assert response.status_code == 401
    app.dependency_overrides = {}
    # assert response.json() == get_accounts_list
