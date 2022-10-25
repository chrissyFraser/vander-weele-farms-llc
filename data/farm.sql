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
    name VARCHAR(1000) NOT NULL,
    email VARCHAR(500),
  	address VARCHAR(500)
    
);

    
CREATE TABLE orders(
    id SERIAL NOT NULL UNIQUE,
    customer_id INTEGER REFERENCES customer ("id"),
    produce_id INTEGER REFERENCES produce ("id"),
    qty INTEGER,
    driver_id INTEGER REFERENCES driver ("id"),
    order_date DATE, 
    printed BOOLEAN DEFAULT false
);