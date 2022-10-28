steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE produce(
            id SERIAL PRIMARY KEY NOT NULL UNIQUE,
            product_name TEXT NOT NULL,
            picture_file TEXT,
            available BOOLEAN NOT NULL,
            height INTEGER NOT NULL,
            length INTEGER NOT NULL,
            width INTEGER NOT NULL
            );
        """,
        # "Down" SQL statement
        """
        DROP TABLE produce;
        """,
    ]
]
