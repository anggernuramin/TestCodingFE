import { useEffect, useState } from "react";
const FilterData = () => {
  // buat state untuk menampung data hasil getData() yg mengembalikan array
  const [datas, setDatas] = useState([]);

  // membuat state untuk menangkap inputan user dengan event keyUp()
  const [input, setInput] = useState("");

  // function get Url (public api)
  function getUrl() {
    return "https://pokeapi.co/api/v2/berry/";
  }
  // gunakan hooks useEffect,agar api dicall 1 kali,karena kita memfilter data hasil call,jadi tidak perlu call secara berulang
  useEffect(() => {
    async function getData() {
      const url = getUrl();
      const request = await fetch(url);
      const response = await request.json();
      setDatas(response.results);
    }
    // jalanakan function get data dalam hooks use Effect
    getData();
  }, []);

  function handleFilterData(e) {
    setInput(e.target.value.toUpperCase());
  }

  //   menampilkan data dengan data yang sudah disorting,Dengan data hasil pengambilan api yang dikirim melalui props saat memanggil elemenya
  function ShowData({ datas }) {
    return datas
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((item, index) => {
        return <option key={index}>{item.name}</option>;
      });
  }

  // Function memfilter data
  function FilterData() {
    const filter = datas.filter((item) => {
      // includes akan mencocokkan item.name dan input yang diketikkkan oleh user
      return item.name.toUpperCase().includes(input);
    });
    // jangan memakai >= 0,karena index(filter mengembalikkan array) selalu dimulai dengan 0
    if (filter.length > 0) {
      return (
        <select className="bg-slate-100 w-60 p-3">
          {/* kirim hasil filter melalui props */}
          <ShowData datas={filter} />
        </select>
      );
    } else {
      // kondisi jika isi array 0
      return (
        <>
          <h2>Data Name tidak tersedia</h2>
        </>
      );
    }
  }
  return (
    <>
      <h2 className="text-2xl text-red-600 mt-10">1. Membuat dropdown menggunakan Vanilla js</h2>
      <ul className="my-2">
        <h4 className="text-red-500">Requiretmens</h4>
        <li>Menampilkan nama dengan Urutan ascending</li>
        <li>Tampilkan dalam dropdown menu</li>
        <li>Terdapat fitur search secara real time</li>
      </ul>
      <input type="search" onKeyUp={handleFilterData} placeholder="Search here ..." autoFocus className="bg-slate-300 w-60 p-3" />
      <FilterData />
    </>
  );
};
export default FilterData;
