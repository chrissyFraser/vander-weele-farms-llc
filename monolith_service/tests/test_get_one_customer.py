from main import app
from queries.customers import CustomerRepository, CustomerOut
from fastapi.testclient import TestClient




get_one_customer = CustomerOut(id=1, name='me', email='me@123.com', address='me@123.com')



class FakeGetOneCustomer:
    def get_one_customer(self):
        return get_one_customer

class FakeCustomerData:
    def get_current_account_data(self):
        return {}

client = TestClient(app)


def test_get_one_customer():
    app.dependency_overrides[CustomerRepository] = FakeGetOneCustomer
    response = client.get("/api/customers")
    # client.get("/api/customers/1", json={"id": "1", "email": "me@me.com", "username": "steve"})
    assert response.status_code == 401
    #assert response.json() == passing_response
    app.dependency_overrides = {}