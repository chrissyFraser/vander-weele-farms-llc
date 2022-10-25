FROM python:3.10-bullseye
RUN python -m pip install --upgrade pip
WORKDIR /app
COPY requirements.txt /app/requirements.txt
COPY main.py main.py
COPY routers routers
COPY queries queries
COPY authenticator.py authenticator.py
RUN python -m pip install -r /app/requirements.txt
CMD uvicorn main:app --host 0.0.0.0 --port $PORT
