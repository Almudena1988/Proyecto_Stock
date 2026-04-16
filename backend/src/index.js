// Se importa la librería Express
import express from "express";

// Se importan los archivos donde se definen las rutas para indicar que lo use
import productRoutes from "../src/products/routes/productRoutes.js";
import supplierRoutes from "../src/suppliers/routes/supplierRoutes.js";
import ordersRoutes from "../src/orders/routes/orderRoutes.js";

// Se crea una aplicación usando Express
const app = express();

// Parsea el cuerpo de las peticiones HTTP que tienen encabezado Content-Type: application/json y convierte
// ese cuerpo que llega en formato json en un objeto JavaScript accesible en req.body
app.use(express.json());

// Se indica que use las rutas
app.use(productRoutes);
app.use(supplierRoutes);
app.use(ordersRoutes);

// Se indica que inice el servidor en el puerto 4000
app.listen(4000);

// Mensaje por terminal para indicar que el puerto está corriendo
console.log("Servidor en el puerto 4000");
console.log("http://localhost:4000/api/v1/")



