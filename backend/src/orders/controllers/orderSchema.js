import * as yup from "yup";

export const orderSchema = yup.object().shape({    
    product_id: yup.number().required("Se requiere producto"),
    quantity: yup.number().required("Especifica cantidad de pedido")  
    
});