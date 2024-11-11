import React, { useContext, useEffect } from "react";
import { Image } from "primereact/image";
import { Carousel } from "primereact/carousel";
import { useNavigate, useParams } from "react-router-dom";
import { ItemContext } from "../context/Item/ItemContext";
import { Rating } from "primereact/rating";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { PurchaseContext } from "../context/Purchase/PurchaseContext";
import '../components/ItemPage.css';
import Swal from "sweetalert2";

export const ItemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedItem, getItem } = useContext(ItemContext);
  const { addSale, success } = useContext(PurchaseContext);

  const handlePurchase = async () => {
    await addSale(selectedItem);
    console.log(success);

    Swal.fire({
      title: "¡Compra exitosa!",
      text: "Gracias por tu compra",
      icon: "success",
      showCancelButton: true,
      confirmButtonText: "Ir al carrito",
      cancelButtonText: "Ir al menú",
    }).then((result) => {
      if (result.isConfirmed) {
      navigate("/purchases");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      navigate("/home");
      }
    });
  };

  useEffect(() => {
    getItem(id);
  }, []);

  const responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  const itemTemplate = (image) => {
    return (
      <img
        src={image}
        alt={selectedItem.title}
        className="carousel-image"
      />
    );
  };

  return (
    <div className="flex flex-column align-items-center m-3">
      {selectedItem && (
        <>
          {/* Carrusel de imágenes */}
          <div className="flex justify-content-center carousel-container">
            <Carousel
              value={selectedItem.images}
              numVisible={1}
              numScroll={1}
              responsiveOptions={responsiveOptions}
              circular
              itemTemplate={itemTemplate}
            />
          </div>
          <Divider />

          {/* Título del producto */}
          <h1 style={{ fontSize: "24px", marginBottom: "5px" }}>
            {selectedItem.title}
          </h1>
          <h4 style={{ color: "gray", marginBottom: "15px" }}>
            {selectedItem.category}
          </h4>

          {/* Descripción del producto */}
          <p style={{ textAlign: "center", padding: "0 20px" }}>
            {selectedItem.description}
          </p>

          {/* Precio y rating */}
          <div className="flex justify-content-center align-items-center">
            <h2 style={{ marginRight: "15px" }}>${selectedItem.price}</h2>
            <Rating
              value={selectedItem.rating}
              readOnly
              stars={5}
              cancel={false}
            />
          </div>

          {/* Botón de compra */}
          <div className="flex justify-content-center my-4">
            <Button
              label="Comprar"
              style={{
                fontSize: "18px",
                padding: "10px 30px",
                border: "2px solid black",
                backgroundColor: "white",
                color: "black",
              }}
              onClick={() => handlePurchase()}
            />
          </div>
        </>
      )}
    </div>
  );
};