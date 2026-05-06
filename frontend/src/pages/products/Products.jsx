import { useState, useEffect } from "react";
import { CrearProducto } from "./NewProduct";
import { Link } from "react-router-dom";
import { ModificarProducto } from "./UpdateProduct";
import { Toaster, sileo } from "sileo";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export function Productos() {
    const [products, setProducts] = useState([]);
    const [productEdit, setProductEdit] = useState(null);
    
    // useState(true/false) se puede utilizar para manejar cosas como:
    // Mostrar/ocultar formularios
    // Abrir/cerrar modales
    // Mostrar menús desplegables
    // Activar/desactivar elementos

    const [productAdd, setProductAdd] = useState(false); //En false no muestra el formulario
    const [productDelete, setProductDelete] = useState(null);

    useEffect(() => {
        fetch("/api/v1/products")
            .then(res => res.json())
            .then(data => setProducts(data))
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
                setProducts(previa =>
                    // Filter crea un nuevo array con los elementos que tengan id diferente al que quiero borrar
                    previa.filter(p => p.id !== id)
                );
            } else {
                console.log("Error:", response.status);
            }

        } catch (error) {
            console.log("Error al borrar producto", error);
        }
    };

    return (
        <div className="table-container">

            <div>

                <h2>Productos</h2>

                <table className="main-table" >

                    <thead className="table-head">

                        <tr>
                            <th className="table-head-data">Nombre</th>
                            <th className="table-head-data">Id producto</th>
                            <th className="table-head-data">Descripción</th>
                            <th className="table-head-data">Stock actual</th>
                            <th className="table-head-data">Stock mínimo</th>
                            <th className="table-head-data">Id proveedor</th>
                        </tr>

                    </thead>

                    <tbody>

                        {products.length > 0 ? (
                            products.map((p) => (

                                <tr className="tr-data" key={p.id}>
                                    <td className="table-data">{p.name}</td>
                                    <td className="table-data">{p.id} </td>
                                    <td className="table-data">{p.description}</td>
                                    <td className="table-data">{p.stock_current}</td>
                                    <td className="table-data">{p.stock_minimum}</td>
                                    <td className="table-data">{p.supplier_id}</td>
                                    <td className="table-button">

                                        {/* Editar */}
                                        <Button size="small"
                                            variant="contained"
                                            color="success"
                                            onClick={() => setProductEdit(p)}>

                                            Modificar

                                        </Button>

                                    </td>

                                    <td className="table-button">

                                        {/* Borrar */}
                                        <Button size="small"
                                            variant="contained"
                                            color="success"
                                            onClick={() => setProductDelete(p)}>

                                            Eliminar

                                        </Button>

                                    </td>

                                </tr>
                            ))) : (<tr>
                                <td colSpan="7">Cargando</td>
                            </tr>)}

                    </tbody>

                </table>

                <Dialog

                    open={!!productDelete}
                    onClose={() => setProductDelete(null)}
                >
                    <DialogTitle id="dialog-title">{"Mensaje"}</DialogTitle>

                    <DialogContent>

                        <DialogContentText id="dialog-description">
                            ¿Estás seguro de que quieres eliminar el contenido?
                        </DialogContentText>

                    </DialogContent>

                    <DialogActions>

                        <Button 
                        onClick={() => setProductDelete(null)} 
                        color="primary">

                            No

                        </Button>

                        {/* Se borra una fila y se cierra la ventana*/}
                        <Button onClick={() => {
                            handleDelete(productDelete.id);
                            setProductDelete(null);
                        }} color="primary" autoFocus>
                            Si
                        </Button>

                        <Button
                            style={{ top: "0", right: "0", position: "absolute" }}
                            onClick={() => setProductDelete(null)}>
                            x
                        </Button>

                    </DialogActions>

                </Dialog>

            </div>

            <div>
                {/* Añadir */}
                {/*Se inicializa la función en true para mostrar el formulario */}
                <Button size="small" variant="contained" color="success" onClick={() => setProductAdd(true)}>
                    Añadir producto nuevo
                </Button>

            </div>

            {/* Editar */}
            {productEdit && ( // && Solo si existe la propiedad se renderiza
                // Si el componente tiene props (ModificarProducto tiene: id, name...)
                // con spread operator ... se le pueden pasar props dinámicos
                // sin spread operator => <ModificarProducto id={producto.id} name={producto.name} stock={producto.stock} />
                <ModificarProducto {...productEdit}
                    setProductoEditando={setProductEdit} />)}
            {/* Añadir */}
            <div>
                {/* Si productoCreando es true, renderiza <CrearProducto /> */}
                {productAdd && (<CrearProducto setProductoCreando={setProductAdd} />)}
            </div>

        </div>
    );

}


