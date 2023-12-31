import express from "express";
import {
  braintreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  relatedProductController,
  searchProductController,
  updateProductController,
} from "../controller/productController.js";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();
import formidable from "express-formidable";

// create product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
// Get product
router.get("/get-product", getProductController);

// single product
router.get("/get-product/:slug", getSingleProductController);

// Get Photo
router.get("/product-photo/:pid", productPhotoController);

// Delete product
router.delete("/delete-product/:pid", deleteProductController);

// filter product
router.post("/product-filters", productFiltersController);

// count the product
router.get("/product-count", productCountController);

// product per page
router.get("/product-list/:page", productListController);

// product search
router.get("/search/:keyword", searchProductController);

// Similar search
router.get("/related-product/:pid/:cid", relatedProductController);

// Categories wise product
router.get("/product-category/:slug", productCategoryController);

// Update product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

// payment token
router.get("/braintree/token", braintreeTokenController);

// payment
router.get("/braintree/payment", braintreePaymentController);

export default router;
