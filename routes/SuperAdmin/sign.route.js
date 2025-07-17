
import express from "express";
import {
  signupAdmin,
  signupEngineer,
} from "../../controllers/SuperAdmin/sign.controller.js";

const router = express.Router();

router.post("/engineer", signupEngineer);
router.post("/admin", signupAdmin);

export default router;
