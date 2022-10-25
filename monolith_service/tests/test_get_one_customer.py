from main import app
from queries.customers import CustomerRepository, CustomerOut
from fastapi.testclient import TestClient




get_one_customer = CustomerOut(id=121, name='me', email='me@123.com', address='me@123.com', )
get_account = [get_one_customer]


class FakeGetCustomer:
    def get_all_customers(self):
        return get_account



# client = TestClient(app)
# headers = {
#   "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1NWQ5MzhhZi1mZjRlLTRlM2UtYjU5ZC1hYjE1MjczZjBjZjQiLCJleHAiOjE2NjY3MjU0MTgsInN1YiI6Im1lZ2FuIiwiYWNjb3VudCI6eyJpZCI6IjEiLCJlbWFpbCI6Im1lZ2FuIiwidXNlcm5hbWUiOiJtZWdhbiBhZG1pbiIsImhhc2hlZF9wYXNzd29yZCI6IiQyYiQxMiRtYWIyZnRLcEZoN1RMN0o1Tm1MR2IuMlBUTzFMOTZNNmdQR1FibEhpM2l5S2NhbHFPaGs3LiJ9fQ.9Nw5VgPDxyAKSMLyOZ2jW7oYHw6v4MWBe0l4a4zy-5A",
#   "token_type": "Bearer",
#   "account": {
#     "id": "1",
#     "email": "megan",
#     "username": "megan admin"
#   }
# }



def test_get_customers():
    app.dependency_overrides[CustomerRepository] = FakeGetCustomer
    response = client.get("/api/customers/121")
    assert response.status_code == 200
    assert response.json() == get_account
    app.dependency_overrides = {}  