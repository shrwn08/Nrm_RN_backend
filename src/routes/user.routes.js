import express from 'express';
import {register, login} from "../controllers/auth.controllers.js";
import {protect} from "../middlewares/auth.middlewares.js";
import {getMe} from "../controllers/user.controllers.js";


const router = express.Router();

router.use(express.json());


//auth
router.post("/register", register);
router.post("/login", login);
router.post ("/forget-password", ()=>conosle.log("forgetPassword"));
router.post("/reset-password", ()=>console.log("resetPassword"));

//profile
router.get("/me", protect, getMe);
router.patch("/me", protect, () => console.log("updateProfile"));
router.patch("/change-password", protect, ()=>console.log("changePassword"));

export default router;
