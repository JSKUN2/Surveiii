import { useState, useRef } from "react";
import data from "../../../backend/data.json";
import L from "leaflet";
import { MapContainer, TileLayer, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Bar } from "react-chartjs-2";

export default function Responden() {
  const [datajson] = useState(data.dataQuiz);
  const psqiRef = useRef(null);
  const pssRef = useRef(null);

  const result = {
    psqi: { baik: 0, buruk: 0 },
    pss: { rendah: 0, sedang: 0, tinggi: 0 }
  };

  datajson.forEach(d => {
    d.psqi <= 5 ? result.psqi.baik++ : result.psqi.buruk++;

    if (d.pss <= 13) result.pss.rendah++;
    else if (d.pss <= 26) result.pss.sedang++;
    else result.pss.tinggi++;
  });

  const PSQI = {
    labels: ["Tidur Baik", "Tidur Buruk"],
    datasets: [{
      label: "PSQI",
      data: [result.psqi.baik, result.psqi.buruk],
      backgroundColor: [
        "rgba(134,206,203,0.7)",
        "rgba(255,0,69,0.7)"
      ]
    }]
  };

  const PSS = {
    labels: ["Rendah", "Sedang", "Tinggi"],
    datasets: [{
      label: "PSS",
      data: [
        result.pss.rendah,
        result.pss.sedang,
        result.pss.tinggi
      ],
      backgroundColor: [
        "rgba(134,206,203,0.7)",
        "rgba(216,229,0,0.7)",
        "rgba(255,0,69,0.7)"
      ]
    }]
  };

  const download = (ref, name) => {
    const url = ref.current.toBase64Image();
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
  };

  const belawan = L.latLngBounds(
    [3.75, 98.65],
    [3.80, 98.72]
  );
  const clearData = async () => {
    const ok = window.confirm("Yakin ingin menghapus semua data?");
    if (!ok) return;

    try {
      await fetch("http://localhost:8000/clear", {
        method: "POST",
      });
      alert("Data berhasil dibersihkan");
    } catch (e) {
      alert("Terjadi kesalahan");
    }
  };

 return (
    <div className="min-h-screen bg-slate-900 text-slate-100 px-4 py-6 space-y-6">

      <header className="text-center">
        <h1 className="text-xl font-semibold tracking-wide">
          Visualisasi Data Responden
        </h1>
        <p className="text-sm text-slate-400">
          Peta lokasi & hasil PSQI / PSS
        </p>
      </header>

      <section className="bg-slate-800 rounded-2xl shadow-lg p-4 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-200">
            Data Responden
          </h2>
        </div>

        <a
          href="/data.csv"
          download
          className="px-4 py-2 rounded-xl bg-emerald-500/90 hover:bg-emerald-500
                     text-sm font-medium transition"
        >
          Unduh CSV
        </a>
      </section>

      <section className="bg-slate-800 rounded-2xl shadow-lg overflow-hidden flex flex-col">
        <div className="p-3 font-medium text-sm text-slate-300">
          Peta Lokasi Responden
        </div>

        <div className="w-[94vw] self-center aspect-square">
          <MapContainer
            center={[3.7755, 98.6832]}
            zoom={12}
            minZoom={12}
            maxBounds={belawan}
            maxBoundsViscosity={1}
            className="w-full h-full"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {datajson.map((d, i) => (
              <CircleMarker
                key={i}
                center={[d.lokasi.lat, d.lokasi.long]}
                radius={3}
                pathOptions={{ color: "#ff0045", fillOpacity: 1 }}
              />
            ))}
          </MapContainer>
        </div>
      </section>

      <section className="bg-slate-800 rounded-2xl shadow-lg p-4 space-y-4">
        <h2 className="text-sm font-semibold text-slate-300">
          PSQI (Kualitas Tidur)
        </h2>

        <Bar ref={psqiRef} data={PSQI} />

        <button
          onClick={() => download(psqiRef, "psqi.png")}
          className="w-full py-2 rounded-xl bg-teal-500/90 hover:bg-teal-500
                     text-sm font-medium transition"
        >
          Unduh Grafik PSQI
        </button>
      </section>

      <section className="bg-slate-800 rounded-2xl shadow-lg p-4 space-y-4">
        <h2 className="text-sm font-semibold text-slate-300">
          PSS (Tingkat Stres)
        </h2>

        <Bar ref={pssRef} data={PSS} />

        <button
          onClick={() => download(pssRef, "pss.png")}
          className="w-full py-2 rounded-xl bg-teal-500/90 hover:bg-rose-500
                     text-sm font-medium transition"
        >
          Unduh Grafik PSS
        </button>
      </section>
        <button onClick={clearData}
                  className="w-full py-2 rounded-xl bg-rose-500/90 hover:bg-rose-500
                     text-sm font-medium transition">
        Clear Data
      </button>
    </div>
  );
}
