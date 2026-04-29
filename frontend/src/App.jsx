// Componente raíz de la aplicación React. Desde aquí se construye y renderiza toda la UI

import './App.css'
import { Login } from './pages/Login';
import { Routes, Route } from 'react-router-dom';
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "normalize.css";
import { useState } from 'react';
import { Proveedores } from './pages/suppliers/Suppliers'
import { Productos } from './pages/products/Products';
import { Pedido } from './pages/order/Order'
import { NewOrder } from './pages/order/NewOrder';
import { CrearProducto } from './pages/products/NewProduct';
import { NavBar } from './pages/NavBar';


function App() {

  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : "light"}>
      <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />

      <Routes>
        <Route path="/" element={<Login />} />        
        <Route path="/home" element={<Productos darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/proveedores" element={<Proveedores />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/pedido" element={<Pedido />} />
        <Route path="/new" element={<NewOrder />} />
        <Route path="/newproduct" element={<CrearProducto />} />
      </Routes>

    </div>

  )
}

export default App;
