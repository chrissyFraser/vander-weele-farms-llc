DROP TABLE IF EXISTS produce;
DROP TABLE IF EXISTS customer;
DROP TABLE IF EXISTS driver;
DROP TABLE IF EXISTS orders;

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

CREATE TABLE orders(
    id SERIAL NOT NULL UNIQUE,
    customer_name VARCHAR(1000) REFERENCES customer ("customer_name"),
    product_name TEXT REFERENCES produce ("product_name"),
    height INTEGER REFERENCES produce ("height"),
    length INTEGER REFERENCES produce ("length"),
    width INTEGER REFERENCES produce ("width"),
    customer_address VARCHAR(1000) REFERENCES customer ("customer_address"),
    priority_id INTEGER REFERENCES customer ("priority_id"),
    driver_id INTEGER REFERENCES driver ("id"),
    printed BOOLEAN DEFAULT false
);