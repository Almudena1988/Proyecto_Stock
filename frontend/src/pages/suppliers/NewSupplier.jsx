import { useState } from "react";
import { Toaster, sileo } from "sileo";
import Button from '@mui/material/Button';

export function NewSupplier({ setSupplier, setNewSupplier }) {

    const [name, setNewName] = useState("");
    const [email, setNewEmail] = useState("");
    const [address, setNewAddres] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('/api/v1/suppliers/', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    address
                })
            });
            // Respuesta de llamar a la API 
            const data = await response.json().catch(() => null);

            if (response.ok) {
                console.log("Proveedor añadido")
                sileo.success({ title: "Nuevo proveedor añadido" })

                setSupplier(prev => [...prev, {

                    // setProducts es la función que actualiza el estado
                    // prev es el valor inicial, antes de actualizarse
                    // [...prev] copia los elementos del array anterior
                    // Luego se añade el nuevo objeto
                    
                    id: data.id, // Viene del backend que genera automáticamente
                    name,
                    email,
                    address,
                    date: data.date // Viene del backend que genera automáticamente

                }]);
                setNewSupplier(false); // Cierra el formulario

            } else {
                console.log("Status: ", response.status)
                console.log("Body: ", data)
            }

        } catch (error) {
            console.log("Error al añadir proveedores", error)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombre del proveedor"
                    value={name}
                    onChange={(event) => setNewName(event.target.value)}
                />
                <input type="text"
                    placeholder="Correo de contacto"
                    value={email}
                    onChange={(event) => setNewEmail(event.target.value)}
                />
                <input type="text"
                    placeholder="Dirección"
                    value={address}
                    onChange={(event) => setNewAddres(event.target.value)}

                />
                <Button size="small" variant="contained" color="success" type="submit">Añadir</Button>
            </form>

        </div>
    );

}