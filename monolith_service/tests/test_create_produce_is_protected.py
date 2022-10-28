from fastapi.testclient import TestClient
from main import app
from queries.produce import ProduceQueries


class FakeCreateProduce:
    def create_produce(self, produce):
        if produce is not None:
            return passing_response


client = TestClient(app)
# headers = {
#     "Authorization": f"Bearer "
# }
passing_response = {
    "id": 1,
    "product_name": "potato",
    "picture_file": "word",
    "available": True,
    "height": 1,
    "length": 1,
    "width": 1,
}


def test_create_produce_is_protected():
    app.dependency_overrides[ProduceQueries] = FakeCreateProduce
    response = client.post(
        "/api/produce/",
        json={
            "product_name": "potato",
            "picture_file": "word",
            "available": True,
            "height": 1,
            "length": 1,
            "width": 1,
        },
    )
    assert response.status_code == 401
    app.dependency_overrides = {}
