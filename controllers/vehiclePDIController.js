import VehiclePDIRequest from "../models/VehiclePDIRequest.js";
import { getCarImageURL } from "../utils/getCarImageURL.js";
import variantDetailsMap from "../utils/variantDetailsMap.js";
import BookingCounter from "../models/BookingCounter.js";
import getCityPrefix from "../utils/getCityPrefix.js";

export const createRequest = async (req, res) => {
  try {
    const { brand, model, variant, address } = req.body;
    const customerId = req.customer._id; // ✅ Ensure auth middleware sets this

    // ✅ Step 1: Get image
    const imageUrl = getCarImageURL(brand, model);

    // ✅ Step 2: Get variant info
    const variantKey = `${brand}-${model} ${variant}`;
    const variantInfo = variantDetailsMap[variantKey];
    if (!variantInfo) {
      return res.status(400).json({ message: "Variant details not found." });
    }

    // ✅ Step 3: Handle BookingCounter
    let counterDoc = await BookingCounter.findOne();

if (!counterDoc) {
  counterDoc = await BookingCounter.create({ globalCount: 1 });
} else {
  counterDoc.globalCount += 1;
  await counterDoc.save();
}

console.log("counterDoc.globalCount:", counterDoc.globalCount);

    // ✅ Step 4: Generate Booking ID
    const bookingId = `${getCityPrefix(address)}2105${String(
      counterDoc.globalCount
    ).padStart(4, "0")}`;

    // ✅ Step 5: Save request
    const newRequest = new VehiclePDIRequest({
      ...req.body,
      customer: customerId,
      bookingId,
      imageUrl,
      transmissionType: variantInfo.transmissionType,
      fuelType: variantInfo.fuelType,
    });

    await newRequest.save();

    res.status(201).json({
      message: "PDI Request created successfully",
      data: newRequest,
    });
  } catch (error) {
    console.error("createRequest error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Utility function (if needed elsewhere, consider exporting)
function extractCityFromAddress(address) {
  const parts = address.split(",").map((p) => p.trim());
  return parts[parts.length - 1] || "GEN";
}

export const getAllRequests = async (req, res) => {
  try {
    const requests = await VehiclePDIRequest.find();
    res.json({
      message: "Requests retrieved successfully",
      data: requests,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRequestByBookingId = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const request = await VehiclePDIRequest.findOne({ bookingId });

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json({
      message: "Request fetched successfully",
      data: request,
    });
  } catch (error) {
    console.error("Error fetching request by bookingId:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getRequestById = async (req, res) => {
  try {
    const request = await VehiclePDIRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });
    res.json({
      message: "Request fetched successfully",
      data: request,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateRequest = async (req, res) => {
  try {
    const { brand, variant } = req.body;
    const imageUrl = getCarImageURL(brand, variant);

    const updatedRequest = await VehiclePDIRequest.findByIdAndUpdate(
      req.params.id,
      { ...req.body, imageUrl },
      { new: true }
    );

    if (!updatedRequest)
      return res.status(404).json({ message: "Request not found" });

    res.json({
      message: "Request updated successfully",
      data: updatedRequest,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteRequest = async (req, res) => {
  try {
    const result = await VehiclePDIRequest.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: "Request not found" });

    res.json({ message: "Request deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
