import Product from "../../models/Product/ProductModels.js";

const AllProducts = async (req, res) => {
  try {
    const productdata = await Product.find();
    return res.status(200).json({
      message: "All product fetched",
      product: productdata,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Product fetching failed",
    });
  }
};

export default AllProducts;
