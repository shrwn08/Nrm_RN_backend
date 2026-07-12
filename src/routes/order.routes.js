import express from "express";
import {protect} from "../middlewares/auth.middlewares.js";
import {createOrder, getOrderById, getOrders, updateOrderStatus} from "../controllers/order.controllers.js";


const router = express.Router();

router.use(protect);

router.post("/", createOrder);
router.get("/", getOrders);
router.get("/:id",  getOrderById);
router.patch("/:id/status", updateOrderStatus);


export default router;

