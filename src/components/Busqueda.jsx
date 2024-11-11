import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import Swal from 'sweetalert2';
import './Busqueda.css';

export const Busqueda = ({ onSearch }) => {
    const [value, setValue] = useState('');

    const handleSearch = () => {
        console.log("handleSearch", value);

        Swal.fire({
            position: "top-end",
            title: "Load...",
            showConfirmButton: false,
            timerProgressBar: true, // Progreso de la barra de tiempo
            timer: 2000
          });

        // Llamar la función de búsqueda pasada como prop
        onSearch(value);
    };

    return (
        <div className="busqueda-container">
            <div className="busqueda-input">
                <InputText 
                    value={value} 
                    onChange={(e) => setValue(e.target.value)} 
                    placeholder="Buscar..." 
                    className="p-inputtext-lg" 
                />
            </div>
            <div className="busqueda-button">
                <Button 
                    label="Buscar" 
                    icon="pi pi-search" 
                    onClick={handleSearch} 
                    className="p-button-lg p-button-primary" 
                />
            </div>
        </div>
    );
};
