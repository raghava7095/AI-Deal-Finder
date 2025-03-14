import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  source: { type: String, required: true },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
