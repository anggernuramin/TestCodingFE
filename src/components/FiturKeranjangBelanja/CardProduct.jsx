import React from "react";

export const CardProduct = ({ srcImage, title, description }) => {
  return (
    <>
      <CardImage srcImage={srcImage} />

      <div className="card-body">
        <CardBody title={title} description={description} />
        <div className="card-actions flex justify-between items-center">
          <h4>Rp {{ price }.toLocaleString("id-ID", { styles: "currency", currency: "IDR" })}</h4>
        </div>
      </div>
    </>
  );
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

function CardFooter() {
  return <></>;
}
