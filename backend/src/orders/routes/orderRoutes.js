import { Router } from "express";
import * as controller from "../controllers/orderController.js";

const router = Router();

router.get("/api/v1/orders", controller.getAllOrders);
router.get("/api/v1/orders/:id", controller.getOrderById);
router.put("/api/v1/orders/:id", controller.updateOrder);
router.post("/api/v1/orders", controller.createOrder);
router.delete("/api/v1/orders/:id", controller.deleteOrder);

export default router;