import express from "express";
import { getAllPDIRequests } from "../../controllers/Admin/getAllPDIRequests.controller.js";

const router = express.Router();

router.get("/all-request", getAllPDIRequests);

export default router;
