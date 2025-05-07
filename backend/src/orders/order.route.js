const express = require('express');
const { createAOrder, getOrderByEmail, getAllOrders, updateOrderStatus } = require('./order.controller');

const router =  express.Router();

// create order endpoint
router.post("/", createAOrder);

// get orders by user email 
router.get("/email/:email", getOrderByEmail);

// get all orders - accessible to all for simplicity in this implementation
router.get("/", getAllOrders);

// update order status
router.patch("/:id/status", updateOrderStatus);

module.exports = router;