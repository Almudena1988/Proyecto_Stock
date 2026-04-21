import '../../css/modales.css';
import { useState } from 'react';

export const Modales = () =>{
    const [mostrar, setMostrar] = useState(false);


  return (
    <div className='div-modales'>
        <h1>Modales</h1>
        <button className='boton-modales' onClick={() => setMostrar(true)}>Ver</button>
        <Modal isOpen={mostrar} onClose={() => setMostrar(false)}/>

    </div>
   
  );
};



