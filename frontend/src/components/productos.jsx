
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

                    <div key={p.id} style={{ marginBottom: "10px", padding: "10px" }}>                        
                        <p> <strong>Producto:</strong> {p.name} </p>
                        <p> <strong> Id:</strong> {p.id}</p>
                        <p> <strong> Descripcion: </strong>{p.description}</p>
                        <p> <strong> Stock actual: </strong>{p.stock_current}</p>
                        <p> <strong> Stock mínimo: </strong>{p.stock_minimum}</p>
                        <p> <strong> Id del proveedor: </strong> {p.supplier_id}</p>
                    </div>
                ))
            ) : (<p> Cargando datos o no hay datos...</p>)}

        </div>
    );

}


