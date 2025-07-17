import express from "express";
import { createRequest } from "../../controllers/Customer/vehiclePDIController.js";

const router = express.Router();

router.post("/create", createRequest);

export default router;
