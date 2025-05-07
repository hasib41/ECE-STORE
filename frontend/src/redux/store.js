import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart/cartSlice'
import merchandisesApi from './features/merchandises/merchandisesApi'
import ordersApi from './features/orders/ordersApi'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [merchandisesApi.reducerPath]: merchandisesApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(merchandisesApi.middleware, ordersApi.middleware),
})