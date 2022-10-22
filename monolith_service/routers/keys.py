import boto3
import os
from fastapi import FastAPI, UploadFile, APIRouter
from queries.pool import pool



S3_BUCKET = os.environ["S3_BUCKET"]
REGION = os.environ['REGION']
ACCESS_KEY = os.environ['ACCESS_KEY']
SECRET_ACCESS_KEY = os.environ['SECRET_ACCESS_KEY']


router = APIRouter()

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
