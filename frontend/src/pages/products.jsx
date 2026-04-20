
import { useState, useEffect } from "react";
import { CrearProducto } from "./newProduct";
import { Link } from "react-router-dom";
import { ModificarProducto } from "./updateProduct";


export function Productos() {
    const [productos, setProductos] = useState([]);
    const [productoEditando, setProductoEditando] = useState(null);
    const [productoCreando, setProductoCreando] = useState(false); //En false no muestra el formulario

    useEffect(() => {
        fetch("/api/v1/products")
            .then(res => res.json())
            .then(data => setProductos(data))
            .catch(err => console.error("ERROR: ", err));
    }, []);

    return (
        <div>
            <div>
                <h2>Productos</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Id producto</th>
                            <th>Descripción</th>
                            <th>Stock actual</th>
                            <th>Stock mínimo</th>
                            <th>Id proveedor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.length > 0 ? (
                            productos.map((p) => (
                                <tr key={p.id}>
                                    <td>{p.name}</td>
                                    <td>{p.id} </td>
                                    <td>{p.description}</td>
                                    <td>{p.stock_current}</td>
                                    <td>{p.stock_minimum}</td>
                                    <td>{p.supplier_id}</td>
                                    <td>
                                        <button onClick={() => setProductoEditando(p)}>
                                            Modificar
                                        </button>
                                    </td>
                                    <td>
                                        <button>Eliminar</button>
                                    </td>
                                </tr>
                            ))) : (<tr>
                                <td colSpan="4"> Cargando</td>
                            </tr>)}
                    </tbody>
                </table>
            </div>

            <div>
                {/*Se inicializa la función en true para mostrar el formulario */}
                <button onClick={() => setProductoCreando(true)}>

                    Añadir producto nuevo
                </button>



            </div>

            {productoEditando && ( // && Solo si existe la propiedad se renderiza
                // Si el componente tiene props (ModificarProducto tiene: id, name...)
                // con spread operator ... se le pueden pasar props dinámicos
                // sin spread operator => <ModificarProducto id={producto.id} name={producto.name} stock={producto.stock} />
                <ModificarProducto {...productoEditando} />
            )}
            <div>
                {productoCreando && (<CrearProducto />)}
            </div>
        </div>
    );

}


