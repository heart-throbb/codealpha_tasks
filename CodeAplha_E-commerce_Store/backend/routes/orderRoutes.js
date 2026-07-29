const express = require("express");
const router = express.Router();
const {
  addOrderItems,
  getMyOrders,
  getAllOrders,
} = require("../controllers/orderController");
const { protect, admin } = require("../middleware/authMiddleware");

router.get("/", protect, admin, getAllOrders);
router.post("/", protect, addOrderItems);
router.get("/myorders", protect, getMyOrders);

module.exports = router;
