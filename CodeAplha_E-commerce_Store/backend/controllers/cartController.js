const Cart = require("../models/Cart");

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (cart) {
      res.json(cart);
    } else {
      res.json({ cartItems: [] });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.syncCart = async (req, res) => {
  try {
    const { cartItems } = req.body;
    let cart = await Cart.findOne({ user: req.user.id });

    if (cart) {
      cart.cartItems = cartItems;
      await cart.save();
      res.json(cart);
    } else {
      cart = await Cart.create({
        user: req.user.id,
        cartItems,
      });
      res.status(201).json(cart);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
