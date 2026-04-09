// Definir los endpoints

import { Router } from "express"; 
import * as controller from "../controllers/productController,js";

const router = Router();

router.get('/api/v1/products', controller.all);
router.get('/api/v1/products/:id', controller.byId);
router.delete('/api/v1/products/:id', controller.rem);
router.post('/api/v1/products', controller.createNew);
router.put('/api/v1/products/:id', controller.update);

export default router; 
