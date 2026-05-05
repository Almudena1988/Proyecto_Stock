
import { useState, useEffect } from "react";
import { CrearProducto } from "./NewProduct";
import { Link } from "react-router-dom";
import { ModificarProducto } from "./UpdateProduct";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Toaster, sileo } from "sileo";


export function Productos() {
    const [productos, setProductos] = useState([]);
    const [productoEditando, setProductoEditando] = useState(null);
    // useState(true/false) se puede utilizar para manejar cosas como:
    // Mostrar/ocultar formularios
    // Abrir/cerrar modales
    // Mostrar menús desplegables
    // Activar/desactivar elementos

    const [productoCreando, setProductoCreando] = useState(false); //En false no muestra el formulario
    const [productoAEliminar, setProductoAEliminar] = useState(null);

    useEffect(() => {
        fetch("/api/v1/products")
            .then(res => res.json())
            .then(data => setProductos(data))
            .catch(err => console.error("Error: ", err));
    }, []);

    // Para borrar producto
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/v1/products/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                console.log("Producto eliminado");
                sileo.success({ title: "Producto eliminado" })


                // Actualiza sin recargar
                setProductos(previa =>
                    // Filter crea un nuevo array con los elementos que tengan id diferente al que quiero borrar
                    previa.filter(p => p.id !== id)
                );
            } else {
                console.log("Error:", response.status);
            }

        } catch (error) {
            console.log("Error al borrar producto");
        }
    };

    return (
        <div className="table-container">
            <div>

                <h2>Productos</h2>

                <table className="main-table" >

                    <thead className="table-head">
                        <tr  >
                            <th className="table-head-data">Nombre</th>
                            <th className="table-head-data">Id producto</th>
                            <th className="table-head-data">Descripción</th>
                            <th className="table-head-data">Stock actual</th>
                            <th className="table-head-data">Stock mínimo</th>
                            <th className="table-head-data">Id proveedor</th>
                        </tr>

                    </thead>

                    <tbody>
                        {productos.length > 0 ? (
                            productos.map((p) => (
                                <tr className="tr-data" key={p.id}>
                                    <td className="table-data">{p.name}</td>
                                    <td className="table-data">{p.id} </td>
                                    <td className="table-data">{p.description}</td>
                                    <td className="table-data">{p.stock_current}</td>
                                    <td className="table-data">{p.stock_minimum}</td>
                                    <td className="table-data">{p.supplier_id}</td>
                                    <td className="table-button">
                                        {/* Editar */}

                                        <Button size="small" variant="contained" color="success" onClick={() => setProductoEditando(p)}>
                                            Modificar
                                        </Button>

                                    </td>
                                    <td className="table-button">
                                        {/* Borrar */}

                                        <Button size="small"
                                            variant="contained"
                                            color="success"
                                            onClick={() => setProductoAEliminar(p)}>
                                            Eliminar
                                        </Button>

                                    </td>

                                </tr>
                            ))) : (<tr>
                                <td colSpan="7"> Cargando</td>
                            </tr>)}

                    </tbody>

                </table>

                <Dialog

                    open={!!productoAEliminar}
                    onClose={() => setProductoAEliminar(null)}
                >
                    <DialogTitle id="dialog-title">{"Mensaje"}</DialogTitle>

                    <DialogContent>

                        <DialogContentText id="dialog-description">
                            ¿Estás seguro de que quieres eliminar el contenido?
                        </DialogContentText>

                    </DialogContent>

                    <DialogActions>

                        <Button onClick={() => setProductoAEliminar(null)} color="primary">
                            No
                        </Button>

                        {/* Se borra una fila y se cierra la ventana*/}
                        <Button onClick={() => {
                            handleDelete(productoAEliminar.id);
                            setProductoAEliminar(null);
                        }} color="primary" autoFocus>
                            Si
                        </Button>

                        <Button
                            style={{ top: "0", right: "0", position: "absolute" }}
                            onClick={() => setProductoAEliminar(null)}>
                            x
                        </Button>

                    </DialogActions>

                </Dialog>

            </div>

            <div>
                {/* Añadir */}
                {/*Se inicializa la función en true para mostrar el formulario */}
                <Button size="small" variant="contained" color="success" onClick={() => setProductoCreando(true)}>
                    Añadir producto nuevo
                </Button>

            </div>

            {/* Editar */}
            {productoEditando && ( // && Solo si existe la propiedad se renderiza
                // Si el componente tiene props (ModificarProducto tiene: id, name...)
                // con spread operator ... se le pueden pasar props dinámicos
                // sin spread operator => <ModificarProducto id={producto.id} name={producto.name} stock={producto.stock} />
                <ModificarProducto {...productoEditando}
                    setProductoEditando={setProductoEditando} />)}
            {/* Añadir */}
            <div>
                {/* Si productoCreando es true, renderiza <CrearProducto /> */}
                {productoCreando && (<CrearProducto setProductoCreando={setProductoCreando} />)}
            </div>

        </div>
    );

}


