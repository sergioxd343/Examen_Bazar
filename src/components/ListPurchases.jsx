import React, { useContext, useEffect } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { useNavigate } from "react-router-dom";
import { PurchaseContext } from "../context/Purchase/PurchaseContext";

export const ListPurchases = () => {
    const { sales, getSales } = useContext(PurchaseContext);

    const navigate = useNavigate();

    const handleExit = () => {
        navigate(`/`);
    };

    useEffect(() => {
        getSales();
    }, []);

    const groupByDate = (sales) => {
        return sales.reduce((groups, sale) => {
            const date = new Date(sale.purchase_date).toLocaleDateString();
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(sale);
            return groups;
        }, {});
    };

    const handleTouchPurchase = (id) => {
        navigate(`/home/item/${id}`);
    }

    const groupedSales = groupByDate(sales);

    return (
        <div className="p-grid p-dir-col list-items-container">
            <h1>Purchases</h1>
            <Divider />
            {Object.keys(groupedSales).map((date) => (
                <div key={date}>
                    {groupedSales[date].map((item) => (
                        <div key={item.id} className="p-col-12 p-md-7" onClick={() => handleTouchPurchase(item.id)}>
                            <div>
                                <Card style={{ marginBottom: "2em",  width: "100%"  }} >
                                    <div style={{ display: "flex" }}>
                                        <img
                                            src={item.thumbnail}
                                            alt={item.title}
                                            style={{ width: "150px", marginRight: "1em" }}
                                        />
                                        <div>
                                            <div className="flex justify-content-between flex-wrap">
                                                <h2>{item.title}</h2>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    ))}
                    <Divider />
                </div>
            ))}
            <div className="card flex justify-content-center">
                <Button label="Salir" onClick={handleExit} />
            </div>
        </div>
    );
};