import * as service from "../services/supplierService.js";
import { supplierSchema } from "./supplierSchema.js";

export const getAll = async (req, res) => {
    try {
        const data = await service.getSuppliers();
        res.json(data);

    } catch (error) {
        if (error.message === "NOT_FOUND")
            res.status(500).json({ error: "Error al obtener los datos del proveedor" });
    }
};

export const getId = async (req, res) => {
    try {
        const data = await service.getSuppById(req.params.id);
        res.json(data);
    } catch (error) {
        if (error.message === "NOT_FOUND") {
            res.status(404).json({ error: "Dato no encontrado" });
        }
        res.status(500).json({ error: "Error interno" });
    }
};

export const create = async (req, res) => {
    try {
        const validated = await supplierSchema.validate(req.body, { abortEarly: false });
        const id = await service.createNewSupplier(validated);
        res.status(201).json({ message: "Datos de proveedor creados", id });

    } catch (error) {
        console.log(error);
        if (error.name === "ValidationError") {
            return res.status(400).json({ errores: error.errors });
        }
        res.status(500).json({ error: "Error al crear" });
    }
};

export const remov = async (req, res) => {
    try {
        const data = await service.delSupplier(req.params.id);
        res.status(200).json({ message: "Datos de proveedores eliminado", data });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Error al eliminar proveedor" });
    }
};

export const upd = async (req, res) => {
    try {
        const validated = await supplierSchema.validate(req.body, { abortEarly: false });
        await service.updSupplier(req.params.id, validated);
        res.json({ message: "Datos del proveedor actualizados" });

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