import { Router } from "express";
import * as controller from "../controllers/orderController.js";

const router = Router();

router.get = ("/api/vi/orders", controller.getAllOrders);
router.get = ("/api/vi/orders/:id", controller.getOrderById);
router.put = ("/api/vi/orders/:id", controller.updateOrder);
router.post = ("/api/vi/orders", controller.createOrder);
router.delete = ("/api/vi/orders/:id", controller.deleteOrder);

export default router;