// Lógica del negocio

import * as dao from "../dao/productDao.js";

export const getAll = async() =>{
    return await dao.getAllProducts();
}

export const getById = async (id) => {
    return await dao.getProductById(id);
}

export const create = async (data) => {
    return await dao.createProduct(data);
}

export const remove = async (id) => {
    return await dao.deleteProduct(id);

}

export const update = async (id, data) => {
    return await dao.updateProduct(id,data);
}