import { useState, useEffect } from "react";

export function Productos() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        fetch("/api/v1/products")
            .then(res => res.json())
            .then(data => setProductos(data))
            .catch(err => console.error("ERROR: ", err));
    }, []);

    return (
        <div>
            <h2>Productos</h2>

            {productos.length > 0 ? (
                productos.map((p) => (

                    <div key={p.id} stryle={{ marginBottom: "10px" }}>
                        <strong>{p.name}</strong>
                        <p> {p.id}</p>
                        <p> {p.name}</p>
                        <p> {p.description}</p>
                        <p> {p.stock_current}</p>
                        <p> {p.stock_minimun}</p>
                        <p> {p.supplier_id}</p>

                    </div>
                ))
            ) : (<p> Cargando datos o no hay datos...</p>)}

        </div>


    );

}