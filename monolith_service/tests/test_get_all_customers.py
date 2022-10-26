from main import app
from queries.customers import CustomerRepository, CustomerOut
from fastapi.testclient import TestClient





get_all_customers = CustomerOut(id=121, name='me', email='me@123.com', address='me@123.com', )
get_accounts_list = [get_all_customers]


class FakeGetAllCustomers:
    def get_all_customers(self):
        return get_accounts_list


class FakeAccountData:
    def get_current_account_data(self):
        return {}


client = TestClient(app)
# headers = {
#     "Authorization": f"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwNzZhNzUyNi01Y2M3LTQxODAtYmM3Ni02MzlhYTg4ODk4ZjciLCJleHAiOjE2NjY3NDcyNTgsInN1YiI6InN0ZXZlLnN2aXJrb0BnbWFpbC5jb20iLCJhY2NvdW50Ijp7ImlkIjoiMSIsImVtYWlsIjoic3RldmUuc3ZpcmtvQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWRtaW4gc3RldmUiLCJoYXNoZWRfcGFzc3dvcmQiOiIkMmIkMTIkY0d1MTZLdDRhTW1ybDJRU3NHWHdkdTZGVkVMTnZ2czdBd0YubG13a29MNHIxcGtYVGNySzYifX0.1DgbFtkoM-Q8bt9yZXdOj-1YmQwH9RlzC3loUo-U-tw"
# }



def test_get_customers_is_protected():
    app.dependency_overrides[CustomerRepository] = FakeGetAllCustomers
    # app.dependency_overrides[authenticator.get_current_account_data] =FakeAccountData
    response = client.get("/api/customers")
    assert response.status_code == 401
    # assert response.json() == get_accounts_list
    app.dependency_overrides = {}  