import { StatusCodes } from "http-status-codes";
import Product from "../models/product.js";
import Variant from "../models/variant.js";
import Cart from "../models/cart.js";

export const checkCartProduct = async (req, res, next) => {
  console.log(req.body);
  const { userId, productId, variantId } = req.body;
  const id = req.params.id;

  try {
    let cart = await Cart.findOne({ userId: userId ? userId : id })
      .populate("products.productItem")
      .populate("products.variantItem")
      .populate("voucher");

    const product = await Product.findOne({ _id: productId });
    const variantValue = await Variant.findOne({ _id: variantId });

    //check cart
    if (cart) {
      cart.products.forEach((product) => {
        if (
          product.productItem.deleted === true ||
          product.variantItem.deleted === true
        ) {
          product.selected = false;
        }
      });

      await cart.save();
    }

    //check xóa mềm
    if (
      (product && product.deleted === true) ||
      (variantValue && variantValue.deleted === true)
    ) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Sản phẩm hoặc Biến thể không tồn tại" });
    }

    next();
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
