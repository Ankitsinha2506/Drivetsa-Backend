import express from "express";

import cookieParser from "cookie-parser";
import userRoutes from "./routes/Customer/userRouter.js";
import vehiclePDI from "./routes/Customer/vehiclePDI.routes.js";
import vehicleRoutes from "./routes/SuperAdmin/vehicleRoutes.js";
import SuperAdminRoutes from "./routes/SuperAdmin/superAdminRouter.js";
import signup from "./routes/SuperAdmin/sign.route.js";
import assignEngineerRoutes from "./routes/Admin/assignEngineer.route.js";
import pdiRequestRoutes from "./routes/Admin/pdiRequest.route.js";

const app = express();

// Middleware
app.use(express.json());

// for store token in cookie
app.use(cookieParser());

//Customer Routes
app.use("/api/auth", userRoutes);
app.use("/api/request", vehiclePDI);

//Superadmin Routes
app.use("/api/superadmin", SuperAdminRoutes);
app.use("/api/superadmin", signup);
app.use("/api/addvehicles", vehicleRoutes);

// Admin routes
app.use("/api/admin", assignEngineerRoutes);
app.use("/api/admin", pdiRequestRoutes);

app.get("/", (req, res) => {
  res.send(" API is running...");
});

export default app;
