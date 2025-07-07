import express from "express";
import upload from "../../middleware/upload.js";
import {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  deleteVehicle,
} from "../../controllers/SuperAdmin/vehicleController.js";

const router = express.Router();

router.post("/vehicle", upload.single("image"), createVehicle);

router.get("/getallvehicle", getAllVehicles);
router.get("/:id", getVehicleById);
router.delete("/:id", deleteVehicle);

export default router;
