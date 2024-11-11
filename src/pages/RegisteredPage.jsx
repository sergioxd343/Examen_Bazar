import { Button } from 'primereact/button'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const RegisteredPage = () => {
    const navigate = useNavigate();

    const handleExit = () => {
        navigate(`/`);
    }
  return (
    <div>
        <h1>Registered Purchases</h1>

        <div className="card flex justify-content-center">
                <Button label="Salir" onClick={handleExit} />
            </div>
    </div>
  )
}
