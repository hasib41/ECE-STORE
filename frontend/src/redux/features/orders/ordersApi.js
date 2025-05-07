import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseURL";

// For debugging purposes
console.log("API Base URL:", getBaseUrl());

const ordersApi = createApi({
    reducerPath: 'ordersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/orders`,
        credentials: 'include'
    }),
    tagTypes: ['Orders'],
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (newOrder) => ({
                url: "/",
                method: "POST",
                body: newOrder,
                credentials: 'include',
            }),
            invalidatesTags: ['Orders']
        }),
        getOrderByEmail: builder.query({
            query: (email) => ({
                url: `/email/${email}`
            }),
            providesTags: ['Orders']
        }),
        getAllOrders: builder.query({
            query: () => ({
                url: "/",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }),
            // For debugging - log any errors
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                } catch (error) {
                    console.error('Error fetching orders:', error);
                }
            },
            keepUnusedDataFor: 0, // Don't cache 
            providesTags: ['Orders']
        }),
        updateOrderStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/${id}/status`,
                method: "PATCH",
                body: { status },
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            }),
            invalidatesTags: ['Orders']
        })
    })
})

export const { 
    useCreateOrderMutation, 
    useGetOrderByEmailQuery, 
    useGetAllOrdersQuery,
    useUpdateOrderStatusMutation
} = ordersApi;
export default ordersApi;