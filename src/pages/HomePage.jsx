import React, { useState, useContext, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Busqueda } from '../components/Busqueda';
import './HomePage.css';

import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { ItemContext } from "../context/Item/ItemContext";
import { Rating } from "primereact/rating";
import { InputText } from "primereact/inputtext";
import { Divider } from "primereact/divider";
import Swal from 'sweetalert2';


export const HomePage = () => {
  
  
  const { items, getItems } = useContext(ItemContext);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/home';
  const [searchTerm, setSearchTerm] = useState('');
  const { id } = useParams();  // Captura el id desde la URL

  const query = new URLSearchParams(location.search);
  const search = query.get("search");

  const handleSearch = (value) => {
    setSearchTerm(value);
    navigate(`/home/items?search=${value}`);
  };

  const handleCardClick = (id) => {
    console.log("HandleCardClick");
    window.location.href = `/home/item/${id}`;
  };

  

  useEffect(() => {

    

    // Si no hay un término de búsqueda, obtiene todos los items
    if (search === null || search === "") {
      setSearchTerm("");  // Limpia el término de búsqueda si no existe
      getItems("");       // Obtén todos los items
    } else {
      setSearchTerm(search); // Actualiza el estado con el término de búsqueda
      getItems(search);      // Obtén los items filtrados por el término de búsqueda
    }
  }, [location.search, search, getItems]); 
  
  // Obtén el ítem correspondiente al id en la URL
  const item = id ? items.find(item => item.id === id) : null;

  return (
    <div className="homepage-container">
      {isHome ? (
        <div className="homepage-content">
          <i className="pi pi-shopping-bag homepage-icon-large"></i>
          <h1>Bazar Online</h1>
          <Busqueda onSearch={handleSearch} />
        </div>
      ) : (
        <div className="homepage-content-responsive">
          <i className="pi pi-shopping-bag homepage-icon-small"></i>
          <Busqueda onSearch={handleSearch} />
        </div>
      )}
      <Outlet />

      {id && item ? (  // Si hay un id en la URL, muestra el detalle del ítem
        <div className="item-detail">
          <h2>{item.title}</h2>
          <img src={item.thumbnail} alt={item.name} />
          <p>{item.description}</p>
          <h3>{item.category}</h3>
          <h4>${item.price}</h4>
          <Rating value={item.rating} readOnly stars={5} cancel={false} />
        </div>
      ) : (
        search === null && (
          <div className="p-grid p-dir-col list-items-container">
            <Divider />
            <h2>
              {searchTerm && searchTerm.trim() !== ''
                ? `Resultados de la búsqueda de "${searchTerm}": ${items.length === 0 ? 'No se encontraron resultados.' : items.length}`
                : 'Todos los resultados'}
            </h2>

            {items.map((item) => (
              <div key={item.id} className="p-col-12 p-md-4">
                <div onClick={() => handleCardClick(item.id)}>
                  <Card className="list-item-card">
                    <div className="list-item-content">
                      <img
                        src={item.thumbnail}
                        alt={item.name}
                        className="list-item-image"
                      />
                      <div className="list-item-details">
                        <div className="flex justify-content-between flex-wrap">
                          <h2>{item.title}</h2>
                          <h3>{item.category}</h3>
                        </div>
                        <p>{item.description}</p>
                        <div className="flex justify-content-between flex-wrap">
                          <h3>${item.price}</h3>
                          <Rating
                            value={item.rating}
                            readOnly
                            stars={5}
                            cancel={false}
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};
