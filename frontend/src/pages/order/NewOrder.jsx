import { useEffect, useState } from "react";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { ConvertirPDF } from "../Pdf";
import Button from '@mui/material/Button';
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export function NewOrder() {

    // order al principio = []. Cuando se hace llamada a la API, devuelve datos (data) 
    // y setOrder cambia el valor inicial de order de [] a los datos que traiga data
    const [order, setOrder] = useState([]); // Lo que viene de la API

    // Datos modificados para el PDF
    const [newOrders, setNewOrder] = useState([]);

    // Para que muestre o no el botón de "Imprimir pedido en PDF" 
    const [generated, setGenerated] = useState(false);

    // Estado para ordenar campos
    const [sortAsc, setSortAsc] = useState(true);


    useEffect(() => {
        fetch('/api/v1/products')
            .then(res => res.json())
            .then(data => setOrder(data))
            .catch(err => console.error("Error: ", err));
    }, []); // Se renderiza solo cuando recarga la página

    // Función para generar el pedido
    const handleGeneratedOrder = async () => {

        const generated = order
            .filter(o => o.quantity > 0)
            .map(o => ({
                name: o.name,
                id: o.id,               
                quantity: o.quantity
            }));

        setNewOrder(generated) // Se guarda el pedido 
        setGenerated(true); // Una vez se genera el pedido se muestra el botón de Imprimir pedido
        console.log("Pdf Data:", newOrders);
    

    // Función para guardar el pedido
    

        const response = await fetch('/api/v1/orders', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(generated)

        });
        const data = await response.json();
        console.log("Pedido guardado", data)

};

    return (

        <div className="table-container">

            <h2> Pedido en curso: </h2>

            <div style={{ marginBottom: "20px" }}>

                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    // sortAsc se inicia en true y ahora setSortAsc cambia el estado a false
                    onClick={() => setSortAsc(!sortAsc)}
                    startIcon={
                        sortAsc
                            ? <ArrowUpwardIcon />
                            : <ArrowDownwardIcon />
                    }
                >
                    Ordenar proveedor

                </Button>

            </div>

            <table className="main-table">

                <thead className="table-head">

                    <tr>
                        <th className="table-head-data-new-order">Producto </th>
                        <th className="table-head-data-new-order">Stock actual </th>
                        <th className="table-head-data-new-order">Stock Mínimo</th>
                        <th className="table-head-data-new-order">Id proveedor</th>
                        <th className="table-head-data-new-order">Cantidad</th>
                    </tr>

                </thead>

                <tbody>
                    {order.length > 0 ? (

                        [...order]
                            // .sort ordena los elementos del array comparándolos de 2 en dos
                            .sort((a, b) => // a y b son los elementos del array 
                                sortAsc
                                    // id 5 - id 3 = 2 (positivo. b va antes que a)
                                    // id 1 - id 2 = -1 (negativo. a va antes que b)

                                    // Si sortAsc es true, orden ascendente
                                    ? a.supplier_id - b.supplier_id
                                    // Si es false, orden descendente
                                    : b.supplier_id - a.supplier_id
                            )

                            .map((o) => (

                                <tr key={o.id}>
                                    <td className="table-data-new-order">{o.name}</td>
                                    <td className="table-data-new-order">{o.stock_current}</td>
                                    <td className="table-data-new-order">{o.stock_minimum}</td>
                                    <td className="table-data-new-order">{o.supplier_id}</td>
                                    <td className="table-data-new-order"><input
                                        type="number"
                                        min="0"
                                        value={o.quantity || ""}
                                        onChange={(e) => {
                                            // Se recorre todos los productos
                                            const updated = order.map(item =>
                                                //cambia el que coincide con el ID
                                                item.id === o.id
                                                    ? { ...item, quantity: Number(e.target.value) }
                                                    : item
                                            );
                                            // guarda la nueva cantidad
                                            setOrder(updated);
                                        }}
                                    />
                                        Unidades
                                    </td>
                                </tr>
                            ))) : (<tr>
                                <td colSpan="4">Cargando...</td>
                            </tr>)}
                </tbody>
            </table>

            <div>
                <Button
                    size="small"
                    variant="contained"
                    color="success"
                    onClick={handleGeneratedOrder}
                    type="button">

                    Generar pedido

                </Button>

                {generated && newOrders.length > 0 && (
                    
                    <PDFDownloadLink
                        key={JSON.stringify(newOrders)}
                        document={<ConvertirPDF data={newOrders} />}
                        fileName="pedido.pdf">

                        {({ loading }) =>
                            loading ? <button className="pdf-button">Generando PDF... </button> :

                                <Button

                                    size="small"
                                    variant="contained"
                                    color="success">

                                    Imprimir pedido en PDF

                                </Button>
                        }
                    </PDFDownloadLink>
                )}
            </div>
        </div>
    );

}





