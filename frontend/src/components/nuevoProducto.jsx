import { useState } from "react";

export function CrearProducto() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [stock_current, setStockCurrent] = useState("");
    const [stock_minimum, setStockMinimum] = useState("");
    const [supplierId, setSupplierId] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
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
                    supplierId
                })
            });
            const data = await response.json().catch(() => null);

            if (response.ok) {
                console.log("Nuevo producto añadido");
            } else {
                console.log("Error backend:", data);
            }

        } catch (error) {
            console.log("Error añadiendo nuevo producto");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Nombre"
                value={name}
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
                onChange={(e) => setStockCurrent(e.target.value)}
            />
            <input
                type="number"
                placeholder="Stock Mínimo"
                value={stock_minimum}
                onChange={(e) => setStockMinimum(e.target.value)}
            />
            <input
                type="number"
                placeholder="Id del proveedor"
                value={supplierId}
                onChange={(e) => setSupplierId(e.target.value)}
            />
            <button type="submit">Añadir</button>
        </form>
    );
}

