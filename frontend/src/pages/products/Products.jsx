
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
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


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
                                        {/* Editar */}
                                        <Button size="small" variant="contained" color="success" onClick={() => setProductoEditando(p)}>
                                            Modificar
                                        </Button>
                                    </td>
                                    <td>
                                        {/* Borrar */}
                                        <Button size="small" variant="contained" color="success" onClick={handleClickOpen}> Eliminar </Button>
                                        <Dialog open={open} onClose={handleClose}>
                                            <DialogTitle id="dialog-title">{"Mensaje"}</DialogTitle>

                                            <DialogContent>
                                                <DialogContentText id="dialog-description">
                                                    ¿Estás seguro de que quieres eliminar el contenido?
                                                </DialogContentText>
                                            </DialogContent>

                                            <DialogActions>
                                                <Button onClick={handleClose} color="primary">
                                                    No
                                                </Button>

                                                {/* Se borra una fila y se cierra la ventana*/}
                                                <Button onClick={() => {
                                                    handleDelete(p.id);
                                                    handleClose();
                                                }} color="primary" autoFocus>
                                                    Si
                                                </Button>
                                                <Button style={{ top: "0", right: "0", position: "absolute" }} onClick={handleClose}>x</Button>
                                            </DialogActions>
                                        </Dialog>
                                    </td>
                                </tr>
                            ))) : (<tr>
                                <td colSpan="7"> Cargando</td>
                            </tr>)}
                    </tbody>
                </table>
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
                setProductoEditando={setProductoEditando}/>)}
            {/* Añadir */}
            <div>
                {/* Si productoCreando es true, renderiza <CrearProducto /> */}
                {productoCreando && (<CrearProducto setProductoCreando={setProductoCreando}/>)}
            </div>

        </div>
    );

}


