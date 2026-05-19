import * as dao from "../dao/order_productDao.js"

export const getAll = async () => {
    return await dao.getAllOrderProducts();
}

export const getById = async (id) => {
    return await dao.getOrderProductsById(id);
}

export const create = async (data) => {
    return await dao.createOrderProducts(data);
}

export const remove = async (id) => {
    return await dao.deleteOrderProduct(id);
}

export const update = async (id, data) => {
    return await dao.updateOrderProduct(id,data);
}