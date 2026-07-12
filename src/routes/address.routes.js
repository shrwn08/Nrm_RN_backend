import express from "express";
import {protect} from "./middlewares/protect.js";
import {createAddress, deleteAddress, getAddress} from "../controllers/address.controllers.js";


const router = express.Router();

router.use(protect);

router.post("/", createAddress);
router.get("/", getAddress);
router.delete("/:id", deleteAddress);
router.patch("/:id/status", ()=> console.log("patchAddress"));



export default router;