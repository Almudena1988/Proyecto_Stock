import { productSchema } from "../../products/controllers/productSchema";
import * as service from "../services/order_productService.js"

export const getAll = async (req, res) => {
    try{
        const data = await service.getAll();
        res.json(data);

    }catch(error){
        res.status(500).json({ error: "Error al obtener los datos"})
    }
};

export const byId = async (req, res) => {
    try{
        const data = await service.getById(req.params.id);
        res.json(data);

    }catch(error){
        if(error.message === "NOT_FOUND"){
            res.status(404).json({ error: "Dato no encontrado"});
        }
        res.status(500).json({ error: "Error interno"});
    }    
};

export const createNew = async (req, res) => {
    try{
        const validatedData = await productSchema.validate(req.body, { abortEarly: false });
        const id = await service.create(validatedData);
        res.status(201).json({message: "Creado", id });
    }catch(error){
        if(error.name === "ValidationError"){
            return res.status(400).json({ errores: error.errors});
        }
        res.status(500).json({ error: "Error al crear"});
    }
};

export const remove = async (req, res) => {
    try{
        await service.remove(req.params.id);
        res.json({ message: "Producto eliminado"})

    }catch(error){
        res.status(500).json({ error: "Error al eliminar"})
    }
};

export const update = async (req, res) => {
    try{
        const validatedData = await productSchema.validate(req.body,{ abortEarly: false });
        await service.update(req.params.id, validatedData);
        res.json({ message: "Actualizado"});

    }catch(error){
        if (error.name === "ValidationError") {
            return res.status(400).json({ errores: error.errors });
        }

        if (error.message === "NOT_FOUND") {
            return res.status(404).json({ error: "No encontrado" });
        }

        res.status(500).json({ error: "Error al actualizar" });

    }
};