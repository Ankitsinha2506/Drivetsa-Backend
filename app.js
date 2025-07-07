import express from "express";

import cookieParser from "cookie-parser";
import userRoutes from "./routes/Customer/userRouter.js";
import vehiclePDI from "./routes/Customer/vehiclePDI.routes.js";
import vehicleRoutes from "./routes/SuperAdmin/vehicleRoutes.js";
import SuperAdminRoutes from "./routes/SuperAdmin/superAdminRouter.js";

const app = express();

// Middleware
app.use(express.json());

// for store token in cookie
app.use(cookieParser());
// Base route
// app.use('/api/auth', authRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/superadmin", SuperAdminRoutes); // Assuming superadmin routes are also under authRoutes
app.use("/api/inspections", vehiclePDI);
app.use("/api/addvehicles", vehicleRoutes);

app.get("/", (req, res) => {
  res.send(" API is running...");
});

export default app;
