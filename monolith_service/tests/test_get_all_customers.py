from main import app
from queries.customers import CustomerRepository, CustomerOut
from fastapi.testclient import TestClient




get_all_customers = CustomerOut(id=121, name='me', email='me@123.com', address='me@123.com', )
get_accounts_list = [get_all_customers]


class FakeGetAllCustomers:
    def get_all_customers(self):
        return get_accounts_list



client = TestClient(app)



def test_get_customers():
    app.dependency_overrides[CustomerRepository] = FakeGetAllCustomers
    response = client.get("/api/customers")
    assert response.status_code == 200
    assert response.json() == get_accounts_list
    app.dependency_overrides = {}  