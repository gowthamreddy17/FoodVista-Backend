import Firm from "../models/Firm.js";
import Vendor from "../models/Vendor.js";
import multer from "multer"; //to add images in database

// Set up storage using Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Set the destination directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append the timestamp to the filename
  },
});

const upload = multer({ storage });

const addFirm = async (req, res) => {
  try {
    const { firmName, area, category, region, offer } = req.body;

    const image = req.file ? req.file.filename : undefined;

    const vendor = await Vendor.findById(req.vendorId);

    if (!vendor) res.status(404).json({ message: "vendor not found" });

    const firm = new Firm({
      firmName,
      area,
      category,
      region,
      offer,
      image,
      vendor: vendor._id,
    });

    const savedFirm = await firm.save();

    vendor.firm.push(savedFirm);

    await vendor.save();

    return res.status(201).json({ message: "firm added sucessfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};

const deleteFirmById = async (req, res) => {
  try {
    const firmId = req.params.firmId;
    const deletedFirm = await Firm.findByIdAndDelete(firmId);
    if (!deletedFirm) res.status(404).json({ error: "no firm found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default { addFirm: [upload.single("image"), addFirm], deleteFirmById };
