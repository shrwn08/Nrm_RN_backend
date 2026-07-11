import express from "express";
import {protect} from "../middleware/auth.middleware.js";



const router = express.Router();

router.use(protect);


router.get("/:pincode", (req, res) => console.log("lookPincode"));




export default router;