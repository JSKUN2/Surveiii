import { useState, useEffect, setError } from "react";
import dataJSON from "../../../backend/data.json"
const quizDataPSQI = {
    tipe1 : [{
        id: "q11",
        text: "1. Selama bulan terakhir, kira-kira jam berapa Anda biasanya pergi tidur pada malam hari?  "
    },
    {
        id: "q13",
        text: "2. Selama bulan terakhir, kira-kira jam berapa Anda biasanya bangun di pagi hari?"
    },
    ],
    tipe2 : [{
        id: "q21",
        text: "3. Selama bulan terakhir, berapa jam aktual tidur Anda setiap malam? (Ini mungkin berbeda dengan jumlah jam yang Anda habiskan di tempat tidur)"
    }],
    tipe3:[{
        id: "q12",
        text: "4. Selama bulan terakhir, berapa lama (dalam menit) yang biasanya Anda butuhkan untuk tertidur setiap malam?"
    },],
    tipe4 : [{
        id: "q31",
        text: "5. Tidak dapat tidur dalam waktu 30 menit setelah berbaring",
        labelPilgan: ["Tidak selama sebulan terakhir", "Kurang dari sekali seminggu", "Sekali atau dua kali seminggu", "Tiga kali atau lebih dalam seminggu"],
        value: [0,1,2,3]
    },
    {
        id: "q32",
        text: "6. Terbangun di tengah malam atau dini hari",
        labelPilgan: ["Tidak selama sebulan terakhir", "Kurang dari sekali seminggu", "Sekali atau dua kali seminggu", "Tiga kali atau lebih dalam seminggu"],
        value: [0,1,2,3]
    },
    {
        id: "q33",
        text: "7. Harus bangun untuk pergi ke kamar mandi",
        labelPilgan: ["Tidak selama sebulan terakhir", "Kurang dari sekali seminggu", "Sekali atau dua kali seminggu", "Tiga kali atau lebih dalam seminggu"],
        value: [0,1,2,3]
    },
    {
        id: "q34",
        text: "8. Tidak dapat bernapas dengan nyaman",
        labelPilgan: ["Tidak selama sebulan terakhir", "Kurang dari sekali seminggu", "Sekali atau dua kali seminggu", "Tiga kali atau lebih dalam seminggu"],
        value: [0,1,2,3]
    },
    {
        id: "q35",
        text: "9. Batuk atau mendengkur dengan keras",
        labelPilgan: ["Tidak selama sebulan terakhir", "Kurang dari sekali seminggu", "Sekali atau dua kali seminggu", "Tiga kali atau lebih dalam seminggu"],
        value: [0,1,2,3]
    },
    {
        id: "q36",
        text: "10. Merasa terlalu dingin",
        labelPilgan: ["Tidak selama sebulan terakhir", "Kurang dari sekali seminggu", "Sekali atau dua kali seminggu", "Tiga kali atau lebih dalam seminggu"],
        value: [0,1,2,3]
    },
    {
        id: "q37",
        text: "11. Merasa terlalu panas",
        labelPilgan: ["Tidak selama sebulan terakhir", "Kurang dari sekali seminggu", "Sekali atau dua kali seminggu", "Tiga kali atau lebih dalam seminggu"],
        value: [0,1,2,3]
    },
    {
        id: "q38",
        text: "12. Bermimpi buruk",
        labelPilgan: ["Tidak selama sebulan terakhir", "Kurang dari sekali seminggu", "Sekali atau dua kali seminggu", "Tiga kali atau lebih dalam seminggu"],
        value: [0,1,2,3]
    },
    {
        id: "q39",
        text: "13. Mengalami rasa sakit",
        labelPilgan: ["Tidak selama sebulan terakhir", "Kurang dari sekali seminggu", "Sekali atau dua kali seminggu", "Tiga kali atau lebih dalam seminggu"],
        value: [0,1,2,3]
    },
    {
        id: "q310",
        text: "14. Mengalami gangguan selain rasa sakit",
        labelPilgan: ["Tidak selama sebulan terakhir", "Kurang dari sekali seminggu", "Sekali atau dua kali seminggu", "Tiga kali atau lebih dalam seminggu"],
        value: [0,1,2,3]
    },
    {
        id: "q311",
        text: "15. Selama bulan terakhir, seberapa sering Anda menggunakan obat untuk membantu tidur (baik yang diresepkan dokter maupun 'over the counter')?",
        labelPilgan: ["Tidak selama sebulan terakhir", "Kurang dari sekali seminggu", "Sekali atau dua kali seminggu", "Tiga kali atau lebih dalam seminggu"],
        value: [0,1,2,3]
    },
    {
        id: "q312",
        text: "16. Selama bulan terakhir, seberapa sering Anda merasa mengantuk saat mengemudi, makan, atau melakukan aktivitas sosial?  ",
        labelPilgan: ["Tidak selama sebulan terakhir", "Kurang dari sekali seminggu", "Sekali atau dua kali seminggu", "Tiga kali atau lebih dalam seminggu"],
        value: [0,1,2,3]
    },
    {
        id: "q313",
        text: "17. Selama bulan terakhir, seberapa besar masalah bagi Anda untuk menjaga antusiasme dalam menyelesaikan berbagai hal?",
        labelPilgan: ["Tidak ada masalah sama sekali", "Hanya sedikit masalah", "Agak bermasalah", "Sangat bermasalah"],
        value: [0,1,2,3]
    },
    {
        id: "q314",
        text: "18. Selama bulan terakhir, secara keseluruhan bagaimana Anda menilai kualitas tidur Anda?",
        labelPilgan: ["Sangat baik", "Cukup baik", "Cukup buruk", "Sangat buruk"],
        value: [0,1,2,3]
    },
    ]
}

const quizDataPSS = [
    {
    id:"qt1",
    text: "1. Dalam 1 bulan terakhir, seberapa sering Anda merasa kesal karena sesuatu yang terjadi secara tak terduga?",
    labelPilgan: ["Tidak pernah", "Jarang", "Kadang-kadang","Cukup sering","Sangat sering"],
    value: [0,1,2,3,4]
    },
    {
    id:"qt2",
    text: "2. Dalam 1 bulan terakhir, seberapa sering Anda merasa tidak mampu mengendalikan hal-hal penting dalam hidup Anda?",
    labelPilgan: ["Tidak pernah", "Jarang", "Kadang-kadang","Cukup sering","Sangat sering"],
    value: [0,1,2,3,4]
    },
    {
    id:"qt3",
    text: "3. Dalam 1 bulan terakhir, seberapa sering Anda merasa gelisah atau stres?",
    labelPilgan: ["Tidak pernah", "Jarang", "Kadang-kadang","Cukup sering","Sangat sering"],
    value: [0,1,2,3,4]
    },
    {
    id:"qt4",
    text: "4. Dalam 1 bulan terakhir, seberapa sering Anda merasa percaya diri tentang kemampuan Anda menangani masalah pribadi? (Reverse item)  ",
    labelPilgan: ["Tidak pernah", "Jarang", "Kadang-kadang","Cukup sering","Sangat sering"],
    value: [4,3,2,1,0]
    },
    {
    id:"qt5",
    text: "5. Dalam 1 bulan terakhir, seberapa sering Anda merasa bahwa segala sesuatu berjalan sesuai keinginan Anda? (Reverse item)",
    labelPilgan: ["Tidak pernah", "Jarang", "Kadang-kadang","Cukup sering","Sangat sering"],
    value: [4,3,2,1,0]
    },
    {
    id:"qt6",
    text: "6. Dalam 1 bulan terakhir, seberapa sering Anda merasa bahwa Anda tidak dapat mengatasi semua hal yang harus Anda lakukan?",
    labelPilgan: ["Tidak pernah", "Jarang", "Kadang-kadang","Cukup sering","Sangat sering"],
    value: [0,1,2,3,4]
    },
    {
    id:"qt7",
    text: "7. Dalam 1 bulan terakhir, seberapa sering Anda mampu mengendalikan iritasi dalam hidup Anda? (Reverse item)",
    labelPilgan: ["Tidak pernah", "Jarang", "Kadang-kadang","Cukup sering","Sangat sering"],
    value: [4,3,2,1,0]
    },
    {
    id:"qt8",
    text: "8. Dalam 1 bulan terakhir, seberapa sering Anda merasa bahwa Anda berada di atas segalanya? (Reverse item)  ",
    labelPilgan: ["Tidak pernah", "Jarang", "Kadang-kadang","Cukup sering","Sangat sering"],
    value: [4,3,2,1,0]
    },
    {
    id:"qt9",
    text: "9. Dalam 1 bulan terakhir, seberapa sering Anda merasa marah karena hal-hal yang terjadi di luar kendali Anda?",
    labelPilgan: ["Tidak pernah", "Jarang", "Kadang-kadang","Cukup sering","Sangat sering"],
    value: [0,1,2,3,4]
    },
    {
    id:"qt10",
    text: "10. Dalam 1 bulan terakhir, seberapa sering Anda merasa kesulitan begitu banyak sehingga Anda merasa tidak dapat mengatasinya?",
    labelPilgan: ["Tidak pernah", "Jarang", "Kadang-kadang","Cukup sering","Sangat sering"],
    value: [0,1,2,3,4]
    },
]
function PROFIL({ answers, setAnswers, goToPSQI }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <h1 className="text-center font-semibold text-xl mt-6 text-slate-100">
        Data Diri
      </h1>

      {/* Nama */}
      <div className="rounded-2xl bg-slate-800 text-slate-100 flex flex-col mt-5 w-[95%] mx-auto shadow-lg">
        <div className="rounded-t-2xl bg-slate-700 px-4 py-3 text-sm font-medium">
          Nama
        </div>
        <div className="px-4 py-3">
          <input
            type="text"
            name="namaF"
            value={answers.namaF || ""}
            onChange={handleChange}
            className="w-full rounded-lg bg-slate-900 px-3 py-2 text-sm"
          />
        </div>
      </div>

      {/* Mata Pencaharian */}
      <div className="rounded-2xl bg-slate-800 text-slate-100 flex flex-col mt-5 w-[95%] mx-auto shadow-lg">
        <div className="rounded-t-2xl bg-slate-700 px-4 py-3 text-sm font-medium">
          Mata Pencaharian
        </div>
        <div className="px-4 py-3">
          <input
            type="text"
            name="mapenF"
            value={answers.mapenF || ""}
            onChange={handleChange}
            className="w-full rounded-lg bg-slate-900 px-3 py-2 text-sm"
          />
        </div>
      </div>

      {/* Jenis Kelamin */}
      <div className="rounded-2xl bg-slate-800 text-slate-100 flex flex-col mt-5 w-[95%] mx-auto shadow-lg">
        <div className="rounded-t-2xl bg-slate-700 px-4 py-3 text-sm font-medium">
          Jenis Kelamin
        </div>
        <div className="px-4 py-3 space-y-2 text-sm">
          {["Laki-laki", "Perempuan"].map((v) => (
            <label key={v} className="flex items-center gap-2">
              <input
                type="radio"
                name="genderF"
                value={v}
                checked={answers.genderF === v}
                onChange={handleChange}
                className="accent-teal-400"
              />
              {v}
            </label>
          ))}
        </div>
      </div>

      {/* Usia */}
      <div className="rounded-2xl bg-slate-800 text-slate-100 flex flex-col mt-5 w-[95%] mx-auto shadow-lg">
        <div className="rounded-t-2xl bg-slate-700 px-4 py-3 text-sm font-medium">
          Usia
        </div>
        <div className="px-4 py-3">
          <input
            type="number"
            name="usiaF"
            value={answers.usiaF || ""}
            onChange={handleChange}
            className="w-full rounded-lg bg-slate-900 px-3 py-2 text-sm"
          />
        </div>
      </div>

      {/* Pendapatan */}
      <div className="rounded-2xl bg-slate-800 text-slate-100 flex flex-col mt-5 w-[95%] mx-auto shadow-lg">
        <div className="rounded-t-2xl bg-slate-700 px-4 py-3 text-sm font-medium">
          Pendapatan
        </div>
        <div className="px-4 py-3 space-y-2 text-sm">
          {["Sangat Rendah", "Rendah", "Menengah", "Tinggi"].map((v) => (
            <label key={v} className="flex items-center gap-2">
              <input
                type="radio"
                name="pendapatanF"
                value={v}
                checked={answers.pendapatanF === v}
                onChange={handleChange}
                className="accent-teal-400"
              />
              {v}
            </label>
          ))}
        </div>
      </div>

      {/* Status Pernikahan */}
      <div className="rounded-2xl bg-slate-800 text-slate-100 flex flex-col mt-5 w-[95%] mx-auto shadow-lg">
        <div className="rounded-t-2xl bg-slate-700 px-4 py-3 text-sm font-medium">
          Status Pernikahan
        </div>
        <div className="px-4 py-3 space-y-2 text-sm">
          {["Belum Menikah", "Menikah"].map((v) => (
            <label key={v} className="flex items-center gap-2">
              <input
                type="radio"
                name="statusF"
                value={v}
                checked={answers.statusF === v}
                onChange={handleChange}
                className="accent-teal-400"
              />
              {v}
            </label>
          ))}
        </div>
      </div>

      {/* Suku */}
      <div className="rounded-2xl bg-slate-800 text-slate-100 flex flex-col mt-5 w-[95%] mx-auto shadow-lg">
        <div className="rounded-t-2xl bg-slate-700 px-4 py-3 text-sm font-medium">
          Suku
        </div>
        <div className="px-4 py-3">
          <input
            type="text"
            name="sukuF"
            value={answers.sukuF || ""}
            onChange={handleChange}
            className="w-full rounded-lg bg-slate-900 px-3 py-2 text-sm"
          />
        </div>
      </div>

      {/* Agama */}
      <div className="rounded-2xl bg-slate-800 text-slate-100 flex flex-col mt-5 w-[95%] mx-auto shadow-lg">
        <div className="rounded-t-2xl bg-slate-700 px-4 py-3 text-sm font-medium">
          Agama
        </div>
        <div className="px-4 py-3 space-y-2 text-sm">
          {[
            "Islam",
            "Protestan",
            "Katolik",
            "Hindu",
            "Buddha",
            "Khonghucu",
            "Kepercayaan Lokal"
          ].map((v) => (
            <label key={v} className="flex items-center gap-2">
              <input
                type="radio"
                name="agamaF"
                value={v}
                checked={answers.agamaF === v}
                onChange={handleChange}
                className="accent-teal-400"
              />
              {v}
            </label>
          ))}
        </div>
      </div>

      {/* Tindakan Pengobatan */}
      <div className="rounded-2xl bg-slate-800 text-slate-100 flex flex-col mt-5 w-[95%] mx-auto shadow-lg">
        <div className="rounded-t-2xl bg-slate-700 px-4 py-3 text-sm font-medium">
          Tindakan Pengobatan
        </div>
        <div className="px-4 py-3 space-y-2 text-sm">
          {[
            "Pengobatan Tradisional / Swamedikasi",
            "BPJS",
            "Puskesmas / Klinik Swasta",
            "Rumah Sakit"
          ].map((v) => (
            <label key={v} className="flex items-center gap-2">
              <input
                type="radio"
                name="pengobatanF"
                value={v}
                checked={answers.pengobatanF === v}
                onChange={handleChange}
                className="accent-teal-400"
              />
              {v}
            </label>
          ))}
        </div>
      </div>

      <div className="flex w-full justify-end px-5 py-6">
        <button
          onClick={goToPSQI}
          className="bg-teal-500/90 hover:bg-teal-500 text-slate-900 px-6 py-2 rounded-xl text-sm font-medium"
        >
          Next
        </button>
      </div>
    </>
  );
}

function PSQI({ answers, setAnswers, goToPSS, goToProfil }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <h1 className="text-center font-semibold text-xl mt-6 text-slate-100">
        PSQI
      </h1>

      {quizDataPSQI.tipe1.map((e) => (
        <div
          key={e.id}
          className="rounded-xl bg-slate-800 text-slate-100 flex flex-col mt-5 w-[95%] mx-auto"
        >
          <div className="rounded-t-xl rounded-t-2xl bg-slate-700 px-4 py-3 text-sm font-medium">
            {e.text}
          </div>

          <div className="px-4 py-3 space-y-2">
            <label className="text-sm">Jam</label>
            <input
              type="number"
              name={`${e.id}_jam`}
              value={answers[`${e.id}_jam`] || ""}
              onChange={handleChange}
              className="w-full rounded-lg bg-slate-900 px-3 py-2 text-sm"
            />

            <label className="text-sm">Menit</label>
            <input
              type="number"
              name={`${e.id}_menit`}
              value={answers[`${e.id}_menit`] || ""}
              onChange={handleChange}
              className="w-full rounded-lg bg-slate-900 px-3 py-2 text-sm"
            />
          </div>
        </div>
      ))}

      {quizDataPSQI.tipe2.map((e) => (
        <div
          key={e.id}
          className="rounded-xl bg-slate-800 text-slate-100 flex flex-col mt-5 w-[95%] mx-auto"
        >
          <div className="rounded-t-xl rounded-t-2xl bg-slate-700 px-4 py-3 text-sm font-medium">
            {e.text}
          </div>

          <div className="px-4 py-3">
            <input
              type="number"
              name={e.id}
              value={answers[e.id] || ""}
              onChange={handleChange}
              className="w-full rounded-lg bg-slate-900 px-3 py-2 text-sm"
            />
          </div>
        </div>
      ))}

      {quizDataPSQI.tipe3.map((e) => (
        <div
          key={e.id}
          className="rounded-xl bg-slate-800 text-slate-100 flex flex-col mt-5 w-[95%] mx-auto"
        >
          <div className="rounded-t-xl rounded-t-2xl bg-slate-700 px-4 py-3 text-sm font-medium">
            {e.text}
          </div>

          <div className="px-4 py-3">
            <input
              type="number"
              name={e.id}
              value={answers[e.id] || ""}
              onChange={handleChange}
              className="w-full rounded-lg bg-slate-900 px-3 py-2 text-sm"
            />
          </div>
        </div>
      ))}

      {quizDataPSQI.tipe4.map((e) => (
        <div
          key={e.id}
          className="rounded-xl bg-slate-800 text-slate-100 flex flex-col mt-5 w-[95%] mx-auto"
        >
          <div className="rounded-t-xl rounded-t-2xl bg-slate-700 px-4 py-3 text-sm font-medium">
            {e.text}
          </div>

          <div className="px-4 py-3 space-y-2">
            {e.labelPilgan.map((label, index) => {
              const val = e.value[index];
              return (
                <label key={index} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name={e.id}
                    value={val}
                    checked={answers[e.id] === String(val)}
                    onChange={handleChange}
                    className="accent-teal-400"
                  />
                  {label}
                </label>
              );
            })}
          </div>
        </div>
      ))}

      <div className="flex w-full justify-between px-5 py-6">
        <button
          onClick={goToProfil}
          className="bg-teal-500/90 hover:bg-teal-500 text-slate-900 px-6 py-2 rounded-xl text-sm font-medium">
          Back
        </button>
        <button
          onClick={goToPSS}
          className="bg-teal-500/90 hover:bg-teal-500text-slate-900 px-6 py-2 rounded-xl text-sm font-medium"
        >
          Next
        </button>
      </div>
    </>
  );
}

function START({answers, setAnswers, goToProfil}){
  useEffect(()=>{
    setAnswers({})
  },[])
  return(
    <div className="flex flex-row w-screen justify-between p-5">
      <button onClick={goToProfil} className="bg-teal-500 hover:bg-teal-600">Start Quiz</button></div>)
}
function PSS({ answers, setAnswers, goToPSQI, submit, json }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <h1 className="text-center font-semibold text-2xl mt-6 text-slate-100 tracking-wide">
        PSS
      </h1>

      {quizDataPSS.map((e) => (
        <div
          key={e.id}
          className="
            rounded-2xl pb-4
            bg-slate-800 text-slate-100
            flex flex-col mt-5
            w-[95%] mx-auto
            shadow-lg
          "
        >
          <div className="
            rounded-t-2xl w-full
            bg-slate-700
            px-4 py-3 mb-3
            text-sm font-medium
            text-slate-200
          ">
            <h3>{e.text}</h3>
          </div>

          <div className="flex flex-col gap-2 px-6 text-sm">
            {e.labelPilgan.map((label, index) => {
              const val = e.value[index];
              return (
                <label key={index} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={e.id}
                    value={val}
                    checked={answers[e.id] === String(val)}
                    onChange={handleChange}
                    className="accent-teal-400"
                  />
                  {label}
                </label>
              );
            })}
          </div>
        </div>
      ))}

      <div className="flex flex-row w-screen justify-between px-6 py-6">
        <button
          onClick={goToPSQI}
          className="
            text-sm font-medium
            text-slate-300
            px-4 py-2
            rounded-xl
            bg-teal-500/90 hover:bg-teal-500 
          "
        >
          Back
        </button>

        <button
          onClick={submit}
          className="
            text-sm font-medium
            text-slate-900
            px-6 py-2
            rounded-xl
            bg-teal-500
          "
        >
          Submit
        </button>
      </div>
    </>
  );
}

export default function Quiz() {
  const [data, setData] = useState(null);
  const [page, setPage] = useState("start");
  const [coords, setCoords] = useState({ lat: null, long: null });
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    setData(dataJSON);
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          long: position.coords.longitude
        });
      },
      (err) => console.error(err)
    );
  }, []);

  let val1 = 0,
    val2 = 0,
    val3 = 0,
    val4 = 0,
    val5 = 0,
    val6 = 0,
    val7 = 0,
    total = 0,
    total2 = 0;

  const aktualTidur = Number(answers.q21 || 0) * 60;
  const tidur =
    Number(answers.q11_jam || 0) * 60 + Number(answers.q11_menit || 0);
  const bangun =
    Number(answers.q13_jam || 0) * 60 + Number(answers.q13_menit || 0);

  let tempatTidur = bangun - tidur;
  if (tempatTidur <= 0) tempatTidur += 1440;

  const efisiensi = (aktualTidur / tempatTidur) * 100;

  if (efisiensi > 85) val2 = 0;
  else if (efisiensi >= 75) val2 = 1;
  else if (efisiensi >= 65) val2 = 2;
  else val2 = 3;

  const q12 = Number(answers.q12 || 0);
  const q31 = Number(answers.q31 || 0);

  let val1_raw = 0;
  if (q12 > 60) val1_raw = 2 + q31;
  else if (q12 > 30) val1_raw = 1 + q31;
  else val1_raw = q31;

  if (val1_raw < 1) val1 = 0;
  else if (val1_raw < 3) val1 = 1;
  else if (val1_raw < 5) val1 = 2;
  else val1 = 3;

  const q21 = Number(answers.q21 || 0);
  if (q21 > 7) val3 = 0;
  else if (q21 >= 6) val3 = 1;
  else if (q21 >= 5) val3 = 2;
  else val3 = 3;

  let val4_raw = 0;
  for (let i = 1; i <= 9; i++) {
    val4_raw += Number(answers["q3" + i] || 0);
  }

  if (val4_raw === 0) val4 = 0;
  else if (val4_raw > 18) val4 = 3;
  else if (val4_raw > 9) val4 = 2;
  else val4 = 1;

  val5 = Number(answers.q314 || 0);

  const val6_raw =
    Number(answers.q312 || 0) + Number(answers.q313 || 0);

  if (val6_raw === 0) val6 = 0;
  else if (val6_raw > 4) val6 = 3;
  else if (val6_raw > 2) val6 = 2;
  else val6 = 1;

  val7 = Number(answers.q311 || 0);

  total = val1 + val2 + val3 + val4 + val5 + val6 + val7;

  for (let i = 1; i <= 10; i++) {
    total2 += Number(answers["qt" + i] || 0);
  }

  const submit = () => {
    console.log("SUBMIT DIPANGGIL");

    if (!data) {
      console.error("Data belum siap");
      return;
    }

  const hasil = {
    waktu: new Date().toISOString(),
    lokasi: {
      lat: coords.lat,
      long: coords.long,
    },
    data_diri: {
      nama: answers.namaF,
      mata_pencaharian: answers.mapenF,
      jenis_kelamin: answers.genderF,
      usia: answers.usiaF,
      tingkat_pendidikan: answers.pendidikanF,
      pendapatan: answers.pendapatanF,
      status_perkawinan: answers.statusF,
      suku: answers.sukuF,
      agama: answers.agamaF,
      tindakan_pengobatan: answers.pengobatanF,
    },
    psqi: total,
    pss: total2,
  };


    const pushData = {
      ...data,
      dataQuiz: [...(data.dataQuiz || []), hasil]
    };

    setData(pushData);
    setPage("start")
    fetch("http://localhost:8000/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pushData)
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("Server:", res);
        alert("Data berhasil disimpan");
      })
      .catch((err) => {
        console.error(err);
        alert("Gagal menyimpan data");
      });
  };

  return (
    <>
      {page === "start" && (
        <START
          answers={answers}
          setAnswers={setAnswers}
          goToProfil={() => setPage("profil")}
        />
      )}

      {page === "profil" && (
        <PROFIL
          answers={answers}
          setAnswers={setAnswers}
          goToPSQI={() => {setPage("psqi")}}
        />
      )}

      {page === "psqi" && (
        <PSQI
          answers={answers}
          setAnswers={setAnswers}
          goToPSS={() => {setPage("pss")}}
          goToProfil={() => {setPage("profil")}}
        />
      )}

      {page === "pss" && (
        <PSS
          answers={answers}
          setAnswers={setAnswers}
          goToPSQI={() => setPage("psqi")}
          submit={submit}
        />
      )}
    </>
  );
}
