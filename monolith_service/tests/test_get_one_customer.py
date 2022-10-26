from main import app
from queries.customers import CustomerRepository, CustomerOut
from fastapi.testclient import TestClient




get_one_customer = CustomerOut(id=1, customer_name='me', customer_email='me@123.com', customer_address='me@123.com')
get_account = [get_one_customer]


class FakeGetCustomer:
    def test_one_customer(self):
        return get_account



client = TestClient(app)
headers = {
    "Authorization": f"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0Y2ViYjRiYy1jNzdhLTRlM2QtOWNhOS05ZDI1N2I0NjU0OTEiLCJleHAiOjE2NjY3Mzk3NzcsInN1YiI6ImZhcnRAbm9zZS5jb20iLCJhY2NvdW50Ijp7ImlkIjoiNCIsImVtYWlsIjoiZmFydEBub3NlLmNvbSIsInVzZXJuYW1lIjoiYWRtaW4gYWRtaW4iLCJoYXNoZWRfcGFzc3dvcmQiOiIkMmIkMTIkMHl2ei9EUGdMWjF0NVk0ZEZWNU9FdTQ5MkVUc2JKZWloVWlibDF5ZHkvVGpOMzZhU1FYcjYifX0.6CsouSqrTBzxdEi8RgznwV1kytLJ254n4HQ6k3lRjzU"
}



def test_one_customer():
    app.dependency_overrides[CustomerRepository] = FakeGetCustomer
    response = client.get("/api/customers/1", headers=headers)
    assert response.status_code == 200
    assert response.json() == get_account
    app.dependency_overrides = {}  