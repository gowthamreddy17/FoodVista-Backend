import Vendor from "../models/Vendor.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotEnv from "dotenv";

dotEnv.config();
const secretKey = process.env.SECRET_KEY;

const vendorRegister = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const vendorEmail = await Vendor.findOne({ email });
    if (vendorEmail) {
      return res.status(400).json("Email already exist");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newVendor = new Vendor({
      username,
      email,
      password: hashedPassword,
    });

    await newVendor.save();

    res.status(201).send("vendor registered succesfully");
    console.log("registered");
  } catch (err) {
    console.log(err);
  }
};

const vendorLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const vendor = await Vendor.findOne({ email });

    if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    const token = jwt.sign({ vendorId: vendor._id }, secretKey, {
      expiresIn: "1h",
    });

    res.status(200).json({ success: "Login Sucessfull", token });
    console.log(email);
    console.log(token);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server error" });
  }
};

const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().populate("firm"); //populate() to get other table details in venor table
    res.json(vendors);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server error" });
  }
};

const getVendorByID = async (req, res) => {
  const vendorId = req.params.id;
  try {
    const vendor = await Vendor.findById(vendorId).populate("firm");
    if (!vendor) return res.json({ message: "vendor not found" }).status(404);
    res.status(200).json(vendor);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server error" });
  }
};

export default {
  vendorRegister,
  vendorLogin,
  getAllVendors,
  getVendorByID,
};
