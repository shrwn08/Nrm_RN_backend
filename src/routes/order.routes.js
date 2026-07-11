import express from "express";
import {protect} from "../middlewares/auth.middlewares.js";


const router = express.Router();

router.use(protect);

router.post("/", ()=>console.log("create order"));
router.get("/", ()=>console.log("getting orders"));
router.get("/:id",  (req, res) => console.log( "getOrderById"));
router.patch("/:id/status", ()=> console.log("updateOrderStatus"));


export default router;

