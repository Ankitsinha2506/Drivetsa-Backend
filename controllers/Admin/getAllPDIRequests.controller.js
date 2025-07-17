import PDIRequest from "../../models/Customer/VehiclePDIRequest.js";
import User from "../../models/Customer/userModel.js"; // adjust path if different

export const getAllPDIRequests = async (req, res) => {
  try {
    const requests = await PDIRequest.find();

    res.status(200).json({
      success: true,
      total: requests.length,
      data: requests,
    });
  } catch (error) {
    console.error("Get All PDI Requests Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching PDI requests",
    });
  }
};
