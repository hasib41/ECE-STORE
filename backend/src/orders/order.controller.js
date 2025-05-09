
const Order = require("./order.model");

const createAOrder = async (req, res) => {
  try {
    // Log the entire request body
    console.log("Creating order - Full request data:", JSON.stringify(req.body, null, 2));
    
    // Check specifically for transaction ID
    const { paymentMethod, transactionId } = req.body;
    if (paymentMethod === 'Mobile Banking') {
      console.log(`Mobile Banking payment detected. Transaction ID: ${transactionId || 'MISSING'}`);
    }
    
    // Create a new order with explicit handling of transaction ID
    const orderData = {...req.body};
    
    // If it's a mobile banking payment, ensure the transaction ID is set
    if (orderData.paymentMethod === 'Mobile Banking') {
      if (!orderData.transactionId) {
        console.warn("Mobile Banking payment without transaction ID!");
        return res.status(400).json({ 
          message: "Transaction ID is required for Mobile Banking payments",
          errors: ["Transaction ID is required"]
        });
      } else {
        console.log(`Setting transaction ID to: ${orderData.transactionId}`);
        // Make sure transactionId is explicitly set in the document
        orderData.transactionId = orderData.transactionId.trim();
      }
    }
    
    const newOrder = new Order(orderData);
    
    // Double-check the transaction ID is correctly set
    if (orderData.paymentMethod === 'Mobile Banking') {
      newOrder.transactionId = orderData.transactionId;
    }
    
    // Log the Mongoose document before saving
    console.log("Order document to be saved:", 
      JSON.stringify({
        paymentMethod: newOrder.paymentMethod,
        transactionId: newOrder.transactionId,
        hasTransactionIdField: 'transactionId' in newOrder,
        allFields: Object.keys(newOrder._doc || {})
      }, null, 2)
    );
    
    const savedOrder = await newOrder.save();
    
    // Verify the saved order has the transaction ID
    console.log("Saved order - payment details:", 
      JSON.stringify({
        _id: savedOrder._id,
        paymentMethod: savedOrder.paymentMethod,
        transactionId: savedOrder.transactionId,
        hasTransactionIdField: 'transactionId' in savedOrder,
        allFields: Object.keys(savedOrder._doc || {})
      }, null, 2)
    );
    
    res.status(200).json(savedOrder);
  } catch (error) {
    console.error("Error creating order", error);
    res.status(500).json({ message: "Failed to create order" });
  }
};

const getOrderByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    console.log(`Fetching orders for email: ${email}`);
    
    // Explicitly select all fields including transactionId
    const orders = await Order.find({ email })
      .sort({ createdAt: -1 })
      .select('_id name email phone studentId size sleeveType NameOnJersey NumberOnJersey paymentMethod transactionId totalPrice productIds status createdAt updatedAt')
      .populate('productIds', 'title Price coverImage');
    
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }
    
    console.log(`Found ${orders.length} orders for email: ${email}`);
    
    // Debug each order's transaction ID
    orders.forEach(order => {
      if (order.paymentMethod === 'Mobile Banking') {
        console.log(`Mobile Banking Order - ID: ${order._id}, TransactionId: ${order.transactionId || 'null'}`);
        console.log(`Order fields:`, Object.keys(order._doc || order));
      }
    });
    
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders", error);
    res.status(500).json({ message: "Failed to fetch order" });
  }
};

const getAllOrders = async (req, res) => {
  console.log("getAllOrders route called");
  try {
    // Use populate to get product details along with order data
    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .select('_id name email phone studentId size sleeveType NameOnJersey NumberOnJersey paymentMethod transactionId totalPrice productIds status createdAt updatedAt')
      .populate('productIds', 'title Price coverImage'); // Populate product information
    
    console.log(`Found ${orders.length} orders`);
    
    // Log transaction IDs for mobile banking orders
    const mobileOrders = orders.filter(o => o.paymentMethod === 'Mobile Banking');
    console.log(`Found ${mobileOrders.length} mobile banking orders`);
    mobileOrders.forEach(order => {
      console.log(`Order ID: ${order._id}, Transaction ID: ${order.transactionId || 'MISSING'}`);
    });
    
    // Send appropriate headers
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching all orders", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }
    
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order status", error);
    res.status(500).json({ message: "Failed to update order status" });
  }
};

module.exports = {
  createAOrder,
  getOrderByEmail,
  getAllOrders,
  updateOrderStatus
};