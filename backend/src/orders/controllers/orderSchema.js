import * as yup from "yup";

export const orderSchema = yup.object().shape({
    supplier_id: yup.number().required("Se necesita el id del proveedor"),
    order_date: yup.date().required("Especifica fecha de pedido"),
    // Solo permite ciertos valores concretos como los del CHECK de la base de datos
    status: yup.string().oneOf(["pending", "received", "cancelled"])
        .required("Especifica el estado del pedido")
});