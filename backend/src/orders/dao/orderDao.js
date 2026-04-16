import db from "../../config/db.js";

export const getAll = async () => {
    return await db('orders').select("*");
};

export const getById = async (id) => {
    return await db('orders').where({ id }).first();
};

export const createOrder = async (data) => {
    const result =  await db('orders').insert(data).returning('id');

    if (typeof result[0] === "object" && "id" in result[0]) {
        return result[0].id;
    }
};

export const deleteOrder = async (id) => {
    return await db('orders').where({ id }).del();
};

export const updateOrder = async (id, data) => {
    return await db('orders').where({ id }).update(data);
};

