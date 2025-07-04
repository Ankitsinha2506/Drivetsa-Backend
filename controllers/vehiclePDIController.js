import VehiclePDIRequest from "../models/VehiclePDIRequest.js";
import BookingCounter from "../models/BookingCounter.js";
import Vehicle from "../models/Vehicle.js";
import getCityPrefix from "../utils/getCityPrefix.js"; 

export const createRequest = async (req, res) => {
  try {
    const { brand, model, address } = req.body;
    const customerId = req.customer._id;

    //Get vehicle info from DB using brand & model
    const vehicleDoc = await Vehicle.findOne({ brand, model });
    if (!vehicleDoc) {
      return res
        .status(404)
        .json({ message: "Vehicle not found for this brand and model" });
    }

    const imageUrl = vehicleDoc.imageUrl;
    const fuelType = vehicleDoc.fuelType;
    const transmissionType = vehicleDoc.transmissionType;

    //Handle BookingCounter
    let counterDoc = await BookingCounter.findOne();
    if (!counterDoc) {
      counterDoc = await BookingCounter.create({ globalCount: 1 });
    } else {
      counterDoc.globalCount += 1;
      await counterDoc.save();
    }

    //Generate Booking ID
    const bookingId = `${getCityPrefix(address)}2105${String(
      counterDoc.globalCount
    ).padStart(4, "0")}`;

    //Save new PDI request
    const newRequest = new VehiclePDIRequest({
      ...req.body,
      customer: customerId,
      bookingId,
      imageUrl,
      fuelType,
      transmissionType,
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
// function extractCityFromAddress(address) {
//   const parts = address.split(",").map((p) => p.trim());
//   return parts[parts.length - 1] || "GEN";
// }

export const getAllRequests = async (req, res) => {
  try {
    const requests = await VehiclePDIRequest.find().populate(
      "customer",
      "name mobile"
    );
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
    const request = await VehiclePDIRequest.findOne({ bookingId }).populate(
      "customer",
      "name mobile"
    );

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
    const request = await VehiclePDIRequest.findById(req.params.id).populate(
      "customer",
      "name mobile"
    );
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
    const request = await VehiclePDIRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    //Update fields conditionally if provided
    request.brand = req.body.brand || request.brand;
    request.model = req.body.model || request.model;
    request.variant = req.body.variant || request.variant;
    request.transmissionType = req.body.transmissionType || request.transmissionType;
    request.fuelType = req.body.fuelType || request.fuelType;
    request.address = req.body.address || request.address;
    request.carStatus = req.body.carStatus || request.carStatus;
    request.date = req.body.date || request.date;
    request.notes = req.body.notes || request.notes;

    //Update image from Vehicle table if brand/model changed
    const vehicle = await Vehicle.findOne({
      brand: request.brand,
      model: request.model,
    });
    if (vehicle && vehicle.imageUrl) {
      request.imageUrl = vehicle.imageUrl;
    }

    const updated = await request.save();

    res.status(200).json({
      message: "PDI Request updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Internal Server Error" });
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
