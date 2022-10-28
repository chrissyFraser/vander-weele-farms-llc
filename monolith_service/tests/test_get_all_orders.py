from main import app
from queries.orders import OrderRepository, OrderOut
from fastapi.testclient import TestClient


get_all_orders = OrderOut(
    id=5,
    customer_name="Skippy",
    product_name="Parsnip",
    qty=10,
    driver_name="Chauncey",
    order_date="10/20/2022 12:00",
    printed=False,
)
get_order_list = [get_all_orders]


class FakeGetAllOrders:
    def get_all_orders(self):
        return get_order_list


class FakeAccountData:
    def get_current_account_data(self):
        return {}


client = TestClient(app)
# headers = {
#     "Authorization": f"Bearer "
# }


def test_get_orders_is_protected():
    app.dependency_overrides[OrderRepository] = FakeGetAllOrders
    response = client.get("/api/orders")
    assert response.status_code == 200
    app.dependency_overrides = {}
    # assert response.json() == get_accounts_list
