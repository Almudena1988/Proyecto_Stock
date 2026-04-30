// Puente entre (DOM) HTML y React. Inicializa React

import { StrictMode } from 'react' // Detecta errores 
import { createRoot } from 'react-dom/client' // Crea el "root" donde React se monta
import './index.css' // Se importa porque debe aplicarse desde el inicio
import App from './App.jsx'
import { Toaster } from "sileo";
// Envuelve toda la aplicación habilitando el enrutamiento de la app
// Detecta cambios en la URL y renderiza el componente correspondiente (<Route>)
import { BrowserRouter } from 'react-router-dom' 



// React arranca. Activa el modo estricto. Renderiza <App /> y el frontend nace desde App.jsx
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> 
    <Toaster position="top-right" />
      <App />
    </BrowserRouter>
  </StrictMode>,
)
