import express from "express";
import { assignEngineer } from "../../controllers/Admin/assignEngineer.controller.js";

const router = express.Router();

router.put("/assign/:bookingId", assignEngineer);

export default router;
