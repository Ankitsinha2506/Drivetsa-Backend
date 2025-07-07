import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    variant: {
      type: String,
      required: true,
      trim: true,
    },
    fuelType: {
      type: String,
      enum: ["Petrol", "Diesel", "Electric", "CNG", "Hybrid"],
      required: true,
    },
    transmissionType: {
      type: String,
      enum: ["Manual", "Automatic"],
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Vehicle", vehicleSchema);
