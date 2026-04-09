import db from "../../config/db.js";

export const getAllSuppliers = async () => {
    return await db('suppliers').select('*');
};

export const getSuppliersById = async (id) => {
    return await db('suppliers').where({ id }).first();
};

export const createSupplier = async (data) => {
    return await db('suppliers').insert(data).returning('id');    
};

export const deleteSupplier = async (id) => {
    return await db('suppliers').where({ id }).del();
}

export const updateSupplier = async (id, data) => {
    return await db('suppliers').where({ id }).update(data);

}

