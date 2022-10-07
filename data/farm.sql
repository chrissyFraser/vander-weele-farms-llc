DROP TABLE IF EXISTS produce;
DROP TABLE IF EXISTS customer;

CREATE TABLE produce(
    id SERIAL NOT NULL UNIQUE,
    product_name TEXT NOT NULL,
    picture_file TEXT,
    available BOOLEAN NOT NULL,
    height INTEGER NOT NULL,
    length INTEGER NOT NULL,
    width INTEGER NOT NULL
);

CREATE TABLE customer (
    id SERIAL PRIMARY KEY NOT NULL,
    customer_name VARCHAR(1000) NOT NULL,
    customer_address VARCHAR(1000),
    customer_email VARCHAR(500),
    driver_id INTEGER,
    priority_id INTEGER
);
