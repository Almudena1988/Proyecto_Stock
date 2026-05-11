import { useState } from "react";
import { sileo } from "sileo";
import Button from '@mui/material/Button';

export function CrearProducto({ setProducts, setProductAdd }) {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [stock_current, setStockCurrent] = useState(0);
    const [stock_minimum, setStockMinimum] = useState(0);
    const [supplier_id, setSupplierId] = useState("");

    // e: Evento que notifica cuando ocurre algo en la interfaz
    // handleSubmit: handler de evento. Se ejecuta cuando se envía el formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita que la página se cargue al enviar el formulario
        try {
            // Petición HTTP al backend. Se guarda en la variable response
            const response = await fetch('/api/v1/products', { 
                method: 'POST',
                headers: {
                    "Content-type": "application/json", // Se envía un JSON
                },
                body: JSON.stringify({  // Convierte el objeto JavaScript a JSON
                    name,
                    description,
                    stock_current,
                    stock_minimum,
                    supplier_id
                })
            });            
            // Convierte el body de la respuesta HTTP y lo transforma desde JSON a objeto JavaScript
            const data = await response.json();


            if (response.ok) {
                console.log("Nuevo producto añadido");
                sileo.success({ title: "Nuevo producto añadido" })

                // setProducts es la función que actualiza el estado
                // prev es el valor inicial, antes de actualizarse
                // [...prev] copia los elementos del array anterior
                // Luego se añade el nuevo objeto
                
                setProducts(prev => [...prev, {
                    id: data.id, // Viene del backend porque genera automáticamente el ID
                    name,
                    description,
                    stock_current,
                    stock_minimum,
                    supplier_id
                }]);
                setProductAdd(false) // Cierra el formulario

            } else {
                console.log("Status:", response.status); // Muestra el códido HTTP
                console.log("Body:", data);
            }

        } catch (error) {
            console.log("Error añadiendo nuevo producto", error);
        }
    };

    return (
        //onSubmit siempre dispara un evento (como onClick u onChange)
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Nombre"
                value={name} // Viene del estado (useState)
                //onChange: actualiza el estado cada vez que se escriba en el input
                onChange={(e) => setName(e.target.value)}

            
            />
            <input
                type="text"
                placeholder="Descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="number"
                placeholder="Stock actual"
                value={stock_current}
                // Se escribe el número, se dispara onChange, React crea el evento, e.target.value =5, se ejecuta: setStockCurrent("5")
                onChange={(e) => setStockCurrent(e.target.value)}
            />
            <input
                type="number"
                placeholder="Stock Mínimo"
                value={stock_minimum}
                onChange={(e) => setStockMinimum(e.target.value)}
            />
            <input
                type="text"
                placeholder="Id del proveedor"
                value={supplier_id}
                onChange={(e) => setSupplierId(e.target.value)}
            />
            <Button size="small" variant="contained" color="success" type="submit">Añadir</Button>
        </form>
    );
}

