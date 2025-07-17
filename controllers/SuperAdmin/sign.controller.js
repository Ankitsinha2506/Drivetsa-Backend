
import bcrypt from "bcryptjs";
import Sign from "../../models/SuperAdmin/sign.model.js";

const registerUser = async (req, res, role) => {
  const { name, email, mobile, city, designation, password } = req.body;

  if (!name || !email || !mobile || !designation || !password) {
    return res
      .status(400)
      .json({ error: "All required fields must be filled" });
  }

  try {
    const existingUser = await Sign.findOne({ email });
    if (existingUser)
      return res.status(409).json({ error: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Sign({
      name,
      email,
      mobile,
      city: role === "engineer" ? city : undefined,
      designation,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res.status(201).json({ message: `${role} registered successfully` });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const signupEngineer = (req, res) => registerUser(req, res, "engineer");
export const signupAdmin = (req, res) => registerUser(req, res, "admin");
