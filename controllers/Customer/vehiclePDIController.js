import Request from "../../models/Customer/VehiclePDIRequest.js";
import User from "../../models/Customer/userModel.js";
import Vehicle from "../../models/SuperAdmin/Vehicle.js";
import getCityPrefix from "../../utils/getCityPrefix.js";

export const createRequest = async (req, res) => {
  try {
    const {
      customer,
      brand,
      model,
      variant,
      dealerName,
      address,
      carStatus,
      date,
      notes,
    } = req.body;

    // Fetch customer details
    const user = await User.findById(customer);
    if (!user) return res.status(404).json({ error: "Customer not found" });

    // Fetch vehicle details
    const vehicle = await Vehicle.findOne({ brand, model, variant });
    if (!vehicle) return res.status(404).json({ error: "Vehicle not found" });

    // Generate booking ID
    const bookingId = getCityPrefix();

    const newRequest = new Request({
      customer,
      customerName: user.name,
      customerMobile: user.mobile,

      brand,
      model,
      variant,

      imageUrl: vehicle.imageUrl,
      transmissionType: vehicle.transmissionType,
      fuelType: vehicle.fuelType,

      dealerName,
      address,
      carStatus,
      date,
      notes,
      bookingId,
    });

    await newRequest.save();
    res.status(201).json({ message: "Request created", bookingId });
  } catch (error) {
    console.error("Create request error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
