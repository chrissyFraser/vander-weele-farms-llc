steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE images(
            id SERIAL PRIMARY KEY NOT NULL UNIQUE,
            url TEXT NOT NULL
            );
        """,
        # "Down" SQL statement
        """
        DROP TABLE images;
        """
    ]]