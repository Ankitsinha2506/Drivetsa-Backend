import express from "express";
import {
  createRequest,
  getAllRequests,
  getRequestById,
  updateRequest,
  deleteRequest,
  getRequestByBookingId,
} from "../../controllers/Customer/vehiclePDIController.js";

import auth from "../../middleware/auth.js";

const router = express.Router();

router.post("/create", auth("customer"), createRequest);
router.get("/allrequest", getAllRequests);
router.get("/:id", getRequestById);
router.get("/bookingId/:bookingId", getRequestByBookingId);
router.put("/update/:id", updateRequest);
router.delete("/delete/:id", deleteRequest);

export default router;
