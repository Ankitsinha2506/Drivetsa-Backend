import mongoose from "mongoose";

const signSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    mobile: { type: String, required: true },
    city: { type: String }, // Optional for admin
    designation: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "engineer"], required: true },
  },
  { timestamps: true }
);

export default mongoose.model("employee", signSchema);
