import express from "express";
import { getusers as superAdminController } from "../../controllers/SuperAdmin/superAdminController.js";
import authMiddleware from "../../middleware/authMiddleware.js";

const SuperAdminRoutes = express.Router();

SuperAdminRoutes.get("/getallusers", superAdminController);
export default SuperAdminRoutes;
