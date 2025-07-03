import express from "express";
import authRoutes from "./routes/userRouter.js";
import cookieParser from "cookie-parser";
import SuperAdminRoutes from "./routes/superadminRouter.js";
import vehiclePDI from "./routes/vehiclePDI.routes.js";

const app = express();

// Middleware
app.use(express.json());

// for store token in cookie
app.use(cookieParser());
// Base route
// app.use('/api/auth', authRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/superadmin", SuperAdminRoutes); // Assuming superadmin routes are also under authRoutes
app.use("/api/inspections", vehiclePDI);

app.get("/", (req, res) => {
  res.send(" API is running...");
});

export default app;
