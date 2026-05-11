import { useState, useEffect } from "react";
import { CrearProducto } from "./NewProduct";
import { Link } from "react-router-dom";
import { ModificarProducto } from "./UpdateProduct";
import { Toaster, sileo } from "sileo";
import { Icon } from '@blueprintjs/core'
import { useReactTable, getCoreRowModel, getPaginationRowModel, flexRender } from '@tanstack/react-table';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



export function Productos() {
    const [products, setProducts] = useState([]);
    const [productEdit, setProductEdit] = useState(null);

    // useState: sirve para guardar y actualizar datos dentro del componente
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
                sileo.success({ title: "Producto eliminado" });


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

    // Componente de React que interpreta como <DataTable/>, hijo dentro de Productos. 
    const DataTable = () => {

        // Los datos (products) que se obtienen desde la API, se guardan en data
        const data = products;

        // Se definen las columnas de la tabla. Cada objeto es una columna
        const columns = [
            {
                accessorKey: "id", // Busca el id en products.id
                header: () => "Id" // Se define el nombre de la columna
            },
            {
                accessorKey: "name",
                header: () => "Nombre del producto"
            },
            {
                accessorKey: "description",
                header: () => "Descripcion del producto"
            },
            {
                accessorKey: "stock_current",
                header: () => "Stock Actual"
            },
            {
                accessorKey: "stock_minimum",
                header: () => "Stock Minimo"
            },
            {
                accessorKey: "supplier_id",
                header: () => "Id Proveedor"
            }
        ];

        // Estado para controlar la paginación
        const [pagination, setPagination] = useState({
            pageIndex: 0, // Página primera
            pageSize: 8, // Cantidad de filas por página
        });

        // Se inicializa TanStack Table
        const table = useReactTable({
            data, // Los datos que se muestran
            columns, // Las columnas definidas anteriormente
            getCoreRowModel: getCoreRowModel(), // Genera las filas básicas de la tabla
            getPaginationRowModel: getPaginationRowModel(), // Activa la paginación
            onPaginationChange: setPagination, // Cuando se cambia de página, actualiza el estado de pagination y re renderiza
            state: { // Se le pasa a la tabla el estado actual
                pagination,
            },
        });

        return (
            <div className="table-container">

                <div>

                    <h2>Productos</h2>

                    <table className="main-table" >

                        <thead className="table-head">

                            {/* Se organizan las columnas en grupos, este caso solo hay un grupo, header de un nombre (id, nombre...) 
                            Obtiene los grupos, recorre cada grupo con map 
                            y luego cada columna dentro del grupo.
                            Devuelve un objeto con la estructura de los encabezados, los títulos de las columnas */}
                            {table.getHeaderGroups().map(headerGroup =>

                                <tr key={headerGroup.id}> {/* Crea una fila del encabezado */}
                                    {headerGroup.headers.map(header => (
                                        <th key={header.id} className="table-head-data">
                                            {header.isPlaceholder
                                                // El header puede ser texto simple, función o JSX, así flexRender 
                                                //es una forma universal de TanStack de renderizar cualquier tipo
                                                ? null : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </th>
                                    ))}

                                </tr>)}

                        </thead>

                        <tbody>

                            {table.getRowModel().rows.length > 0 ? (
                                table.getRowModel().rows.map((row) => (

                                    <tr className="tr-data" key={row.id}>
                                        {row.getVisibleCells().map((cell) => (
                                            <td key={cell.id} className="table-data">
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                ) || cell.getValue()}
                                            </td>
                                        ))}
                                        <td className="table-button">

                                            {/* Editar */}
                                            <Icon
                                                icon="edit"
                                                style={{ cursor: "pointer" }}
                                                // Se usa función flecha cuando se pasa argumentos en la función
                                                onClick={() => setProductEdit(row.original)}
                                            />

                                        </td>

                                        <td className="table-button">

                                            {/* Borrar */}
                                            <Icon
                                                icon="trash"
                                                color="green"
                                                onClick={() => setProductDelete(row.original)}
                                            />

                                        </td>

                                    </tr>
                                ))) : (<tr>
                                    <td colSpan="7">Cargando</td>
                                </tr>)}

                        </tbody>

                    </table>

                    <Button
                        onClick={() => table.firstPage()}
                        disabled={!table.getCanPreviousPage()} // Desactiva si no hay más páginas
                        style={{
                            fontSize:"18px",                            
                            position: "fixed",
                            bottom: "50px",
                            right: "250px"
                        }}
                    >
                        {'<<'}
                    </Button>
                    <Button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        style={{
                            fontSize:"18px",                            
                            position: "fixed",
                            bottom: "50px",
                            right: "210px"
                        }}
                    >
                        {'<'}
                    </Button>
                    <Button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        style={{
                            fontSize:"18px",                            
                            position: "fixed",
                            bottom: "50px",
                            right: "170px"
                        }}

                    >
                        {'>'}
                    </Button>
                    <Button
                        onClick={() => table.lastPage()}
                        disabled={!table.getCanNextPage()}
                        style={{
                            fontSize:"18px",                                                     
                            position: "fixed",
                            bottom: "50px",
                            right: "130px"
                        }}
                    >
                        {'>>'}
                    </Button>

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
                        setProductEdit={setProductEdit}
                         />)}
                {/* Añadir */}
                <div>
                    {/* Si productoCreando es true, renderiza <CrearProducto /> */}
                    {/* CrearProducto es un elemento hijo y los datos y funciones en envían 
                de padre a hijo mediante props */}
                    {productAdd && (<CrearProducto setProducts={setProducts} setProductAdd={setProductAdd} />)}
                </div>




            </div>
        );

    }
    return <DataTable />
}


