// Se define con Yup la validación de los datos de Producto

import * as yup from "yup";

export const productSchema = yup.object().shape({
    id: yup.number().required("Se requiere id"),
    name: yup.string().required("Es obligatorio añadir nombre"),
    description: yup.string().nullable(),
    stock_current: yup
    .number()
    .required("Es obligatorio introducir una cantidad")
    .min(0, "La cantidad de stock no puede ser negativa"),
    stock_minimum: yup
    .number()
    .required("Se necesita fijar stock mínimo"),
    supplier_id: yup.number().required("Es un campo obligatorio")

});