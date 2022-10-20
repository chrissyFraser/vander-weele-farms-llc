from multiprocessing import connection
from tkinter import INSERT
from urllib import response
from sqlite3 import Cursor
import boto3
# import psycopg2
from typing import List
from pydantic import BaseModel, HttpUrl
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

class images(BaseModel):
    id: int
    url: HttpUrl
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
    
    # image_url = f"https://{S3_BUCKET}.s3.{REGION}.amazonaws.com/{file.filename}"
    # return image_url
    # with pool.connection() as conn:
    #     with conn.cursor() as cur:
    #         result = cur.execute(
    #             """
    #             INSERT INTO images (
    #                 url
    #                 ) 
    #             VALUES ('{image_url}' ) 
    #             RETURNING id
    #             """, 
                # [images.url],
            #  )
            # id = result.fetchone()[0]
            # old_data = images.dict()
            # return image_url
    #         return images(id = id, **old_data)
    # return uploaded_file_url
    # conn = pool.connection()
    # cur = conn.Cursor()
    # cur.execute(
    #     f"INSERT INTO images (url) VALUES ('{uploaded_file_url}' )"
    # )
    # conn.commit()
    # cur.close()
    # conn.close()
    # return uploaded_file_url







