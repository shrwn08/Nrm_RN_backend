import express from "express";
import {protect} from "./middlewares/protect.js";


const router = express.Router();

router.use(protect);

router.post("/", ()=>console.log("createAddress"));
router.get("/", ()=>console.log("getAddress"));
router.delete("/:id", ()=>console.log("deleteAddress"));
router.patch("/:id/status", ()=> console.log("patchAddress"));



export default router;