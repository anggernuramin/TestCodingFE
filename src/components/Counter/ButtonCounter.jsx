const ButtonCounter = ({ children, onClick, style }) => {
  // memberi style pada button menggunakan ternary
  const myStyle = children !== "Reset!" ? {} : { display: "block", backgroundColor: "red" };

  // berikan event dan Props nama yang sama agar kita bisa menjalankan event kosong,dan menjalankan event yg ada di elemet yang memanggil(mengirim props)
  return (
    <button className="p-4 my-2 bg-slate-300  hover:bg-blue-800" onClick={() => onClick()} style={myStyle}>
      {children}
    </button>
  );
};
export default ButtonCounter;
