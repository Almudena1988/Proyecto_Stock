import { useState } from "react";
import { Toaster, sileo } from "sileo";

// El componente de React recibe los props desde fuera
export function ModificarProducto({
    id,
    name,
    description,
    stock_current,
    stock_minimum,
    supplier_id,
    setProductoEditando
}) {

    const [newname, setName] = useState(name);
    const [new_description, setDescription] = useState(description);
    const [new_stock_current, setStockCurrent] = useState(stock_current);
    const [new_stock_minimum, setStockMinimum] = useState(stock_minimum);
    const [new_supplier_id, setSupplierId] = useState(supplier_id);

    const handleEdit = async () => {
        try {
            const response = await fetch(`/api/v1/products/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: newname,
                    description: new_description,
                    stock_current: new_stock_current,
                    stock_minimum: new_stock_minimum,
                    supplier_id: new_supplier_id
                })
            });

            const data = await response.json().catch(() => null);

            if (response.ok) {
                console.log("Producto actualizado");
                sileo.success({ title: "Producto actualizado" })
                setProductoEditando(null);

            } else {
                console.log("Status:", response.status);
                console.log("Body:", data);
                sileo.error({ title: "Error actualizando productos" })
            }
            if (new_stock_current < 3) {
                alert("Stock bajo");
            }

        } catch (error) {
            console.log("Error modificando el producto");

        }
    };

    return (
        <div>
            <input value={newname} onChange={(e) => setName(e.target.value)} />
            <input value={new_description} onChange={(e) => setDescription(e.target.value)} />
            <input value={new_stock_current} onChange={(e) => setStockCurrent(e.target.value)} />
            <input value={new_stock_minimum} onChange={(e) => setStockMinimum(e.target.value)} />
            <input value={new_supplier_id} onChange={(e) => setSupplierId(e.target.value)} />

            <button onClick={handleEdit}>
                Guardar cambios
            </button>
        </div>
    );
}