import express from "express";
import dotEnv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import vendorRoutes from "./routes/vendorRoutes.js";
import firmRoutes from "./routes/firmRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import path from "path";

const app = express();
const PORT = process.env.PORT || 8000;

dotEnv.config();
// app.use(express.json());
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("mongoDb connected"))
  .catch((err) => console.log(err));

app.use("/home", (req,res)=>{
    res.send("<h1>Hello from Vista</h1>")
});

//middlewares
app.use("/vendor", vendorRoutes);
app.use("/firm", firmRoutes);
app.use("/product", productRoutes);
app.use("/uploads", express.static("uploads"));

app.listen(PORT, () => {
  console.log(`Port is running at ${PORT}`);
});
