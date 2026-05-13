import * as yup from "yup";

// No se añaden los campos de id y created_at porque ya los genera automáticamente la base de datos

export const supplierSchema = yup.object().shape({    
    name: yup.string().required("Se requiere el dato del nombre"),
    email: yup.string().required("Se necesita correo de contacto"),
    address: yup.string().nullable()    
});