import express from "express";
import {protect} from "../middlewares/auth.middlewares.js";
import {createOrder} from "../controllers/order.controller.js";


const router = express.Router();

router.use(protect);

router.post("/", createOrder);
router.get("/", ()=>console.log("getting orders"));
router.get("/:id",  (req, res) => console.log( "getOrderById"));
router.patch("/:id/status", ()=> console.log("updateOrderStatus"));


export default router;

