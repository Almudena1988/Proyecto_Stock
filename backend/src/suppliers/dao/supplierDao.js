import db from "../../config/db.js";

export const getAllSuppliers = async () => {
    return await db('suppliers').select('*');
};

export const getSuppliersById = async (id) => {
    return await db('suppliers').where({ id }).first();
};

export const createSupplier = async (data) => {
    const result = await db('suppliers').insert(data).returning('id');

    if (typeof result[0] === "object" && "id" in result[0]) {
        return result[0].id;
    }
};

export const deleteSupplier = async (id) => {
    return await db('suppliers').where({ id }).del();
};

export const updateSupplier = async (id, data) => {
    return await db('suppliers').where({ id }).update(data);

};

