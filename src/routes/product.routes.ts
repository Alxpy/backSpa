// src/routes/product.routes.ts
import { Router } from "express";
import {
  addCartProduct,
  buyCartProducts,
  createProduct,
  deleteProduct,
  getCartProducts,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/product.controller";
import { isAuth } from "../middleware/auth";

const router = Router();

router.post("/", isAuth, createProduct);
router.post("/cart", isAuth, addCartProduct);
router.post("/buy", isAuth, buyCartProducts);
router.get("/", getProducts);
router.get("/cart", isAuth, getCartProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
