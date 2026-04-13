// Intermediario entre cliente que hace la petición y la lógica de negocio. Recibe la petición HTTP del cliente (req),
// valida los datos de entrada, coordina con la capa de servicios y devuelve la respuesta HTTP (res)

import * as service from "../services/productService.js";
import { productSchema } from "./productSchema.js";

export const all = async (req, res) => {
    try {
        const data = await service.getAll();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los datos de los productos" });
    }
};

export const byId = async (req, res) => {
    try {
        const data = await service.getById(req.params.id); // req: es la petición del cliente. Lo que envía el cliente
        res.json(data);
    } catch (error) {
        if (error.message === "NOT_FOUND") {
            res.status(404).json({ error: "Dato no encontrado" });
        }
        res.status(500).json({ error: "Error interno" });
    }
};

export const createNew = async (req, res) => {
    try {
        const validatedData = await productSchema.validate(req.body, { abortEarly: false });
        const id = await service.create(validatedData);
        res.status(201).json({ message: "Creado", id });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ errores: error.errors });
        }
        res.status(500).json({ error: "Error al crear" });
    }
};

export const rem = async (req, res) => {
    try {
        await service.remove(req.params.id);
        res.json({ message: "Producto eliminado" })
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar" })
    }
};

export const update = async (req, res) => {
    try {
        const validatedData = await productSchema.validate(req.body, { abortEarly: false });
        await service.update(req.params.id, validatedData);
        res.json({ message: "Actualizado" });

    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ errores: error.errors });
        }

        if (error.message === "NOT_FOUND") {
            return res.status(404).json({ error: "No encontrado" });
        }

        res.status(500).json({ error: "Error al actualizar" });
    }
};

