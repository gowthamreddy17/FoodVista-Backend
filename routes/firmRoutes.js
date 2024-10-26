import express from "express";
import firmController from "../controllers/firmController.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/add-firm", verifyToken, firmController.addFirm);

router.get("/uploads/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  res.headersSent("Content-Type", "image/jpeg");
  res.sendFile(path.join(__dirname, "..", "uploads", imageName));
});

router.delete("/delete-firm/:firmId", firmController.deleteFirmById);

export default router;
