import * as service from "../services/orderService.js";

export const getAllOrders = async (req, res) => {
    try {
        const data = await service.getAllOrd();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los datos del pedido" });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const data = await service.getId(req.params.id);
        res.json(data);
    } catch (error) {
        if (error.message === "NOT_FOUND") {
            res.status(404).json({ error: "Dato no encontrado" });
        }
        res.status(500).json({ error: "Error interno" });
    }
};

export const createOrder = async (req, res) => {
    try {
        const data = await service.createNewOrder(req.body);
        res.json(data);
        res.status(201).json({ message: "Creado", id: data.id, data });

    } catch (error) {
        if (error.message === "NOT_FOUND") {
            return res.status(400).json({ error: "Error" })
        }
        res.status(500).json({ error: "Error al crear pedido" });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        await service.deleteOrder(req.params.id)
        res.json({ message: "Producto eliminado" })
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar pedido" })
    }
};

export const updateOrder = async (req, res) => {
    try {
        const data = await service.updateOrder(req.body);
        res.json(data);
        res.status(201).json({ message: "Actualizado" });
    } catch (error) {
        if (error.message === "NOT_FOUND") {
            return res.status(404).json({ error: "No encontrado" });
        }
        res.status(500).json({ error: "Error al actualizar" });

    }
};


