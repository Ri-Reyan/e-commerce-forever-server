import cloudinary from "../../../services/cloudinary.js";
import Product from "../../models/Product/ProductModels.js";

const CreateProduct = async (req, res) => {
  const { name, description, price, category, subCategory, sizes } = req.body;

  try {
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !subCategory ||
      !sizes
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (!req.files || req.files.length !== 4) {
      return res.status(400).json({
        message: "4 images required",
      });
    }

    const imagesUrl = [];

    for (const file of req.files) {
      const uploaded = await cloudinary.uploader.upload(file.path, {
        folder: "products",
      });
      imagesUrl.push(uploaded.secure_url);
    }

    const createdProduct = await Product.create({
      name,
      description,
      price,
      images: imagesUrl,
      category,
      subCategory,
      sizes: JSON.parse(sizes),
    });

    return res.status(201).json({
      message: "Product successfully created",
      Product: createdProduct,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Product creation failed",
      error: err.message,
    });
  }
};

export default CreateProduct;
