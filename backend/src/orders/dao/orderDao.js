import db from "../../config/db.js";

export const getAll = async () => {
    return await db('orders').select("*");
};

export const getById = async (id) => {
    return await db('products').where({ id }).first();
};

export const createOrder = async (data) => {
    const result =  await db('products').insert(data).returning('id');

    if (typeof result[0] === "object" && "id" in result[0]) {
        return result[0].id;
    }
};

export const deleteOrder = async (id) => {
    return await db('products').where({ id }).del();
};

export const updateOrder = async (id, data) => {
    return await db('products').where({ id }).update(data);
};

