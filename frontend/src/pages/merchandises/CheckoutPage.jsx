import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import { useCreateOrderMutation } from '../../redux/features/orders/ordersApi';

const CheckoutPage = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const totalPrice = parseFloat(
    cartItems.reduce((acc, item) => acc + parseFloat(item.price || 0), 0)
  ).toFixed(2);

  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const [isChecked, setIsChecked] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
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

    try {
      await createOrder(newOrder).unwrap();
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

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <section className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Checkout</h2>
        <p className="text-gray-600 mb-2">Total Price: ৳{totalPrice}</p>
        <p className="text-gray-600 mb-6">Items in Cart: {cartItems.length}</p>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
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
    </section>
  );
};

export default CheckoutPage;
