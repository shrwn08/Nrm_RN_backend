import express from "express";
import {protect} from "../middlewares/auth.middlewares.js";



const router = express.Router();

router.use(protect);


router.get("/:pincode", (req, res) => console.log("lookPincode"));




export default router;