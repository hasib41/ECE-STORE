import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import { useCreateOrderMutation } from '../../redux/features/orders/ordersApi';
import { clearCart } from '../../redux/features/cart/cartSlice';

const CheckoutPage = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const totalPrice = parseFloat(
    cartItems.reduce((acc, item) => acc + parseFloat(item.Price || 0), 0)
  ).toFixed(2);

  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const [isChecked, setIsChecked] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [transactionError, setTransactionError] = useState("");
  const [transactionSubmitted, setTransactionSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  
  // Watch for payment method changes
  const watchPaymentMethod = watch("paymentMethod");
  
  // When payment method changes, update the state
  useEffect(() => {
    setPaymentMethod(watchPaymentMethod);
  }, [watchPaymentMethod]);

  const onSubmit = async (data) => {
    // If Mobile Banking is selected but submit is clicked without transaction ID
    if (data.paymentMethod === "Mobile Banking" && !transactionId) {
      setShowTransactionModal(true);
      return;
    }

    // Create the order object with all required fields
    const newOrder = {
      name: data.name,
      studentId: data.studentId,
      email: data.email,
      phone: data.phone,
      size: data.size,
      sleeveType: data.sleeveType,
      NameOnJersey: data.nameOnJersey,
      NumberOnJersey: data.numberOnJersey,
      paymentMethod: data.paymentMethod,
      productIds: cartItems.map(item => item?._id),
      totalPrice: Number(totalPrice)
    };

    // Only add transaction ID for Mobile Banking payments
    if (data.paymentMethod === "Mobile Banking") {
      newOrder.transactionId = transactionId.trim();
      console.log(`Adding transactionId: ${transactionId} to order`);
    }

    console.log("Submitting order with data:", newOrder);
    
    try {
      const result = await createOrder(newOrder).unwrap();
      console.log("Order created successfully:", result);
      
      // Verify the transaction ID was saved properly
      if (data.paymentMethod === "Mobile Banking") {
        console.log(`Verification - Transaction ID in submitted order: ${newOrder.transactionId}`);
        console.log(`Verification - Transaction ID in response: ${result.transactionId}`);
        
        if (result.transactionId) {
          console.log("✅ Transaction ID was saved correctly");
        } else {
          console.error("❌ Transaction ID was NOT saved correctly!");
        }
      }
      
      dispatch(clearCart()); // Clear the cart after successful order
      
      Swal.fire({
        title: "Order Placed!",
        text: "Your order has been successfully placed.",
        icon: "success",
        confirmButtonColor: "#3085d6"
      });
      
      navigate("/orders");
    } catch (error) {
      console.error("Order failed", error);
      const errorMessage = error.data?.errors?.join('\n') || error.data?.message || "Failed to place order";
      Swal.fire({
        title: "Error",
        text: errorMessage,
        icon: "error"
      });
    }
  };
  
  // Handle the transaction ID submission
  const handleTransactionSubmit = () => {
    if (!transactionId || !transactionId.trim()) {
      setTransactionError("Transaction ID is required");
      return;
    }
    
    console.log(`Transaction ID submitted: ${transactionId}`);
    setTransactionError("");
    setShowTransactionModal(false);
    setTransactionSubmitted(true);
    
    // Trigger the form submission again with the transaction ID
    handleSubmit(onSubmit)();
  };

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <section className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Checkout</h2>
        <p className="text-gray-600 mb-2">Total Price: ৳{totalPrice}</p>
        <p className="text-gray-600 mb-6">Items in Cart: {cartItems.length}</p>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
          {/* Form fields remain the same */}
          {/* Full Name */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Full Name</label>
            <input {...register("name", { required: true })}
              className="w-full h-10 px-3 border border-black rounded outline-none"
              placeholder="Your full name" />
            {errors.name && <p className="text-red-600 text-sm">Full name is required</p>}
          </div>

          {/* Student ID */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Student ID</label>
            <input {...register("studentId", { required: true })}
              className="w-full h-10 px-3 border border-black rounded outline-none"
              placeholder="e.g., 210901" />
            {errors.studentId && <p className="text-red-600 text-sm">Student ID is required</p>}
          </div>

          {/* Email Address */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Email Address</label>
            <input
              {...register("email", { required: true })}
              className="w-full h-10 px-3 border border-black rounded outline-none"
              placeholder="you@example.com"
              defaultValue={currentUser?.email || ""}
            />
            {errors.email && <p className="text-red-600 text-sm">Email is required</p>}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Phone Number</label>
            <input {...register("phone", { required: true })}
              className="w-full h-10 px-3 border border-black rounded outline-none"
              placeholder="+8801XXXXXXX" />
            {errors.phone && <p className="text-red-600 text-sm">Phone is required</p>}
          </div>

          {/* Size */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Size</label>
            <select
              {...register("size", { required: true })}
              className="w-full h-10 px-3 border border-black rounded outline-none bg-white"
              defaultValue=""
            >
              <option value="" disabled>Select size</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>
            {errors.size && <p className="text-red-600 text-sm">Size is required</p>}
          </div>

          {/* Sleeve Type */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Sleeve Type</label>
            <select
              {...register("sleeveType", { required: true })}
              className="w-full h-10 px-3 border border-black rounded outline-none bg-white"
              defaultValue=""
            >
              <option value="" disabled>Select sleeve type</option>
              <option value="half sleeve">Half Sleeve</option>
              <option value="full sleeve">Full Sleeve</option>
            </select>
            {errors.sleeveType && <p className="text-red-600 text-sm">Sleeve type is required</p>}
          </div>

          {/* Name on Jersey */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Name on Jersey</label>
            <input {...register("nameOnJersey", { required: true })}
              className="w-full h-10 px-3 border border-black rounded outline-none"
              placeholder="Name to print on jersey" />
            {errors.nameOnJersey && <p className="text-red-600 text-sm">Name on jersey is required</p>}
          </div>

          {/* Number on Jersey */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Number on Jersey</label>
            <input {...register("numberOnJersey", { required: true })}
              className="w-full h-10 px-3 border border-black rounded outline-none"
              placeholder="e.g., 10" />
            {errors.numberOnJersey && <p className="text-red-600 text-sm">Number on jersey is required</p>}
          </div>

          {/* Payment Method */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">Payment Method</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="Cash"
                  {...register("paymentMethod", { required: true })}
                />
                Cash
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="Mobile Banking"
                  {...register("paymentMethod", { required: true })}
                />
                Mobile Banking
              </label>
            </div>
            {errors.paymentMethod && <p className="text-red-600 text-sm">Payment method is required</p>}
          </div>
          
          {/* Mobile Banking Info - only show when Mobile Banking is selected */}
          {paymentMethod === "Mobile Banking" && (
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2">Mobile Banking Information</h3>
              <p className="text-sm text-blue-700 mb-2">Please send payment to the following number:</p>
              <div className="bg-white p-3 rounded border border-blue-200 mb-3">
                <p className="font-medium">bKash:+880 1533116517</p>
                <p className="text-sm text-gray-600">Send money to this number and note your transaction ID.</p>
              </div>
              
              {/* Transaction ID Input */}
              <div className="mb-3">
                <label className="block font-medium text-blue-800 mb-1">Transaction ID</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    className="flex-1 h-10 px-3 border border-blue-300 rounded outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter your bKash transaction ID"
                  />
                </div>
                {transactionError && <p className="text-red-600 text-sm mt-1">{transactionError}</p>}
              </div>
              
              {transactionId && (
                <div className="flex items-center bg-green-50 p-2 rounded">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-sm text-green-600">Transaction ID: {transactionId}</p>
                </div>
              )}
              
              {!transactionId && (
                <div className="text-sm text-yellow-700 mt-2 bg-yellow-50 p-2 rounded">
                  <svg className="h-5 w-5 text-yellow-500 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>Transaction ID is required before order completion.</span>
                </div>
              )}
            </div>
          )}

          {/* Terms Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="agree"
              className="mr-2"
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <label htmlFor="agree" className="text-sm text-gray-600">
              I agree to the <Link to="#" className="text-blue-600 underline">Terms & Conditions</Link> and <Link to="#" className="text-blue-600 underline">Shopping Policy</Link>
            </label>
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <button
              type="submit"
              disabled={!isChecked}
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
      
      {/* Transaction ID Modal */}
      {showTransactionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Enter Transaction ID</h3>
            <p className="text-gray-600 mb-4">
              Please enter the transaction ID from your bKash payment to complete your order.
            </p>
            
            <div className="mb-6">
              <label className="block font-medium text-gray-700 mb-1">Transaction ID</label>
              <input
                type="text"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                className="w-full h-10 px-3 border border-gray-300 rounded outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="e.g., ABCD1234XY"
                autoFocus
              />
              {transactionError && <p className="text-red-600 text-sm mt-1">{transactionError}</p>}
            </div>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Your transaction ID is crucial for order verification. Please ensure you enter it correctly.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowTransactionModal(false)}
                className="px-4 py-2 border border-gray-300 rounded shadow-sm text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleTransactionSubmit}
                className="px-4 py-2 bg-blue-600 rounded shadow-sm text-white hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CheckoutPage;
