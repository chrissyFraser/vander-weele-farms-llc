DROP TABLE IF EXISTS accounts;

CREATE TABLE accounts (
    id SERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(1000) NOT NULL,
    email VARCHAR(500),
    hashed_password VARCHAR(500),
    disabled BOOLEAN NOT NULL
    
);