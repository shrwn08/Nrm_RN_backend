import express from 'express';
import {register, login} from "../controllers/auth.controllers.js";
import {protect} from "../middlewares/auth.middlewares.js";
import {changePassword, forgetPassword, getMe, resetPassword, updateProfile} from "../controllers/user.controllers.js";


const router = express.Router();

router.use(express.json());


//auth
router.post("/register", register);
router.post("/login", login);
router.post ("/forget-password", forgetPassword);
router.post("/reset-password", resetPassword);

//profile
router.get("/me", protect, getMe);
router.patch("/me", protect, (updateProfile));
router.patch("/change-password", protect, changePassword);

export default router;
