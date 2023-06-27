// React Select adalah library pihak ketiga react yang digunakan untuk dropdown dengan input control
// install react select = npm i --save react-select
// import component select = import Select from 'react-select'
import { useState, useEffect } from "react";
import Select from "react-select";
import "./styleReactSelect.css";
const ReactSelect = () => {
  const [datas, setDatas] = useState([]);
  const [userSelect, setUserSelect] = useState("");

  // buat state untuk menampilkan data dngn nilai awal bollean false(kenapa boleean,KArena amudah untuk melakukan conditional rendering)
  const [show, setShow] = useState(false);

  async function getData() {
    const request = await fetch("https://pokeapi.co/api/v2/berry/");
    const response = await request.json();
    setDatas(response.results);
  }

  useEffect(() => {
    getData();
  }, []);

  //   nuat pilihan dropdown dari hasil get api yg disimpan pada state datas
  //   DAN LAKUKAN SORT SEBELUM MELAKUKAN MAPPING,KARENA SORT MERETURN ARRAY YANG UTUH(AGAR METHOD localeCompare() BISA BERJALAN)

  const results = datas
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((item) => {
      return {
        value: item.name,
        label: item.name,
      };
    });

  function handleButton() {
    // set true,untuk menampilkan data
    // LAKUKAN TOGGLE AGAR BUTTON BISA BERUBAH-UBAH VALUENYA
    setShow(!show);
  }

  // isi default dari react select
  //   const options = [
  //     { value: "Chocolate", label: "Chocolate" },
  //     { value: "Vanilla", label: "Vanilla" },
  //   ];

  return (
    <>
      <h2 className="text-2xl text-red-600 mt-10">
        3. Membuat dropdown menggunakan React Select <span>(Dengan requiretmen sama dengan soal no 1)</span>
      </h2>

      <button className="btn btn-primary my-3" type="button" onClick={handleButton} style={{ marginBottom: "10px" }}>
        {show ? "Hide Value" : "Show Value"}
      </button>

      {/* Tampilkan userSelect yang menerima event onChange */}
      {show ? <h3>{userSelect}</h3> : ""}

      {/* validasi */}
      {userSelect === "" && show === true ? <h3>name masih kosong</h3> : ""}

      {/* cara memanggil Select,harus ada atribut options,dan jika ingin menambahkan className */}
      <Select className="select-primary w-full max-w-xs" options={results} onChange={(e) => setUserSelect(e.value)} />
    </>
  );
};
export default ReactSelect;
