from sqlalchemy import create_engine
from urllib.parse import quote_plus

password = quote_plus("Athu@123")
engine = create_engine(
    f"mysql+pymysql://root:{password}@localhost:3306/finance_os"
)

connection = engine.connect()

print("Database Connected Successfully")

connection.close()