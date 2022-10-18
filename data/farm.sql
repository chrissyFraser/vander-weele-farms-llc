DROP TABLE IF EXISTS produce;
DROP TABLE IF EXISTS customer;
DROP TABLE IF EXISTS driver;
DROP TABLE IF EXISTS accounts;

CREATE TABLE accounts (
    id SERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(1000) NOT NULL,
    email VARCHAR(500),
    hashed_password VARCHAR(500),
    roles VARCHAR(100)
    
);

CREATE TABLE produce(
    id SERIAL NOT NULL UNIQUE,
    product_name TEXT NOT NULL,
    picture_file TEXT,
    available BOOLEAN NOT NULL,
    height INTEGER NOT NULL,
    length INTEGER NOT NULL,
    width INTEGER NOT NULL
);

-- INSERT INTO produce Values
-- (1, 'Potatoes', null, true, 10, 20, 15);;

CREATE TABLE driver (
    id SERIAL NOT NULL UNIQUE,
    driver_name VARCHAR(100)
);

CREATE TABLE customer (
    id SERIAL PRIMARY KEY NOT NULL,
    customer_name VARCHAR(1000) NOT NULL,
    customer_address VARCHAR(1000),
    customer_email VARCHAR(500),
    priority_id INTEGER,
    driver_id INTEGER REFERENCES driver ("id")
    
);

INSERT INTO driver VALUES 
    (0, 'Unassigned')
    ;

INSERT INTO accounts VALUES 
    (0, 'admin', 'admin', '$2b$12$RUU4gsTdXA94EDi.rXCm1..SLdfBRYRTUObVhUR81zfkdJ6MqFBwq', 'admin')
    ;
