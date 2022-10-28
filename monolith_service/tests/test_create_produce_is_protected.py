from fastapi.testclient import TestClient
from main import app
import os
from queries.produce import ProduceQueries
from unittest import TestCase, mock

class FakeCreateProduce: 
     def create_produce(self, produce):
         if produce is not None:
            return passing_response

client=TestClient(app)
# headers = {
#     "Authorization": f"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1MGE3N2FlMi0xNmQ5LTQ4YzItYjQ2YS1jMDg0ZWM5MmFlZTQiLCJleHAiOjE2NjY3NTExNzgsInN1YiI6InN0ZXZlLnN2aXJrb0BnbWFpbC5jb20iLCJhY2NvdW50Ijp7ImlkIjoiMSIsImVtYWlsIjoic3RldmUuc3ZpcmtvQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWRtaW4gc3RldmUiLCJoYXNoZWRfcGFzc3dvcmQiOiIkMmIkMTIkY0d1MTZLdDRhTW1ybDJRU3NHWHdkdTZGVkVMTnZ2czdBd0YubG13a29MNHIxcGtYVGNySzYifX0.Y64PPAq2IkRDTwFNls4RcSBhJOLTjjP_75C4mTh3eaI"
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

@mock.post(os.environ['DATABASE_URL'])
def test_create_produce_is_protected():
    app.dependency_overrides[ProduceQueries]=FakeCreateProduce
    response = client.post("/api/produce/", json={"product_name": "potato", "picture_file": "word", "available": True, "height": 1, "length": 1, "width": 1})
    assert response.status_code == 401
    app.dependency_overrides = {}  