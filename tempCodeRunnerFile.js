const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");
const Product = require("./models/Product");
dotenv.config();
app.use(express.json());
app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running on port 5000");
});
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.error("Database connection error:", err.message); // Log detailed error
  });

app.get("/", async (req, res) => {
  try {
    const products = await Product.find(); // Wait for the database query
    res.json(products); // Send the products as JSON
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: err.message });
  }
});
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/orders", orderRoutes);
