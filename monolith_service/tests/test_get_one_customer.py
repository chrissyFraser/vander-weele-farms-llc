from main import app
from queries.customers import CustomerRepository, CustomerOut
from fastapi.testclient import TestClient




# get_one_customer = CustomerOut(id=1, customer_name='me', customer_email='me@123.com', customer_address='me@123.com')
# get_account = [get_one_customer]


class FakeGetOneCustomer:
    def test_one_customer(self, customer):
        if customer is not None:
            return passing_response


client = TestClient(app)
headers = {
    "Authorization": f"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3ODIzYjJhMi0yYTg0LTRmOWEtODBhMi05YzdhNmM1ODczZGMiLCJleHAiOjE2NjY3NTQyNTEsInN1YiI6Im1lQG1lLmNvbSIsImFjY291bnQiOnsiaWQiOiIxIiwiZW1haWwiOiJtZUBtZS5jb20iLCJ1c2VybmFtZSI6ImFkbWluIGFkbWluIiwiaGFzaGVkX3Bhc3N3b3JkIjoiJDJiJDEyJG1wQ2tFdy5UNElYMkFWbUM1ZndOZmVmSW5TTFhqSjEwL0toYi90VmZXOUlNZ011Q2tHcHN5In19.11rS1hIh33Yr9a21tkkMK6gDIITv5oLqWQtc9xkOs_o"
}
passing_response = {
    "id": "1",
    "email": "me@me.com",
    "username": "steve"
}


def test_get_one_customer():
    app.dependency_overrides[CustomerRepository] = FakeGetOneCustomer
    response = client.get("/api/customers/1", json={"id": "1", "email": "me@me.com", "username": "steve"}, headers=headers)
    assert response.status_code == 200
    assert response.json() == passing_response
    app.dependency_overrides = {}