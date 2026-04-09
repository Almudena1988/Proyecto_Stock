import * as dao from "../dao/supplierDao.js";

export const getSuppliers = async () =>{
    return await dao.getAllSuppliers();
};

export const getSuppById = async (id) => {
    return await dao.getSuppliersById(id);
};

export const createNewSupplier = async (data) => {
    return await dao.createSupplier(data);
};

export const delSupplier = async (id) => {
    return await dao.deleteSupplier(id);
};

export const updSupplier = async (id, data) => {
    return await dao.updateSupplier(id, data);
};