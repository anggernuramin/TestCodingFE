import { useState } from "react";
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

  //   nilai awal isinya product (misal isinya adalah data Baru yang akan kita cocokkan dengan data product)
  const [card, setCard] = useState([]);

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
  }
  console.log(card);

  return (
    <>
      <h1 className="text-2xl text-red-600  mb-5 mt-10">4. Membuat fitur keranjang dan total belanja dengan data yang dinamis</h1>
      <div className="flex gap-3">
        <div className="w-[65%] flex flex-wrap gap-10 items-center justify-center">
          {producks.map((item) => {
            return (
              <div className="card w-[350px] h-[470px] bg-slate-100 text-slate-950 text-base font-semibold shadow-xl" key={item.id}>
                <figure>
                  <img src={item.image} />
                </figure>
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

        <div className="w-[35%]">
          <h3 className="text-xl">List Keranjang Product</h3>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
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
                        <button className="btn btn-error my-2" onClick={() => handleDeleteCard(item.id)}>
                          Hapus
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
