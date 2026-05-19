import { useState } from "react";
import { Toaster, sileo } from "sileo";
import Button from '@mui/material/Button';

// El componente de React recibe los props desde el padre
export function ModificarProducto({
    id,
    name,
    description,
    stock_current,
    stock_minimum,
    supplier_id,
    setProductEdit,
    setProducts
}) {
    const [new_id, setNewId] = useState(id);
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
                    id: new_id,
                    name: newname,
                    description: new_description,
                    stock_current: new_stock_current,
                    stock_minimum: new_stock_minimum,
                    supplier_id: new_supplier_id
                })
            });

            const data = await response.json().catch(() => null);

            if (response.ok) {
                setProducts(prev =>
                    prev.map(p =>
                        p.id === id
                            ? {
                                ...p,
                                id: new_id,
                                name: new_stock_current,
                                description: new_description,
                                stock_current: new_stock_current,
                                stock_minimum: new_stock_minimum,
                                supplier_id: new_supplier_id,
                            }
                            : p
                    )
                );

                console.log("Producto actualizado");

                sileo.success({ title: "Producto actualizado" })

                setProductEdit(null);

            } else {
                console.log("Status:", response.status);
                console.log("Body:", data);
                sileo.error({ title: "Error actualizando productos" })
            }
            if (new_stock_current < 3) {
                alert("Stock bajo");
            }

        } catch (error) {
            console.log("Error modificando el producto", error);

        }
    };

    return (
        <div>
            <input value={new_id} onChange={(e) => setNewId(e.target.value)}></input>
            <input value={newname} onChange={(e) => setName(e.target.value)} />
            <input value={new_description} onChange={(e) => setDescription(e.target.value)} />
            <input value={new_stock_current} onChange={(e) => setStockCurrent(e.target.value)} />
            <input value={new_stock_minimum} onChange={(e) => setStockMinimum(e.target.value)} />
            <input value={new_supplier_id} onChange={(e) => setSupplierId(e.target.value)} />

            <Button size="small" variant="contained" color="success" onClick={handleEdit}>
                Guardar cambios
            </Button>
        </div>
    );
}