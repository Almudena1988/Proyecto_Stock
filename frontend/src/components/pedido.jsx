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

            {pedido.length > 0 ? (
                pedido.map((p) => (
                    <div key={p.id} >
                        <p><strong>Pedido: {p.id} </strong> </p>
                        <p>Fecha del pedido: {p.order_date} </p>
                        <p>Estado del pedido: {p.status}</p>
                    </div>
                ))
            ) : (<p> Cargando pedido</p>)}

        </div>
    );
}