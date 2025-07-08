import { validationResult } from "express-validator";
import twilio from "twilio";
import generateToken from "../../utils/generateToken.js";
import client from "../../utils/twilioClient.js";
import { generateOtp } from "../../utils/generateOtp.js";
import userModel from "../../models/Customer/userModel.js";

export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { name, email, mobile, city } = req.body;

  try {
    let userExists = await userModel.findOne({ email });
    if (userExists)
      return res.status(409).json({ message: "User already exists" });

    const user = new userModel({
      name,
      email,
      mobile,
      city,
      role: "customer",
    });

    await user.save();

    const token = generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, mobile } = req.body;

  // Email login for drivesta roles
  if (email) {
    if (!email.endsWith("@drivesta.com")) {
      return res
        .status(400)
        .json({ message: "Please login with mobile number and OTP" });
    }

    const prefix = email.split("@")[0];
    const roleGuess = prefix.split(".").pop();
    const validRoles = ["engineer", "admin", "superadmin"];
    if (!validRoles.includes(roleGuess)) {
      return res
        .status(400)
        .json({ message: "Please login with mobile number and OTP" });
    }

    let user = await userModel.findOne({ email });
    if (!user) {
      user = new userModel({ email, role: roleGuess });
      await user.save();
    }

    const token = generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.json({
      message: "Email login successful",
      token,
      user: {
        userId: user._id,
        email: user.email,
        role: user.role,
      },
    });
  }

  // Mobile number login (Send OTP)
  if (mobile) {
    if (!/^\d{10}$/.test(mobile)) {
      return res.status(400).json({ message: "Invalid mobile number" });
    }

    const otp = generateOtp();
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    let user = await userModel.findOne({ mobile });
    if (!user) {
      user = new userModel({ mobile, role: "customer" });
    }

    user.otp = otp;
    user.otpExpires = otpExpires;

    await user.save();

    try {
      await client.messages.create({
        body: `Your OTP for Drivesta login is: ${otp}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: `+91${mobile}`,
      });

      // console.log("FROM:", process.env.TWILIO_PHONE_NUMBER);

      return res.status(200).json({
        message: "OTP sent to your mobile number : " + otp,
        mobile: user.mobile,
      });
    } catch (error) {
      console.error("Twilio Error:", error);
      return res.status(500).json({ message: "Failed to send OTP" });
    }
  }

  return res
    .status(400)
    .json({ message: "Please provide email or mobile number" });
};

export const logoutUser = (req, res) => {
  try {
    res.clearCookie("token");
    res
      .status(200)
      .json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server error" });
  }
};
