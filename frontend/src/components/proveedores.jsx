import { useEffect, useState } from "react";


export function Proveedores() { // Se define el componente

    // useState: Para manejar estado (datos que cambian). Se empieza con un array vacío
    // proveedores: estado
    // setProveedores: función para actualizar el estado
    const [proveedores, setProveedores] = useState([]);  // Es el estado inicial 

    useEffect(() => { // Para ejecutar código cuando el componente se carga en pantalla o se cambia
        fetch("/api/v1/suppliers") // Petición a la API
            .then(res => res.json())
            .then(data => setProveedores(data)) // Guarda los datos en proveedores. Provoca que el componente se vuelva a renderizar
            .catch(err => console.error("ERROR:", err));
    }, []); // [] => el useEffect solo se ejecuta una vez al montar el componente

    return (
        <div>
            <h2>Proveedores</h2>

            
            {proveedores.length > 0 ? (// Comprueba si hay proveedores en el array. Si hay muestra la lista, si no hay datos, mensaje de carga
                proveedores.map((p) => ( // map: método para recorrer todos los elementos de un array
                    <div key={p.id} style={{ marginBottom: "10px" }}> 
                        <strong>{p.name}</strong>
                        <p>{p.id}</p>
                        <p>{p.email}</p>
                        <p>{p.address}</p>
                        <p>{p.created_at}</p>
                    </div>
                ))
            ) : (<p>Cargando o no hay datos...</p>)} 
        </div>
    );
}