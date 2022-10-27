from main import app
from queries.customers import CustomerIn
from fastapi.testclient import TestClient
# from queries.produce import ProduceQueries


class FakeCreateCustomer:
    def create_customer(self, customer):
        if customer is not None:
            return passing_response


client = TestClient(app)

passing_response = {
    "customer_name": "Carl Weezer",
    "customer_address": "123 Rainey street",
    "customer_email": "me@me.com",
    "priority_id": 1,
    "driver_id": None,
    "driver_name": None
}


def test_create_customer():
    app.dependency_overrides[CustomerIn] = FakeCreateCustomer
    response = client.post(
        "/api/customers",
        json={
            "customer_name": "Carl Weezer",
            "customer_address": "123 Rainey street",
            "customer_email": "me@me.com",
            "priority_id": 1,
            "driver_id": None,
            "driver_name": None
        }
    )
    assert response.status_code == 200
    assert response.json() == passing_response
    app.dependency_overrides = {}
