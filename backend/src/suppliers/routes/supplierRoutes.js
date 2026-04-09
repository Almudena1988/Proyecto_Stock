import * as controller from "../controllers/supplierController.js";
import { Router } from "express";

const router = Router();

router.get('/api/v1/suppliers', controller.getAll);
router.get("/api/v1/suppliers/:id", controller.getId);
router.delete("/api/v1/suppliers/:id", controller.remov);
router.put("/api/v1/suppliers/:id", controller.upd);
router.post("/api/v1/suppliers/", controller.create);

export default router;