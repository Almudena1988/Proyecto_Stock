import { useEffect, useState } from "react";

export function OrderProducts() {

    const [order_product, setOrderProduct] = useState([]);
    

    useEffect(() => {
        fetch("/api/v1/order_products")
            .then(res => res.json())
            .then(data => setOrderProduct(data))
            .catch(error => console.error("Error:", error));
    }, []);

    return (
        <div>
            <h1>Hoja de Pedidos</h1>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Id pedido</th>
                        <th>Id del producto</th>
                        <th>Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                    {order_product.length > 0 ? (
                        order_product.map((p) => (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.orderId}</td>
                                <td>{p.productId}</td>
                                <td>{p.quantity}</td>
                            </tr>

                        ))
                    )
                        : (<tr>
                            <td>Cargando...</td>
                        </tr>
                        )}

                </tbody>
            </table>

        </div>

    );


}