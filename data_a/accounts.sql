DROP TABLE IF EXISTS accounts;

CREATE TABLE accounts (
    id SERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(1000) NOT NULL,
    email VARCHAR(500),
    hashed_password VARCHAR(500),
    roles VARCHAR(100)
    
);

-- Automatically add Admin user with username and password 'admin' for testing purposes
-- INSERT INTO accounts 
--     (1, 'admin', 'admin', 'admin', '$2b$12$I9y8f48P5GLUu9RIG0tGpO3oX1mSqPAUPxG1oAnkfBD1KYLLj4WLm', 'admin');