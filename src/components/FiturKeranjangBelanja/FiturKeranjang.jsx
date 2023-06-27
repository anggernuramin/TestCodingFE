import { useState, useEffect } from "react";
import { CardProduct } from "./CardProduct";

export const FiturKeranjang = () => {
  const producks = [
    {
      id: 1,
      title: "Macbook 13 PRO",
      image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZvdG8lMjBsYXB0b3B8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      deskription: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, dolor.",
      price: 12000000,
    },
    {
      id: 2,
      title: "Think Pad t480s",
      image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZvdG8lMjBsYXB0b3B8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      deskription: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, dolor.",
      price: 4000000,
    },
    {
      id: 3,
      title: "Asus VivoBook",
      image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZvdG8lMjBsYXB0b3B8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      deskription: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, dolor.",
      price: 7000000,
    },
  ];

  //   nilai awal isinya adalah id dan qty yg idnya akan dicocokkan dengan id array products (misal isinya adalah data Baru yang akan kita cocokkan dengan data product)
  const [card, setCard] = useState([]);

  // state untuk menampung total price dengan niali awal 0
  const [totalPrice, setTotalPrice] = useState(0);

  function handleAddToCard(id) {
    // lakukan validasi agar mereturn id yang sama pada  idparameter dengan idcard

    if (card.find((item) => item.id === id)) {
      // jika benar maka set ke setCard
      // BUAT DATA BARU JIKA KITA INGIN MENGGUNAKAN,JANGAN UBAH DATA LAMA
      // Buat data card untuk menampung qty dan id yang akan dibuat perbandingan dengan json product diatas,yg sesuai dengan id yang diklik oleh user (id menerima parameter dari button Add To Card)

      setCard(
        // kita pecah lagi, dan lakukan kondisi jika item.id === id maka,
        // jika true ambil semua item sebelumnya (item isinya adlah data objeck (id dan qty)) dan lakukan penambahan qty + 1
        // jika false maka hakan mereturn item baru sesuai denga id yag dipilih pada arrayofobject products

        card.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item))
      );
    } else {
      // jika data nya belum ada makam tambahkan dan
      // BUAT DATA BARU JIKA KITA INGIN MENGGUNAKAN,JANGAN UBAH DATA LAMA
      // Buat data card untuk menampung qty dan id yang akan dibuat perbandingan dengan json product diatas,yg sesuai dengan id yang diklik oleh user (id menerima parameter dari button Add To Card)
      setCard([
        ...card,
        {
          id: id,
          qty: 1,
        },
      ]);
    }
  }
  function handleDeleteCard(id) {
    const hapus = card.filter((item) => {
      return item.id !== id;
    });
    setCard(hapus);
    // setTotal prize menjadi 0,agar dihapus baris yg tidak cocok oleh variabel hapus
    setTotalPrice(0);
  }

  // UNTUK MENGHITUNG TOTAL CARD MAKA KITA BUTUH HOOK useEffect() Karena kita akan menotalkan harga dan qty setelah card melakukan beberapa kali render,dan element ini akan rerender saat state card berubah saja

  useEffect(() => {
    setCard;

    // program yg ada didalam useEffect ini akan berubah jika state card melakukan rerender,Karena card dijadikan dependency pada hook useEffect ini

    // validasi program akan berjalan jika card tidak kosong
    if (card.length > 0) {
      const tambahTotal = card.reduce((curr, item) => {
        const product = producks.find((produk) => produk.id === item.id);
        return curr + product.price * item.qty;

        // 0 adalah parameter ketiga method reduce (yg artinya nilai awal reduce saat melakukan penambahan)
      }, 0);
      setTotalPrice(tambahTotal);

      // simulasi jika data kita simpan ke db
      // kita ubah object menjadi json terlebih dahulu(karna localStorange tdk bisa membaca objek)
      localStorage.setItem("card", JSON.stringify(card));
      localStorage.setItem("totalPrice", totalPrice.toLocaleString("id-ID", { styles: "currency", currency: "IDR" }));
    }
  }, [card]);

  // buat useEffect lagi agar saat page dibuka dibrowser akan membaca data card yg sudah disetdiloCALSTORANGE
  // GUNAKAN useEffect,Karena ingin membaca localStorange.getItem() hanya dengan sekali saat page dibuka
  useEffect(() => {
    setCard(JSON.parse(localStorage.getItem("card")) || []);
    // dengan begitu maka saat page pertama kali dibuka maka setCard akan diisi apapun yg ada dilocal storange dengan key card,DENGAN SYRAT PARSE KE OBJEK DARI DATA JSON,jika tidak ada data dari localStorange makam akankita beri retun array kosong sesuai dengan nilai awal pada STATE CARD
    setTotalPrice(localStorage.getItem("totalPrice") || 0);
  }, []);

  return (
    <>
      <h1 className="text-2xl text-red-600  mb-5 mt-10">4. Membuat fitur keranjang dan total belanja dengan data yang dinamis</h1>
      <div className="flex gap-3">
        <div className="w-[65%] flex flex-wrap gap-10 items-center justify-center">
          <CardProduct />
          {producks.map((item) => {
            return (
              <div className="card w-[350px] h-[470px] bg-slate-100 text-slate-950 text-base font-semibold shadow-xl" key={item.id}>
                <CardProduct />
                <div className="card-body">
                  <h2 className="card-title font-bold">{item.title}</h2>
                  <p>{item.deskription}</p>
                  <div className="card-actions flex justify-between items-center">
                    <h4>Rp {item.price.toLocaleString("id-ID", { styles: "currency", currency: "IDR" })}</h4>
                    <button className="btn btn-primary" onClick={() => handleAddToCard(item.id)}>
                      Add To Card
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="w-[40%] shadow-md bg-slate-100 p-5 rounded-sm">
          <h3 className="text-xl text-primary font-bold">List Keranjang Product</h3>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="text-slate-950">
                  <th>Name</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {/* item id isinya adalah sesuai dengan id yang kirim ke funtion handleAddToCard */}
                {card.map((item) => {
                  // datProduct akan menerima data hasil data yg sama (produk.id dan item.id(item.id adalah sesuai dengan user yang pilih))
                  const dataProduct = producks.find((produk) => produk.id === item.id);
                  return (
                    <tr key={item.id}>
                      <td>{dataProduct.title}</td>
                      <td>{item.qty}</td>
                      <td>{dataProduct.price}</td>
                      <td>Rp. {(item.qty * dataProduct.price).toLocaleString("id-ID", { styles: "currency", currency: "IDR" })}</td>
                      <td>
                        <button className="btn-error p-1 rounded-md px-2" onClick={() => handleDeleteCard(item.id)}>
                          Hapus
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {/* Menampilkan total belanja, dengan menghitung qty * price */}
                {totalPrice === 0 ? (
                  <tr>
                    <td colSpan={4}>
                      <p className="italic">Belum ada barang belanja</p>
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td colSpan={4} className="font-bold">
                      Total Price
                    </td>
                    <td className="font-bold">Rp {totalPrice.toLocaleString("id-ID", { styles: "currency", currency: "IDR" })}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
