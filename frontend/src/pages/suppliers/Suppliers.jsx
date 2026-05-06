import { useEffect, useState } from "react";
import { NewSupplier } from "./NewSupplier";
import { UpdateSupplier } from "./UpdateSupplier";
import { Toaster, sileo } from "sileo";
import { Icon } from '@blueprintjs/core'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';




export function Proveedores() { // Se define el componente

    // useState: Para manejar estado (datos que cambian). Se empieza con un array vacío
    // proveedores: estado
    // setProveedores: función para actualizar el estado

    const [supplier, setSupplier] = useState([]);  // Es el estado inicial 
    const [newSupplier, setNewSupplier] = useState(false);
    const [supplierEdit, setSupplierEdit] = useState(null);
    const [supplierDelete, setSupplierDelete] = useState(null);


    useEffect(() => { // Para ejecutar código cuando el componente se carga en pantalla o se cambia
        fetch("/api/v1/suppliers") // Petición a la API
            .then(res => res.json())
            .then(data => setSupplier(data)) // Guarda los datos en proveedores. Provoca que el componente se vuelva a renderizar
            .catch(err => console.error("Error:", err));
    }, []); // [] => el useEffect solo se ejecuta una vez al montar el componente

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/v1/suppliers/${id}`, {
                method: "DELETE"

            });
            const data = await response.text();
            console.log("Respuesta backend:", data);

            if (response.ok) {
                console.log("Proveedor eliminado")
                sileo.error({ title: "Proveedor eliminado" })

                //Recarga la página automáticamente
                setSupplier(previa =>
                    // Filter crea un nuevo array con los elementos que tengan id diferente al que quiero borrar
                    previa.filter(p => p.id !== id)
                );
            } else {
                console.log("Status: ", response.status, data)
            }
        } catch (error) {
            console.log("Error al borrar proveedor", error)
        }
    }
    // Empieza lo que el componente muestra por pantalla, lo que renderiza
    return (
        <div className="table-container">

            <h2>Proveedores</h2>

            <table className="main-table">

                <thead>

                    <tr >
                        <th className="table-head-data">Nombre</th>
                        <th className="table-head-data">Id proveedor</th>
                        <th className="table-head-data">Email</th>
                        <th className="table-head-data">Dirección</th>
                        <th className="table-head-data">Fecha de creación</th>
                    </tr>

                </thead>

                <tbody>

                    {supplier.length > 0 ? (supplier.map((p) => (

                        <tr className="tr-data" key={p.id}>
                            <td className="table-data">{p.name}</td>
                            <td className="table-data">{p.id}</td>
                            <td className="table-data">{p.email}</td>
                            <td className="table-data">{p.address}</td>
                            <td className="table-data">{new Date(p.created_at).toLocaleString("es-ES")}</td>
                            <td className="table-button">

                                <Icon
                                    icon="edit"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => setSupplierEdit(p)}
                                />

                            </td>

                            <td className="table-button">

                                <Icon
                                    icon="trash"
                                    style={{ cursor: "pointer" }}
                                    color="green"
                                    onClick={() => setSupplierDelete(p)}
                                />
                            </td>

                        </tr>
                    ))) : (<tr>
                        <td>Cargando datos</td>
                    </tr>)}

                </tbody>

            </table>

            <Dialog

                open={!!supplierDelete}
                onClose={() => setSupplierDelete(null)}
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

                    <Button onClick={() => setSupplierDelete(null)}>No</Button>

                    <Button onClick={() => {
                        handleDelete(supplierDelete.id);
                        setSupplierDelete(null);
                    }}>
                        Si
                    </Button>

                    <Button
                        style={{ top: "0", right: "0", position: "absolute" }}
                        onClick={() => setSupplierDelete(null)}>

                        x

                    </Button>

                </DialogActions>

            </Dialog>

            <div>
                {/* Añadir*/}
                <Button size="small"
                    variant="contained"
                    color="success"
                    onClick={() => setNewSupplier(true)}>
                    Añadir Proveedor
                </Button>

            </div>

            <div>
                {/* Editar */}
                {supplierEdit && (<UpdateSupplier {...supplierEdit}
                    setProveedorEdit={setSupplierEdit} />)}
            </div>


            <div>
                {/* Añadir */}
                {newSupplier && (<NewSupplier setNuevoProveedor={setNewSupplier} />)}
            </div>


        </div>
    );
}