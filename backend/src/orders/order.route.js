const express = require('express');
const { createAOrder, getOrderByEmail, getAllOrders, updateOrderStatus } = require('./order.controller');

const router =  express.Router();

// create order endpoint
router.post("/", createAOrder);

// get orders by user email 
router.get("/email/:email", getOrderByEmail);

// Debug route to check transaction IDs
router.get("/debug/transactions", async (req, res) => {
  try {
    const orders = await Order.find({ paymentMethod: 'Mobile Banking' });
    console.log("Mobile banking orders:", orders);
    
    const transactionInfo = orders.map(order => ({
      id: order._id,
      date: order.createdAt,
      transactionId: order.transactionId,
      transaction_id: order.transaction_id,
      hasTransactionId: !!order.transactionId || !!order.transaction_id,
      fields: Object.keys(order._doc)
    }));
    
    res.json({
      total: orders.length,
      withTransactionId: orders.filter(o => o.transactionId || o.transaction_id).length,
      orders: transactionInfo
    });
  } catch (error) {
    console.error("Error in debug route:", error);
    res.status(500).json({ error: "Failed to fetch transaction data" });
  }
});

// get all orders - accessible to all for simplicity in this implementation
router.get("/", getAllOrders);

// update order status
router.patch("/:id/status", updateOrderStatus);

module.exports = router;