import express from "express";
import vendorController from "../controllers/vendorController.js";

const router = express.Router();

router.post("/register", vendorController.vendorRegister);
router.post("/login", vendorController.vendorLogin); //Here Using the POST method for login to securely send credentials in the request body and verify existing user accounts without exposing sensitive information in the URL.

router.get("/all-vendors", vendorController.getAllVendors);
router.get("/get-vendor/:id", vendorController.getVendorByID);

export default router;
