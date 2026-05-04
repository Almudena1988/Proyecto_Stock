import { useEffect, useState } from "react";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { ConvertirPDF } from "../Pdf";
import Button from '@mui/material/Button';

export function NewOrder() {

    const [order, setOrder] = useState([]); // Lo que viene de la API
    const [newOrders, setNewOrder] = useState([]); // Datos modificados para el PDF
    const [generated, setGenerated] = useState(false); // Para que muestre o no el botón de "Imprimir pedido en PDF"


    // order al principio = []. Cuando se hace llamada a la API, devuelve datos (data) 
    // y setNewOrder cambia el valor inicial de order de [] a los datos que traiga data

    useEffect(() => {
        fetch('/api/v1/products')
            .then(res => res.json())
            .then(data => setOrder(data))
            .catch(err => console.error("Error: ", err));
    }, []); // Se renderiza solo cuando recarga la página

    const handleGeneratedOrder = () => { // Función para generar el pedido
        const generated = order.map(o => ({
            name: o.name,
            quantity: (o.quantity || 0)

        }));
        setNewOrder(generated) // Se guarda el pedido 
        setGenerated(true); // Una vez se genera el pedido se muestra el botón de Imprimir pedido
    };

    const handleSendOrder = async () => {

        const response = await fetch('api/v1/orders', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(newOrders)

        });
        const data = await response.json();
        console.log("Pedido guardado", data)

    }

    return (

        <div className="table-container">
            <h2> Pedido en curso: </h2>
            <table className="main-table">
                <thead className="table-head">
                    <tr>
                        <th className="table-head-data-new-order">Producto </th>
                        <th className="table-head-data-new-order">Stock actual </th>
                        <th className="table-head-data-new-order">Stock Mínimo</th>
                        <th className="table-head-data-new-order">Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                    {order.length > 0 ? (
                        order.map((o) => (
                            <tr key={o.id}>
                                <td className="table-data-new-order">{o.name}</td>
                                <td className="table-data-new-order">{o.stock_current}</td>
                                <td className="table-data-new-order">{o.stock_minimum}</td>
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
                    onClick={() => { handleGeneratedOrder(); handleSendOrder() }}
                    type="button">

                    Generar pedido

                </Button>

                {generated && newOrders.length > 0 && (
                    <PDFDownloadLink
                        document={<ConvertirPDF data={newOrders} />}
                        fileName="pedido.pdf">

                        {({ loading }) =>
                            loading ? <button className="pdf-button">"Generando PDF..." </button> :

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





