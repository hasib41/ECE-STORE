import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseUrl from '../../../utils/baseURL'

const  baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/merchandises`,
    credentials: 'include',
    prepareHeaders: (Headers) => {
        const token =  localStorage.getItem('token');
        if(token) {
            Headers.set('Authorization', `Bearer ${token}`);
        }
        return Headers;
    }
})

const merchandisesApi = createApi({
    reducerPath: 'merchandisesApi',
    baseQuery,
    tagTypes: ['Merchandises'],
    endpoints: (builder) =>({
        fetchAllMerchandise: builder.query({
            query: () => "/",
            providesTags: ["Merchandises"]
        }),
        fetchMerchandiseById: builder.query({
            query: (id) => {
                if (!id) {
                    throw new Error('Merchandise ID is required');
                }
                return `/${id}`;
            },
            transformErrorResponse: (response) => {
                return {
                    status: response.status,
                    data: response.data,
                    message: response.data?.message || 'Failed to fetch merchandise'
                };
            },
            providesTags: (result, error, id) => [{ type: "Merchandises", id }],
        }),
        addMerchandise: builder.mutation({
            query: (newMerchandise) => ({
                url: `/create-merchandise`,
                method: "POST",
                body: newMerchandise
            }),
            invalidatesTags: ["Merchandises"]
        }),
        updateMerchandise: builder.mutation({
            query: ({id, ...rest}) => ({
                url: `/edit/${id}`,
                method: "PUT",
                body: rest,
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ["Merchandises"]
        }),
        deleteMerchandise: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Merchandises"]
        })
    })
})

export const {useFetchAllMerchandiseQuery, useFetchMerchandiseByIdQuery, useAddMerchandiseMutation, useUpdateMerchandiseMutation, useDeleteMerchandiseMutation} = merchandisesApi;
export default merchandisesApi;