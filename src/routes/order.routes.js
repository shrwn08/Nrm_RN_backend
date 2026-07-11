import express from "express";
import {protect} from "../middlewares/auth.middlewares.js";
import {createOrder, getOrders} from "../controllers/order.controller.js";


const router = express.Router();

router.use(protect);

router.post("/", createOrder);
router.get("/", getOrders);
router.get("/:id",  (req, res) => console.log( "getOrderById"));
router.patch("/:id/status", ()=> console.log("updateOrderStatus"));


export default router;

