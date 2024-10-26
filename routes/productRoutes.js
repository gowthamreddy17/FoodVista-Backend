import express from "express";
import productController from "../controllers/productController.js";

const router = express.Router();

router.post("/add-product/:firmId", productController.addProduct);
router.get("/:firmId/products", productController.getProductByFirm);

router.get("/uploads/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  res.headersSent("Content-Type", "image/jpeg");
  res.sendFile(path.join(__dirname, "..", "uploads", imageName));
});

router.delete("/delete-product/:productId", productController.deleteProductById);

export default router;
