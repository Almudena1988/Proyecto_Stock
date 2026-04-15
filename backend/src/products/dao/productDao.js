// Se comunica con la base de datos

import db from "../../config/db.js";

export const getAllProducts = async () => {
    return await db('products').select('*');
}

export const getProductById = async (id) => {
    return await db('products').where({ id }).first();
}

export const createProduct = async (data) => {
    const result = await db('products').insert(data).returning('id');

    if (typeof result[0] === "object" && "id" in result[0]) {
        return result[0].id;
    }
}

export const deleteProduct = async (id) => {
    // Se usa {} cuando se pasa un objeto.
    // Es lo mismo .where('id', id) donde la columna id sea igual al valor de la variable id
    return await db('products').where({ id }).del();
}

export const updateProduct = async (id, data) => {
    return await db ('products').where({ id }).update(data);

}

