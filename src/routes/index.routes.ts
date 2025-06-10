import { Router } from "express";
import authRoutes from "./auth.routes";
import productRoutes from "./product.routes";
import serviceRoutes from "./service.routes";
import supplierRoutes from "./supplier.routes";
import usersRoutes from "./users.routes";
import petRoutes from "./pet.routes";
import appointmentRoutes from "./appointment.routes";
import { isAuth } from "../middleware/auth";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
router.use("/products", productRoutes);
router.use("/services", serviceRoutes);
router.use("/suppliers", supplierRoutes);
router.use("/pets", isAuth, petRoutes);
router.use("/appointments", isAuth, appointmentRoutes);

// Ejemplo de ruta de prueba
router.get("/ping", (_req, res) => {
  res.send("¡Pong! 🐾");
});

export default router;
