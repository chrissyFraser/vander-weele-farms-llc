steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE accounts (
            id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(1000) NOT NULL,
            email VARCHAR(500),
            hashed_password VARCHAR(500)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE accounts;
        """,
    ],
]
