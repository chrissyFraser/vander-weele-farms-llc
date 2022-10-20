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
    return uploaded_file_url
    # conn = pool.connection()
    # cur = conn.cursor()
    # cur.execute(
    #     f"INSERT INTO photo (photo_name, photo_url) VALUES ('{file.filename}', '{uploaded_file_url}' )"
    # )
    # conn.commit()
    # cur.close()
    # conn.close()
    # return uploaded_file_url







