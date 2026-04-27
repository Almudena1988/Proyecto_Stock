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
        <div>
            <h2>Hoja de pedido</h2>
            <table>
                <thead>
                    <tr>
                        <th>Id producto:</th>
                        <th>Nombre:</th>
                        <th>Cantidad:</th>
                    </tr>
                </thead>

                <tbody>
                    {pedido.map((p) => (

                        <tr key={p.id}>                            
                                <td>{p.id}</td>
                                <td>{p.name}</td>
                                <td>{p.quantity}</td>                            
                        </tr>
                    ))}

                </tbody>
            </table>

        </div>
    );
}