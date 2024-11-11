import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ItemsPage } from "./pages/ItemsPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ItemState } from "./context/Item/ItemState";
import { PurchaseState } from "./context/Purchase/PurchaseState";
import { PurchasesPage } from "./pages/PurchasesPage";
import { ItemPage } from "./pages/ItemPage";
import { Navbar } from "./components/Navbar";
import { RegisteredPage } from "./pages/RegisteredPage";

function App() {
  return (
    <ItemState>
      <PurchaseState>
      <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path="/home/*" element={<HomePage />} >

        <Route path="items" element={<ItemsPage />} />
        <Route path="item/:id" element={<ItemPage />} />
        </Route>
        
        <Route path="/purchases" element={<PurchasesPage />} />
        <Route path="/registered" element={<RegisteredPage />} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
    </PurchaseState>
    </ItemState>
  );
}

export default App;
