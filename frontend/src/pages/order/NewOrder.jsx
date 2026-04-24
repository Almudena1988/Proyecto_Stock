import { useEffect, useState } from "react";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { ConvertirPDF } from "../Pdf";

export function NewOrder() {

    const [order, setOrder] = useState([]); // Lo que viene de la API
    const [newOrder, setNewOrder] = useState([]); // Datos modificados para el PDF
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
            id: o.id,
            name: o.name,
            quantity: (o.quantity || 0)

        }));
        setNewOrder(generated) // Se guarda el pedido 
        setGenerated(true); // Una vez se genera el pedido se muestra el botón de Imprimir pedido
    };

    return (

        <div>
            <h2> Pedido en curso: </h2>
            <table>
                <thead>
                    <tr>
                        <th>Producto </th>
                        <th>Stock actual </th>
                        <th>Stock Mínimo</th>
                        <th>Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                    {order.length > 0 ? (
                        order.map((o) => (
                            <tr key={o.id}>
                                <td>{o.name}</td>
                                <td>{o.stock_current}</td>
                                <td>{o.stock_minimum}</td>
                                <td><input
                                    type="number"
                                    min="0"
                                    value={o.quantity || ""}
                                    onChange={(e) => {
                                        // Se recorre todos los producto 
                                        const updated = order.map(item =>
                                            //cambia el que coicide con el ID
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
                <button onClick={handleGeneratedOrder} type="button">
                    Generar pedido
                </button>

                {generated && newOrder.length > 0 && (
                    <PDFDownloadLink
                        document={<ConvertirPDF data={newOrder} />}
                        fileName="pedido.pdf">

                        {({ loading }) =>
                            loading ? <button>"Generando PDF..." </button> : <button>Imprimir pedido en PDF</button>
                        }
                    </PDFDownloadLink>
                )}
            </div>


        </div>
    );
}


