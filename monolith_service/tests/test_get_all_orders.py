from main import app
from queries.orders import OrderRepository, OrderOut
from fastapi.testclient import TestClient





get_all_orders = OrderOut(id=5, customer_name='Skippy', product_name='Parsnip', qty=10, driver_name="Chauncey", order_date="10/20/2022 12:00", printed=False)
get_order_list = [get_all_orders]


class FakeGetAllOrders:
    def get_all_orders(self):
        return get_order_list


class FakeAccountData:
    def get_current_account_data(self):
        return {}


client = TestClient(app)
# headers = {
#     "Authorization": f"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwNzZhNzUyNi01Y2M3LTQxODAtYmM3Ni02MzlhYTg4ODk4ZjciLCJleHAiOjE2NjY3NDcyNTgsInN1YiI6InN0ZXZlLnN2aXJrb0BnbWFpbC5jb20iLCJhY2NvdW50Ijp7ImlkIjoiMSIsImVtYWlsIjoic3RldmUuc3ZpcmtvQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWRtaW4gc3RldmUiLCJoYXNoZWRfcGFzc3dvcmQiOiIkMmIkMTIkY0d1MTZLdDRhTW1ybDJRU3NHWHdkdTZGVkVMTnZ2czdBd0YubG13a29MNHIxcGtYVGNySzYifX0.1DgbFtkoM-Q8bt9yZXdOj-1YmQwH9RlzC3loUo-U-tw"
# }



def test_get_orders_is_protected():
    app.dependency_overrides[OrderRepository] = FakeGetAllOrders
    # app.dependency_overrides[authenticator.get_current_account_data] =FakeAccountData
    response = client.get("/api/orders")
    assert response.status_code == 200
    # assert response.json() == get_accounts_list
    app.dependency_overrides = {}  