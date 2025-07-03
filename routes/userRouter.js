import express from "express";
import { check } from "express-validator";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/authController.js";
import { verifyOtp } from "../config/verifyOtp.js";


const router = express.Router();

const registerValidation = [
  check("name", "Name is required").notEmpty(),
  check("email", "Valid email is required").isEmail(),
  check("mobile", "Mobile number is required").notEmpty(),
];

const loginValidation = [check("email", "Valid email is required").isEmail()];

router.post("/register", registerValidation, registerUser);
router.post("/login", loginValidation, loginUser);
router.post("/logout", logoutUser);

router.post("/verify-otp", verifyOtp);



export default router;
