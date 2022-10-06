from itertools import product
import os
from psycopg_pool import ConnectionPool

pool = ConnectionPool(conninfo= os.environ["DATABASE_URL"])

class ProduceQueries:
    def create_produce(self, produce):
        id = None
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO produce(
                        product_name,
                        picture_file,
                        available,
                        height,
                        length,
                        width
                    )
                    VALUES(%s, %s, %s, %s, %s, %s)
                    RETURNING id
                    """,
                    [
                        produce.product_name,
                        produce.picture_file,
                        produce.available,
                        produce.height,
                        produce.length,
                        produce.width
                    ]
                        ),
                
                row = cur.fetchone()
                id = row[0]
        if id is not None:
            return self.get_produce(id)
        
        
    def get_produce(self):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT 
                    produce.id, 
                    produce.product_name,
                    produce.available,
                    produce.height,
                    produce.length,
                    produce.width,
                    FROM produce
                    """,
                )
                produce = []
                # rows = cur.fetchall()
                return produce