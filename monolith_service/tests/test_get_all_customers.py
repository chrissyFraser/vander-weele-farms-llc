
from imaplib import _Authenticator

from main import app
from queries.customers import CustomerRepository, CustomerOut
from fastapi.testclient import TestClient




get_all_customers = CustomerOut(id=121, name='me', email='me@123.com', address='me@123.com', )
get_accounts_list = [get_all_customers]


class FakeGetAllCustomers:
    def get_all_customers(self):
        return get_accounts_list



client = TestClient(app)
headers = {
    "Authorization": f"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlMzk1Y2FlZC1hZDJkLTQ3NjEtODQyMi04MmExODQwMmFhNDAiLCJleHAiOjE2NjY3MjgyNTEsInN1YiI6InN0ZXZlLnN2aXJrb0BnbWFpbC5jb20iLCJhY2NvdW50Ijp7ImlkIjoiMSIsImVtYWlsIjoic3RldmUuc3ZpcmtvQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWRtaW4gc3RldmUiLCJoYXNoZWRfcGFzc3dvcmQiOiIkMmIkMTIkY0d1MTZLdDRhTW1ybDJRU3NHWHdkdTZGVkVMTnZ2czdBd0YubG13a29MNHIxcGtYVGNySzYifX0.IA9AoBoDvGU_Vgwm7FT-BP9rEQm9ly7MRJ5S4UKGe7k"
}



def test_get_customers():
    app.dependency_overrides[CustomerRepository] = FakeGetAllCustomers
    response = client.get("/api/customers", headers=headers)
    assert response.status_code == 200
    assert response.json() == get_accounts_list
    app.dependency_overrides = {}  