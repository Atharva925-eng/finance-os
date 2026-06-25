from fastapi import FastAPI

app = FastAPI(
    title="Finance OS API"
)

@app.get("/")
def home():
    return {"message": "Finance OS Backend Running"}