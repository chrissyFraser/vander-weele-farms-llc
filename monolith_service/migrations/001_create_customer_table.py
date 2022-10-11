steps = [
    [
        """
        CREATE TABLE customer (
            id SERIAL PRIMARY KEY NOT NULL UNIQUE,
            customer_name VARCHAR(1000) NOT NULL,
            customer_address VARCHAR(1000),
            customer_email VARCHAR(500),
            driver_id INTEGER REFERENCES driver("driver_id") ON DELETE CASCADE,
            priority_id INTEGER
        );
        """,
        """
        DROP TABLE customer;
        """
    ]
]