import { useEffect, useState } from "react";


export function Pedido() {

    // Guarda los pedidos obtenidos desde la API 
    const [orders, setOrders] = useState([]);

    // Obtiene los pedidos al cargar el componente
    useEffect(() => {
        fetch("/api/v1/orders")
            .then(res => res.json())
            .then(data => setOrders(data))
            .catch(err => console.error("Error: ", err));
    }, []);

    return (
        <div className="table-container-order">

            <h2 className="texto-order">Hoja de pedido</h2>

            <table className="main-table-order">

                <thead className="table-head-data-order">
                    <tr>
                        <th className="table-head-data-order">Nombre del producto</th>
                        <th className="table-head-data-order">Cantidad</th>
                    </tr>

                </thead>

                <tbody className="tr-data-order">
                    {/* Recorre cada pedido y genera una fila de la tabla */}
                    {orders.map((p) => (
                        // key ayuda a React a identificar cada fila de forma única
                        <tr key={p.id}>
                            <td className="table-data-order">{p.name}</td>
                            <td className="table-data-order">{p.quantity}</td>
                        </tr>
                    ))}

                </tbody>
            </table>

        </div>
    );
}