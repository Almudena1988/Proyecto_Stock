import * as yup from "yup";

export const orderSchema = yup.object().shape({
    name: yup.number().required("Se requiere nombre del producto"),
    quantity: yup.number().required("Especifica cantidad de pedido")  
    
});