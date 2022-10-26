from fastapi.testclient import TestClient
from main import app
from queries.customers import CustomerIn
# from queries.produce import ProduceQueries


class FakeCreateCustomer:
    def create_customer(self, customer):
        if customer is not None:
            return passing_response


client = TestClient(app)
headers = {
    "Authorization": f"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3ODIzYjJhMi0yYTg0LTRmOWEtODBhMi05YzdhNmM1ODczZGMiLCJleHAiOjE2NjY3NTQyNTEsInN1YiI6Im1lQG1lLmNvbSIsImFjY291bnQiOnsiaWQiOiIxIiwiZW1haWwiOiJtZUBtZS5jb20iLCJ1c2VybmFtZSI6ImFkbWluIGFkbWluIiwiaGFzaGVkX3Bhc3N3b3JkIjoiJDJiJDEyJG1wQ2tFdy5UNElYMkFWbUM1ZndOZmVmSW5TTFhqSjEwL0toYi90VmZXOUlNZ011Q2tHcHN5In19.11rS1hIh33Yr9a21tkkMK6gDIITv5oLqWQtc9xkOs_o"
    }
    
passing_response = {
    "customer_name": "Carl Weezer",
    "customer_address": "123 Butt street",
    "customer_email": "me@me.com",
    "priority_id": 1,
    "driver_id": 1,
}



def test_create_customer():
    app.dependency_overrides[CustomerIn] = FakeCreateCustomer
    response = client.post(
        "/api/customers/",
        json={
            "customer_name": "Carl Weezer",
            "customer_address": "123 Butt street",
            "customer_email": "me@me.com",
            "priority_id": 1,
            "driver_id": 1,
        },
        headers=headers,)
    print('################LOOK HERE#################', response.json())
    assert response.status_code == 200
    assert response.json() == passing_response
    app.dependency_overrides = {}
