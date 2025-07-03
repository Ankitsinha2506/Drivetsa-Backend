import mongoose from 'mongoose';

const vehiclePDIRequestSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  bookingId: { type: String, unique: true, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  variant: { type: String, required: true },
  transmissionType: { type: String, required: true },
  fuelType: { type: String, required: true },
  address: { type: String, required: true },
  carStatus: { type: String, enum: ['New', 'Used'], required: true },
  date: { type: Date, required: true },
  notes: { type: String },
  imageUrl: { type: String }
}, { timestamps: true });

const VehiclePDIRequest = mongoose.model('VehiclePDIRequest', vehiclePDIRequestSchema);

export default VehiclePDIRequest;
