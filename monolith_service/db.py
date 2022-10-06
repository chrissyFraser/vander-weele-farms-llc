from itertools import product
import os
from psycopg_pool import ConnectionPool

pool = ConnectionPool(conninfo= os.environ["DATABASE_URL"])

class ProductQueries:
    def create_product(self, product):
        id = None
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO products(
                        product_name,
                        picture_file,
                        available,
                        height,
                        length,
                        width,
                    )
                    VALUES(%s, %s, %s, %s, %s, %s)
                    RETURNING id
                    """,
                    [
                        product.product_name,
                        product.picture_file,
                        product.available,
                        product.height,
                        product.length,
                        product.width,
                    ],
                )
                row = cur.fetchcone()
                id = row[0]
        if id is not None:
            return self.get_product(id)
    def get_products(self):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT 
                    product.id, 
                    product.product_name,
                    product.available,
                    product.height,
                    product.length,
                    product.width,
                    FROM product
                    """,
                )
                products = []
                # rows = cur.fetchall()
                return products