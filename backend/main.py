from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import json
import csv

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

JSON_FILE = Path("data.json")
CSV_FILE = Path("../survei/public/data.csv")


# -------------------------
# INIT & CLEAR
# -------------------------
def init_json():
    """Pastikan data.json selalu ada & valid"""
    if not JSON_FILE.exists():
        JSON_FILE.write_text(
            json.dumps({"dataQuiz": []}, indent=2),
            encoding="utf-8"
        )


def clear_data():
    """Reset JSON & CSV"""
    JSON_FILE.write_text(
        json.dumps({"dataQuiz": []}, indent=2),
        encoding="utf-8"
    )

    if CSV_FILE.exists():
        CSV_FILE.unlink()


@app.on_event("startup")
def startup():
    init_json()


# -------------------------
# SAVE DATA
# -------------------------
@app.post("/save")
def save(payload: dict):
    """
    Payload:
    {
      "dataQuiz": [
        {
          "waktu": "...",
          "lokasi": { "lat": ..., "long": ... },
          "data_diri": {
            "nama": "...",
            "mata_pencaharian": "...",
            "jenis_kelamin": "...",
            "usia": "...",
            "tingkat_pendidikan": "...",
            "pendapatan": "...",
            "status_perkawinan": "...",
            "suku": "...",
            "agama": "...",
            "tindakan_pengobatan": "..."
          },
          "psqi": ...,
          "pss": ...
        }
      ]
    }
    """

    # simpan JSON utuh
    JSON_FILE.write_text(
        json.dumps(payload, indent=2),
        encoding="utf-8"
    )

    last = payload["dataQuiz"][-1]
    diri = last.get("data_diri", {})

    # baris CSV (flatten)
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
        writer = csv.DictWriter(
            f,
            fieldnames=row.keys()
        )

        if write_header:
            writer.writeheader()

        writer.writerow(row)

    return {"status": "ok"}


# -------------------------
# CLEAR ENDPOINT
# -------------------------
@app.post("/clear")
def clear():
    clear_data()
    return {"status": "cleared"}
