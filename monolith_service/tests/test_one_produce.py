from main import app
from queries.produce import ProduceQueries, Produce_get
from fastapi.testclient import TestClient




get_single_produce_item = Produce_get(id=121, product_name='Persimmon', picture_file='picture', available=True, height=1, length=2, width=3 )
get_single_produce = get_single_produce_item


class FakeGetProduce:
    def get_single_produce_item(self, produce_id):
        return get_single_produce



client = TestClient(app)



def test_get_produce():
    app.dependency_overrides[ProduceQueries] = FakeGetProduce
    response = client.get("/api/produce/121")
    assert response.status_code == 200
    assert response.json() == get_single_produce
    app.dependency_overrides = {}  
