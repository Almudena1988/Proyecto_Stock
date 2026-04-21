import { useState } from "react";

export function UpdateSupplier({
    id,
    name,
    email,
    address,
    created_at
}) {
    const [new_id, setNewId] = useState(id);
    const [new_name, setNewName] = useState(name);
    const [new_email, setNewEmail] = useState(email);
    const [new_address, setNewAddress] = useState(address);
    const [new_created_at, setNewCreatedAt] = useState(created_at)

    const handleEdit = async () => {
        try {
            const response = await fetch(`/api/v1/suppliers/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",

                },
                body: JSON.stringify({
                    id: new_id,
                    name: new_name,
                    email: new_email,
                    address: new_address,
                    created_at: new_created_at
                })
            });

            const data = await response.json().catch(() => null);

            if (response.ok) {
                console.log("Nuevo proveedor añadido")
            } else {
                console.log("Status: ", response.status)
                console.log("Body: ", data)
            }

        } catch (error) {
            console.log("Error al añadir proveedor")
        }
    }

    return (
        <div>
            <input value={new_id} onChange={(e) => setNewId(e.target.value)} />
            <input value={new_name} onChange={(e) => setNewName(e.target.value)} />
            <input type="email" value={new_email} onChange={(e) => setNewEmail(e.target.value)} />
            <input value={new_address} onChange={(e) => setNewAddress(e.target.value)} />
            <input value={new_created_at} onChange={(e) => setNewCreatedAt(e.target.value)} />
            <button onChange={handleEdit}>Guardar cambios</button>
        </div>
    )
}