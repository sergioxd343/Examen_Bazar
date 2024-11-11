import React, { useContext, useEffect, useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { ItemContext } from "../context/Item/ItemContext";
import { Rating } from "primereact/rating";
import { InputText } from "primereact/inputtext";
import { Divider } from "primereact/divider";
import { useNavigate, useLocation } from "react-router-dom";
import './ListItems.css';

export const ListItems = () => {
    const { items, getItems } = useContext(ItemContext);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const handleCardClick = (id) => {
        navigate(`/home/item/${id}`);
    };

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const search = query.get("search");
        setSearchTerm(search);
        getItems(search);
    }, [location.search]);

    return (
        <div className="p-grid p-dir-col list-items-container">
            <Divider />
            <h2>
                {searchTerm && searchTerm.trim() !== ''
                    ? `Resultados de la búsqueda de "${searchTerm}": ${items.length === 0 ? 'No se encontraron resultados.' : items.length}`
                    : 'Todos los resultados'}
            </h2>



            {items.map((item) => (
                <div key={item.id} className="p-col-7 p-md-4">
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
    );
};