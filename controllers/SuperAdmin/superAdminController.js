import userModel from "../../models/Customer/userModel.js";

export const getusers = async (req, res) => {
  try {
    const users = await userModel.find({ role: "customer" });
    if (!users || users.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No users found" });
    }
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
