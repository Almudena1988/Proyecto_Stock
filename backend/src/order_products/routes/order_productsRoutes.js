import { Router } from "express";
import * as controller from "../controllers/order_productsController.js"

const router = Router();

router.get("/api/v1/order_products", controller.getAll);
router.get("/api/v1/order_products/:id", controller.byId);
router.put("/api/v1/order_products/:id", controller.update);
router.post("/api/v1/order_products", controller.createNew);
router.delete("/api/v1/order_products/:id", controller.remove);

export default router;