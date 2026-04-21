import { useEffect, useState } from "react";
import { NewSupplier } from "./newSupplier";


export function Proveedores() { // Se define el componente

    // useState: Para manejar estado (datos que cambian). Se empieza con un array vacío
    // proveedores: estado
    // setProveedores: función para actualizar el estado
    const [proveedores, setProveedores] = useState([]);  // Es el estado inicial 
    const [nuevoProveedor, setNuevoProveedor] = useState(false);


    useEffect(() => { // Para ejecutar código cuando el componente se carga en pantalla o se cambia
        fetch("/api/v1/suppliers") // Petición a la API
            .then(res => res.json())
            .then(data => setProveedores(data)) // Guarda los datos en proveedores. Provoca que el componente se vuelva a renderizar
            .catch(err => console.error("Error:", err));
    }, []); // [] => el useEffect solo se ejecuta una vez al montar el componente

    return (
        <div>
            <h2>Proveedores</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Id proveedor</th>
                        <th>Email</th>
                        <th>Dirección</th>
                        <th>Fecha de creación</th>
                    </tr>
                </thead>
                <tbody>
                    {proveedores.length > 0 ? (proveedores.map((p) => (
                        <tr key={p.id}>
                            <td>{p.name}</td>
                            <td>{p.id}</td>
                            <td>{p.email}</td>
                            <td>{p.address}</td>
                            <td>{p.created_at}</td>
                            <td><button>Modificar</button></td>
                            <td><button>Eliminar</button></td>
                        </tr>
                    ))) : (<tr>
                        <td>Cargando datos</td>
                    </tr>)}

                </tbody>

            </table>
            <div>
                <button onClick={() => setNuevoProveedor(true)}>Añadir Proveedor</button>
            </div>
            <div>
                {nuevoProveedor && (<NewSupplier />)}
            </div>


        </div>
    );
}