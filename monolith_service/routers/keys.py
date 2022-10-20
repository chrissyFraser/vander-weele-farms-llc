from urllib import response
import boto3
import psycopg2
from typing import List
from pydantic import BaseModel
import os
from fastapi import FastAPI, UploadFile, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from boto3 import client
from queries.pool import pool



S3_BUCKET = os.environ["S3_BUCKET"]
REGION = os.environ['REGION']
ACCESS_KEY = os.environ['ACCESS_KEY']
SECRET_ACCESS_KEY = os.environ['SECRET_ACCESS_KEY']
print(type(S3_BUCKET))

class PhotoModel(BaseModel):
    id: int
    photo_name: str
    photo_url: str
    # is_deleted: bool

router = APIRouter()

app = FastAPI(debug=True)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# @router.get("/status")
# async def check_status():
#     return "Hello World!"


# @router.get("/photos", response_model=List[PhotoModel])
# async def get_all_photos():
#     # Connect to our database
#     conn = psycopg2.connect(
#         database="exampledb", user="docker", password="docker", host="0.0.0.0"
#     )
#     cur = conn.cursor()
#     cur.execute("SELECT * FROM photo ORDER BY id DESC")
#     rows = cur.fetchall()

#     formatted_photos = []
#     for row in rows:
#         formatted_photos.append(
#             PhotoModel(
#                 id=row[0], photo_name=row[1], photo_url=row[2], is_deleted=row[3]
#             )
#         )

#     cur.close()
#     conn.close()
#     return formatted_photos


@router.post("/photos", status_code=201)
async def add_photo(file: UploadFile):
    s3 = boto3.resource("s3",
        aws_access_key_id = ACCESS_KEY,
        aws_secret_access_key = SECRET_ACCESS_KEY
    )
    bucket = s3.Bucket(S3_BUCKET)
    bucket.upload_fileobj(file.file, file.filename, ExtraArgs={
        "ACL": "public-read"
        })    
    uploaded_file_url = f"https://{S3_BUCKET}.s3.{REGION}.amazonaws.com/{file.filename}"
    conn = pool.connection()
    cur = conn.cursor()
    cur.execute(
        f"INSERT INTO photo (photo_name, photo_url) VALUES ('{file.filename}', '{uploaded_file_url}' )"
    )
    conn.commit()
    cur.close()
    conn.close()
    return uploaded_file_url













































# import json
# import boto3
# import logging
# from botocore.client import BaseClient
# from botocore.exceptions import ClientError
# from typing import Literal, Union, Optional
# from fastapi import APIRouter, Depends, Response, UploadFile, File
# # from queries.produce import Error, Produce_update_available, ProduceQueries, Produce_get, Produce_create, ProduceDataClass, ProduceRequest
# # import requests
# from fastapi.responses import JSONResponse

# from pydantic import BaseSettings
# import os
# from tempfile import NamedTemporaryFile
# import json

# # from json.http import HTTPException


# S3_BUCKET = os.environ["S3_BUCKET"]
# REGION = os.environ['REGION']
# ACCESS_KEY = os.environ['ACCESS_KEY']
# SECRET_ACCESS_KEY = os.environ['SECRET_ACCESS_KEY']


# def s3() -> BaseClient:
#     client = boto3.client(service_name='s3',
#                         aws_access_key_id=ACCESS_KEY,
#                         aws_secret_access_key=SECRET_ACCESS_KEY,
#                         endpoint_url='http://localhost:8080/')  # Use LocalStack Endpoint

#     return client

# def upload_file_to_bucket(s3_client, file_obj, bucket, folder, object_name=None):
#     """Upload a file to an S3 bucket

#     :param s3_client: S3 Client
#     :param file_obj: File to upload
#     :param bucket: Bucket to upload to
#     :param folder: Folder to upload to
#     :param object_name: S3 object name. If not specified then file_name is used
#     :return: True if file was uploaded, else False
#     """
#     # If S3 object_name was not specified, use file_name
#     if object_name is None:
#         object_name = file_obj

#     # Upload the file
#     try:
#         # with open("files", "rb") as f:
#         s3_client.upload_fileobj(file_obj, bucket, f"{folder}/{object_name}")
#     except ClientError as e:
#         logging.error(e)
#         return False
#     return True

# router = APIRouter()

# @router.post('/api/customer/generate/upload',
#                 name='Upload CSV to AWS S3 Bucket',
#                 status_code=201)
# async def post_upload_user_csv(file_obj: UploadFile = File(...)):
#     upload_obj = upload_file_to_bucket(s3_client=s3(),
#                                         file_obj=file_obj.file,
#                                         bucket=S3_BUCKET,
#                                         folder='CSV',  # To Be updated
#                                         object_name=file_obj.filename)
#     # if upload_obj:
#     return JSONResponse(content="Object has been uploaded to bucket successfully")
#                             # status_code=status.HTTP_201_CREATED)
#     # else:
#     #     raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#                                 # detail="File could not be uploaded")






# @router.post("/image")
# def imageUpload(file_obj: UploadFile = File(...)):
#     pass



# class S3Events(object):
# def __init__(self, aws_access_key_id, aws_secret_access_key):

#     self.aws_access_key_id = aws_access_key_id
#     self.aws_secret_access_key = aws_secret_access_key
#     self.session = boto3.Session(
#         aws_access_key_id=self.aws_access_key_id,
#         aws_secret_access_key=self.aws_secret_access_key,
#     )
#     self.s3 = self.session.resource('s3')

# def upload_fileobj(self, file_name=None, bucket=None, key=None):

#     """Upload a file to an S3 bucket
#     :param key:
#     :param file_name: File to upload
#     :param bucket: Bucket to upload to
#     :return: True if file was uploaded, else False
#     """

#     # If S3 object_name was not specified, use file_name
#     if (key is None) or (bucket is None):
#         logging.info("key and bucket cannot be None")
#         return False

#     # Upload the file
#     s3_client = boto3.client('s3')
#     try:
#         response = s3_client.upload_fileobj(file_name, bucket, key, ExtraArgs={'ACL': 'public-read'})
#     except ClientError as e:
#         logging.info("INFO: Failed to upload image")
#         logging.error(e)
#         return False

#     logging.info("File object uploaded to https://s3.amazonaws.com/{}{}".format( bucket, key))
#     return True
    
    
# s3_event = S3Events(
#     ACCESS_KEY,
#     SECRET_ACCESS_KEY
# )



# @router.post("/photos")
# def uploadImage():
    # s3_event.upload_fileobj(file_name=None, bucket=None, key=None)
