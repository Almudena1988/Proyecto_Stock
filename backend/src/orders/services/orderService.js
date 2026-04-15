import * as dao from "../dao/orderDao.js";

export const getAllOrd = async () => {
    return await dao.getAll();
};

export const getId = async (id) => {
    return await dao.getById(id);
};

export const createNewOrder = async (data) => {
    return await dao.createOrder(data);
};

export const deleteOrder = async (id) => {
    return await dao.deleteOrder(id);
};

export const updateOrder = async (id, data) => {
    return await dao.updateOrder(id, data);
};