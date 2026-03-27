from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import json
import csv

from pymongo import MongoClient
from bson import ObjectId

app = FastAPI()

# -------------------------
# CORS
# -------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# FILE PATH
# -------------------------
JSON_FILE = Path("data.json")
CSV_FILE = Path("../survei/public/data.csv")

# -------------------------
# MONGODB CONNECTION
# -------------------------
client = MongoClient("mongodb://localhost:27017/")
db = client["survey_db"]
collection = db["quiz"]

# -------------------------
# INIT & CLEAR
# -------------------------
def init_json():
    if not JSON_FILE.exists():
        JSON_FILE.write_text(
            json.dumps({"dataQuiz": []}, indent=2),
            encoding="utf-8"
        )

def clear_data():
    JSON_FILE.write_text(
        json.dumps({"dataQuiz": []}, indent=2),
        encoding="utf-8"
    )

    if CSV_FILE.exists():
        CSV_FILE.unlink()

    collection.delete_many({})

@app.on_event("startup")
def startup():
    init_json()

# -------------------------
# SAVE DATA
# -------------------------
@app.post("/save")
def save(payload: dict):
    # simpan JSON
    JSON_FILE.write_text(
        json.dumps(payload, indent=2),
        encoding="utf-8"
    )

    last = payload["dataQuiz"][-1]

    # simpan ke MongoDB
    result = collection.insert_one(last)

    diri = last.get("data_diri", {})

    # flatten CSV
    row = {
        "waktu": last["waktu"],
        "lat": last["lokasi"]["lat"],
        "long": last["lokasi"]["long"],

        "nama": diri.get("nama", ""),
        "mata_pencaharian": diri.get("mata_pencaharian", ""),
        "jenis_kelamin": diri.get("jenis_kelamin", ""),
        "usia": diri.get("usia", ""),
        "tingkat_pendidikan": diri.get("tingkat_pendidikan", ""),
        "pendapatan": diri.get("pendapatan", ""),
        "status_perkawinan": diri.get("status_perkawinan", ""),
        "suku": diri.get("suku", ""),
        "agama": diri.get("agama", ""),
        "tindakan_pengobatan": diri.get("tindakan_pengobatan", ""),

        "psqi": last["psqi"],
        "pss": last["pss"],
    }

    CSV_FILE.parent.mkdir(parents=True, exist_ok=True)
    write_header = not CSV_FILE.exists()

    with CSV_FILE.open("a", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=row.keys())

        if write_header:
            writer.writeheader()

        writer.writerow(row)

    return {
        "status": "ok",
        "mongo_id": str(result.inserted_id)
    }

# -------------------------
# GET ALL DATA
# -------------------------
@app.get("/data")
def get_data():
    data = []
    for doc in collection.find():
        doc["_id"] = str(doc["_id"])
        data.append(doc)
    return data

# -------------------------
# UPDATE DATA
# -------------------------
@app.put("/update/{id}")
def update_data(id: str, payload: dict):
    result = collection.update_one(
        {"_id": ObjectId(id)},
        {"$set": payload}
    )

    if result.matched_count == 0:
        return {"status": "not found"}

    return {"status": "updated"}

# -------------------------
# SYNC JSON → MONGODB
# -------------------------
@app.post("/sync")
def sync_json_to_mongo():
    if not JSON_FILE.exists():
        return {"status": "no json file"}

    data = json.loads(JSON_FILE.read_text(encoding="utf-8"))

    collection.delete_many({})

    if "dataQuiz" in data and len(data["dataQuiz"]) > 0:
        collection.insert_many(data["dataQuiz"])

    return {"status": "synced"}

# -------------------------
# CLEAR
# -------------------------
@app.post("/clear")
def clear():
    clear_data()
    return {"status": "cleared"}
