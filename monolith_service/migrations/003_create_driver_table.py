steps = [
    [
        """
    CREATE TABLE driver (
    id SERIAL NOT NULL UNIQUE,
    driver_name VARCHAR(100) NOT NULL,
    driver_id INTEGER UNIQUE
    );
    """,
        """
    DROP TABLE driver;
    """,
    ]
]
