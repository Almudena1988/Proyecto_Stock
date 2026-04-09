import * as yup from "yup";

export const supplierSchema = yup.object().shape({
    id: yup.number().required("Se requiere id"),
    name: yup.string().required("Se requiere el dato del nombre"),
    email: yup.string().required("Se necesita correo de contacto"),
    address: yup.string().nullable(),
    created_at: yup.date().nullable()
});