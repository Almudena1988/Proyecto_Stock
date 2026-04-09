// Se importa la librería Express
import express from "express";

// Se importa el archivo donde se definen las rutas para indicar que lo use
import productRoutes from "../src/product/routes/productRoutes.js";

// Se crea una aplicación usando Express
const app = express();

// Parsea el cuerpo de las peticiones HTTP que tienen encabezado Content-Type: application/json y convierte
// ese cuerpo que llega en formato json en un objeto JavaScript accesible en req.body
app.use(express.json());

// Se indica que use las rutas
app.use(productRoutes);

// Se indica que inice el servidor en el puerto 4000
app.listen(4000);
console.log("Servidor en el puerto 4000");



