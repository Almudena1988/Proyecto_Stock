import { useEffect, useState } from "react";


export function Pedido() {
    const [pedido, setPedido] = useState([]);

    useEffect(() => {
        fetch("/api/v1/orders")
            .then(res => res.json())
            .then(data => setPedido(data))
            .catch(err => console.error("ERROR: ", err));
    }, []);

    return (
        <div className="table-container">
            <h2>Hoja de pedido</h2>
            <table className="main-table">
                <thead className="table-head">
                    <tr>
                        <th className="table-head-data">Id producto:</th>
                        <th className="table-head-data">Nombre:</th>
                        <th className="table-head-data">Cantidad:</th>
                    </tr>
                </thead>

                <tbody>
                    {pedido.map((p) => (

                        <tr className="tr-data-order" key={p.id}>                            
                                <td className="table-data">{p.id}</td>
                                <td className="table-data">{p.name}</td>
                                <td className="table-data">{p.quantity}</td>                            
                        </tr>
                    ))}

                </tbody>
            </table>

        </div>
    );
}