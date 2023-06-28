import React from "react";

export const CardProduct = ({ children }) => {
  return <div className="card w-[350px] h-[470px] bg-slate-100 text-slate-950 text-base font-semibold shadow-xl">{children}</div>;
};

function CardImage({ srcImage }) {
  return (
    <figure>
      <img src={srcImage} className="w-full h-full" />
    </figure>
  );
}

function CardBody({ title, description }) {
  return (
    <>
      <h2 className="card-title font-bold">{title}</h2>
      <p>{description}</p>
    </>
  );
}

function CardFooter({ price, id, handleAddToCard }) {
  function handle() {
    console.log("siap");
  }
  return (
    <>
      <div className="card-actions flex justify-between items-center">
        <h4>Rp {price.toLocaleString("id-ID", { styles: "currency", currency: "IDR" })}</h4>
        <button className="btn btn-primary" onClick={() => handleAddToCard(id)}>
          Add To Card
        </button>
      </div>
    </>
  );
}

// Mmebuat Nested Component
CardProduct.CardBody = CardBody;
CardProduct.CardImage = CardImage;
CardProduct.CardFooter = CardFooter;
