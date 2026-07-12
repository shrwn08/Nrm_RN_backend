import express from "express";
import {protect} from "./middlewares/auth.middlewares.js";
import {createAddress, deleteAddress, getAddress} from "../controllers/address.controllers.js";


const router = express.Router();

router.use(protect);

router.post("/", createAddress);
router.get("/", getAddress);
router.delete("/:id", deleteAddress);



export default router;