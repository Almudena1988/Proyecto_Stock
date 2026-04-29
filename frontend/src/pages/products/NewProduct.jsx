import { useState } from "react";
import { Toaster, sileo } from "sileo";
import Button from '@mui/material/Button';

export function CrearProducto(setProductoCreando) {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [stock_current, setStockCurrent] = useState(0);
    const [stock_minimum, setStockMinimum] = useState(0);
    const [supplier_id, setSupplierId] = useState("");

    // e: Evento que notifica cuando ocurre algo en la interfaz
    // handleSubmit: handler de evento
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita que la página se cargue al enviar el formulario
        try {
            const response = await fetch('/api/v1/products', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    description,
                    stock_current,
                    stock_minimum,
                    supplier_id
                })
            });
            const data = await response.json().catch(() => null);

            if (response.ok) {
                console.log("Nuevo producto añadido");
                sileo.success({ title: "Nuevo producto añadido"})
                setProductoCreando(null);
            } else {
                console.log("Status:", response.status);
                console.log("Body:", data);
            }

        } catch (error) {
            console.log("Error añadiendo nuevo producto");
        }
    };

    return (
        //onSubmit siempre dispara un evento (como onClick u onChange)
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Nombre"
                value={name} // 
                //onChange: actualiza el estado cada vez que se escriba en el input
                onChange={(e) => setName(e.target.value)}

            // Se escribe el número, se dispara onChange, React crea el evento, e.target.value =5, se ejecuta: setStockCurrent("5")
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

