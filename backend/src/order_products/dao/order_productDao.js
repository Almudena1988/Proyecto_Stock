import db from "../../config/db.js"

export const getAllOrderProducts = async () => {
    return await db('order_products').select('*');
}

export const getOrderProductsById = async (id) => {
    return await db('order_products').where({ id }).first();
}

export const createOrderProducts = async (data) => {
    return await db('order_products').insert(data).returning("*");
}

export const deleteOrderProduct = async (id) => {
    return await db('order_products').where( { id }).del();
}

export const updateOrderProduct = async (id, data) => {
    return await db('order_products').where({ id }).update(data);
}