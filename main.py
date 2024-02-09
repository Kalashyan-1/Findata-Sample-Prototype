from fastapi import FastAPI, HTTPException
import psycopg2
import plotly.graph_objs as go
from fastapi.middleware.cors import CORSMiddleware

USER="postgres"
PASSWORD="FinData"
HOST="localhost"
PORT="5432"
DATABASE="FinData"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/order_data/")
async def get_order_data(organization_name: str):
    conn = psycopg2.connect(database=DATABASE, user=USER, password=PASSWORD, host=HOST, port=PORT)
    cursor = conn.cursor()

    try:
        cursor.execute("SELECT order_month, order_count FROM order_counts WHERE organization_name = %s;", (organization_name,))
        order_data = cursor.fetchall()
        return order_data
        
    except psycopg2.Error as e:
        print("Error retrieving data from PostgreSQL:", e)
        raise HTTPException(status_code=500, detail="Internal server error")

    finally:
        cursor.close()
        conn.close()