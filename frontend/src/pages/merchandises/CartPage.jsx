import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getImgUrl } from '../../utils/getImgUrl';
import { clearCart, removeFromCart } from '../../redux/features/cart/cartSlice';

const CartPage = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const dispatch = useDispatch();

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2);

    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    return (
        <div className="flex mt-12 h-full flex-col overflow-hidden bg-white shadow-xl">
            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                <div className="flex items-start justify-between mb-4">
                    <h2 className="text-lg font-medium text-gray-900">Shopping Cart</h2>
                    <button
                        onClick={handleClearCart}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                    >
                        Clear Cart
                    </button>
                </div>

                {cartItems.length > 0 ? (
                    <ul className="-my-6 divide-y divide-gray-200">
                        {cartItems.map((product) => (
                            <li key={product._id} className="flex py-4">
                                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                        src={getImgUrl(product.coverImage)}
                                        alt={product.title}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between text-sm font-medium text-gray-900">
                                            <h3>
                                                <Link to={`/merchandises/${product._id}`} className="hover:text-blue-600">
                                                    {product.title}
                                                </Link>
                                            </h3>
                                            <p className="ml-4">৳{product.price}</p>
                                        </div>
                                        <p className="mt-0.5 text-xs text-gray-500 capitalize">
                                            <strong>Category:</strong> {product.category}
                                        </p>
                                    </div>

                                    <div className="flex justify-between text-sm mt-2">
                                        <p className="text-gray-500"><strong>Qty:</strong> 1</p>
                                        <button
                                            onClick={() => handleRemoveFromCart(product)}
                                            className="text-indigo-600 hover:text-indigo-500 font-medium"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 text-center mt-10">No product found in cart!</p>
                )}
            </div>

            {/* Checkout Section */}
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>৳{totalPrice || '0.00'}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                    <Link
                        to="/checkout"
                        className="w-full flex items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-base font-medium text-white hover:bg-indigo-700"
                    >
                        Checkout
                    </Link>
                </div>
                <div className="mt-6 flex justify-center text-sm text-gray-500">
                    <Link to="/">
                        or
                        <span className="ml-1 text-indigo-600 hover:text-indigo-500 font-medium">
                            Continue Shopping &rarr;
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
