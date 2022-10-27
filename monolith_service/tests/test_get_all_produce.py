from fastapi.testclient import TestClient
from main import app
from queries.produce import ProduceQueries, Produce_get
 
 
 

produce_get = Produce_get(id=123,product_name='potato',picture_file=None, available=True, height=1, length=1, width=1)
produce_get_list= [produce_get]

class FakeGetAllProduce: 
    def get_all_produce(self):
        return produce_get_list

client=TestClient(app)




def test_get_all_produce():
    app.dependency_overrides[ProduceQueries]=FakeGetAllProduce
    response = client.get("/api/produce/")
    assert response.status_code == 200
    assert response.json() == produce_get_list 
    app.dependency_overrides = {}  


