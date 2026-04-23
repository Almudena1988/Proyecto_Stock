import { useEffect, useState } from "react";
import { NewSupplier } from "./NewSupplier";
import { UpdateSupplier } from "./UpdateSupplier";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Toaster, sileo } from "sileo";



export function Proveedores() { // Se define el componente

    // useState: Para manejar estado (datos que cambian). Se empieza con un array vacío
    // proveedores: estado
    // setProveedores: función para actualizar el estado
    const [proveedores, setProveedores] = useState([]);  // Es el estado inicial 
    const [nuevoProveedor, setNuevoProveedor] = useState(false);
    const [proveedorEdit, setProveedorEdit] = useState(null);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    useEffect(() => { // Para ejecutar código cuando el componente se carga en pantalla o se cambia
        fetch("/api/v1/suppliers") // Petición a la API
            .then(res => res.json())
            .then(data => setProveedores(data)) // Guarda los datos en proveedores. Provoca que el componente se vuelva a renderizar
            .catch(err => console.error("Error:", err));
    }, []); // [] => el useEffect solo se ejecuta una vez al montar el componente

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/v1/suppliers/${id}`, {
                method: "DELETE"
            });

            if (response.ok) {
                console.log("Proveedor eliminado")
                sileo.error({ title: "Proveedor eliminado"})

                //Recarga la página automáticamente
                setProveedores(previa =>
                    // Filter crea un nuevo array con los elementos que tengan id diferente al que quiero borrar
                    previa.filter(p => p.id !== id)
                );
            } else {
                console.log("Status: ", response.status)
            }
        } catch (error) {
            console.log("Error al borrar proveedor")
        }
    }
    // Empieza lo que el componente muestra por pantalla, lo que renderiza
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
                            <td>
                                <button onClick={() => setNuevoProveedor(p)}>Modificar</button>
                            </td>
                            <td>
                                <Button onClick={handleClickOpen}> Eliminar</Button>
                                <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                    role="alertdialog"
                                >
                                    <DialogTitle id="alert-dialog-title"> {"Mensaje"} </DialogTitle>
                                    <DialogContent>

                                        <DialogContentText id="alert-dialog-description">
                                            ¿Estás seguro de que quieres eliminar la información?
                                        </DialogContentText>
                                    </DialogContent>

                                    <DialogActions>
                                        <Button onClick={handleClose} autoFocus>No</Button>
                                        <Button onClick={() => {
                                            handleDelete(p.id);
                                            handleClose();
                                        }}>
                                            Si
                                        </Button>
                                    </DialogActions>
                                </Dialog></td>
                        </tr>
                    ))) : (<tr>
                        <td>Cargando datos</td>
                    </tr>)}

                </tbody>

            </table>
            <div>
                {/* Añadir*/}
                <button onClick={() => setNuevoProveedor(true)}>Añadir Proveedor</button>
            </div>
            <div>
                {/* Editar */}
                {proveedorEdit && (<UpdateSupplier {...setProveedorEdit} />)}
            </div>

            {/* Añadir */}
            <div>
                {nuevoProveedor && (<NewSupplier />)}
            </div>


        </div>
    );
}