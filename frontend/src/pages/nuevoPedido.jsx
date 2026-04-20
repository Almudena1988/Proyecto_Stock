import { useEffect, useState } from "react";

export function NewOrder() {

    const [order, setNewOrder] = useState([]);

    // order al principio = []. Cuando se hace llamada a la API, devuelve datos (data) y setNewOrder cambia el valor inicial
    // de order de [] a los datos que traiga data

    useEffect(() => {
        fetch('/api/v1/products')
            .then(res => res.json())
            .then(data => setNewOrder(data))
            .catch(err => console.error("Error: ", err));
    }, []);

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
                                <td><input type="number" min="0" />Unidades</td>
                            </tr>
                        ))) : (<tr>
                            <td colSpan="4">Cargando...</td>
                        </tr>)}
                </tbody>
            </table>

            <div>
                <button type="button"> Submit </button>
            </div>
        </div>
    );
}


