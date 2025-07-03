import express from "express";
import { getusers as superAdminController } from "../controllers/superAdminController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const SuperAdminRoutes = express.Router();

SuperAdminRoutes.get("/getallusers", superAdminController);
export default SuperAdminRoutes;
