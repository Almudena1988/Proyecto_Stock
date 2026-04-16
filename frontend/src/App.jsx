// Componente raíz de la aplicación React. Desde aquí se construye y renderiza toda la UI

import './App.css'
import { Menu } from './components/menu';
import { Login } from './components/login';
import { Routes, Route } from 'react-router-dom';
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "normalize.css";
import { useState } from 'react';
import { Proveedores } from './components/proveedores'
import { Productos } from './components/productos';
import { Pedido } from './components/pedido'
import { NewOrder } from './components/nuevoPedido';



function App() {

  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : "light"}>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Menu darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/proveedores" element={<Proveedores />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/pedido" element={<Pedido />} />
        <Route path="/new" element={<NewOrder/>} />


      </Routes>
    </div>

  )
}

export default App;
