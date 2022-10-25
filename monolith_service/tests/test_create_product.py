from fastapi.testclient import TestClient
from main import app
from queries.produce import Produce_create, ProduceQueries, Produce_get
 




# produce_create = Produce_create(product_name='potato',picture_file=None, available=True, height=1, length=1, width=1)
# produce= [produce_create]

# class FakeCreateProduce: 
#     def create_produce(self):
#         return produce

client=TestClient(app)
headers = {
    "Authorization": f"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiZTdhZjg3Mi1iZDVlLTRmZGQtYTk5Mi00MTYxNDJhN2NkYmIiLCJleHAiOjE2NjY3MzAzODEsInN1YiI6Impvc2hAZnluLmNvbSIsImFjY291bnQiOnsiaWQiOiI0IiwiZW1haWwiOiJqb3NoQGZ5bi5jb20iLCJ1c2VybmFtZSI6Impvc2ggYWRtaW4iLCJoYXNoZWRfcGFzc3dvcmQiOiIkMmIkMTIkUVU0LkxSTTkwZDUxdXpNZGsxaDcxT0ZmNGdJNTYycHNGQ3ZJOW1NeDA5RFU5VWZXSll3TzIifX0.QRv06DyRYQ6X-WFh-zYBUnYFFpv-VqfHtLTIuuHW43o"
}



def test_create_produce():
    # app.dependency_overrides[ProduceQueries]=FakeCreateProduce
    response = client.post("/api/produce/", headers = headers, json = {"id": 1255, "product_name": 'potato', 'picture_file': None, 'available': True, 'height': 1, 'length': 1, 'width': 1 })
    assert response.status_code == 200
    assert response.json() == {"id": 1255, "product_name": 'potato', 'picture_file': None, 'available': True, 'height': 1, 'length': 1, 'width': 1 }
    app.dependency_overrides = {}  