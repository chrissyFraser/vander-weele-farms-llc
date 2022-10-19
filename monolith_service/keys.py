
import os

S3_BUCKET = os.environ.get('S3_BUCKET')
REGION = os.environ.get('REGION')
ACCESS_KEY = os.environ.get('ACCESS_KEY')
SECRET_ACCESS_KEY = os.environ.get('SECRET_ACCESS_KEY')
print(S3_BUCKET)
# for k, v in os.environ.items():
#     print(k, v)