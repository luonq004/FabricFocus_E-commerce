import express from "express";
import {
  createProduct,
  deleteProduct,
  displayProduct,
  getAllProducts,
  getProductById,
  getProductForEdit,
  updateProduct,
  getProductByIdForEdit,
  getListRelatedProducts,
  getAllProductsNoLimit,
} from "../controllers/products.js";

const router = express.Router();

router.get("/products", getAllProducts);
router.get("/products/all", getAllProductsNoLimit);

router.get("/products/:id", getProductById);

router.get("/products/:id/forEdit", getProductByIdForEdit);

router.get("/products/:id/edit", getProductForEdit);

router.post("/products", createProduct);
// router.post("/products", checkAuth, addProduct);

router.put("/products/:id", updateProduct);

router.post("/products/:id", deleteProduct);

router.post("/products/:id/display", displayProduct);

router.get("/listProductFavorite", getListRelatedProducts);

export default router;
