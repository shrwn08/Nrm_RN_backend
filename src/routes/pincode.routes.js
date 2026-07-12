import express from "express";
import {protect} from "../middlewares/auth.middlewares.js";



const router = express.Router();

router.use(protect);


router.get("/:pincode", lookupPincode);




export default router;