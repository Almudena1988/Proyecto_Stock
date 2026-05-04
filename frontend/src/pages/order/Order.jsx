import { useEffect, useState } from "react";


export function Pedido() {
    const [pedido, setPedido] = useState([]);

    useEffect(() => {
        fetch("/api/v1/orders")
            .then(res => res.json())
            .then(data => setPedido(data))
            .catch(err => console.error("Error: ", err));
    }, []);

    return (
        <div className="table-container-order">
            <h2 className="texto-order">Hoja de pedido</h2>
            <table className="main-table-order">
                <thead className="table-head-data-order">
                    <tr>

                        <th className="table-head-data-order">Nombre del producto:</th>
                        <th className="table-head-data-order">Cantidad:</th>
                    </tr>
                </thead>

                <tbody className="tr-data-order">
                   
                        {pedido.map((p) => (

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