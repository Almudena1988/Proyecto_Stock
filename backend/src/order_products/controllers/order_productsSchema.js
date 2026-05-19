import * as yup from "yup";

export const order_product_schema = yup.object().shape({
    id: yup.number("Debe ser un número").required("Es un campo obligatorio"),
    order_id: yup.number("Debe ser un número").required("Es un campo obligatorio"),
    product_id: yup.number("Debe ser un número").required("Es un campo obligatorio"),
    quantity: yup.number("Debe ser un número").required("Es un campo obligatorio")
});

