steps = [
    [
        """
        CREATE TABLE customers (
            id SERIAL PRIMARY KEY NOT NULL,
            customer_name VARCHAR(1000) NOT NULL,
            customer_address VARCHAR(1000),
            customer_email VARCHAR(500),
            driver_id INTEGER,
            priority_id INTEGER
        );
        """,
        """
        DROP TABLE customers;
        """
    ]
]