import PDIRequest from "../../models/Customer/VehiclePDIRequest.js";
import Employee from "../../models/SuperAdmin/sign.model.js";

export const assignEngineer = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const trimmedBookingId = bookingId.trim();
    console.log("Assigning engineer to booking ID:", trimmedBookingId);

    const { name, mobile } = req.body;

    // Find engineer
    const engineer = await Employee.findOne({ name, mobile, role: "engineer" });

    if (!engineer) {
      return res.status(404).json({ message: "Engineer not found" });
    }

    // Update using bookingId instead of _id
    const updatedRequest = await PDIRequest.findOneAndUpdate(
      { bookingId: trimmedBookingId },
      {
        engineer: {
          name: engineer.name,
          number: engineer.mobile,
        },
        status: "Assigned",
      },
      { new: true }
    );

    if (!updatedRequest) {
      return res
        .status(404)
        .json({ message: "PDI Request not found with this bookingId" });
    }

    res.status(200).json({
      message: "Engineer assigned successfully",
      data: updatedRequest,
    });
  } catch (error) {
    console.error("Assign Engineer Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
