FROM python:3.10-bullseye
RUN python -m pip install --upgrade pip
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait
WORKDIR /accounts_service
COPY requirements.txt /app/requirements.txt
RUN python -m pip install -r /app/requirements.txt
COPY main.py main.py
COPY routers routers
COPY queries queries
COPY authenticator.py authenticator.py
WORKDIR /app
CMD /wait && uvicorn main:app --host 0.0.0.0 --port $PORT
