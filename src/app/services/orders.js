import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const baseUrl = `https://modern-admin-panel-backend.herokuapp.com`
//sortedorders
export const ordersApi = createApi({
    reducerPath : 'ordersApi',
    baseQuery : fetchBaseQuery({baseUrl,prepareHeaders : (headers,{getState}) => {
        const token = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).access_token : null
        if(token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers
    }}),
    tagTypes : ['Orders'],
    endpoints : (builder) => ({
        fetchAllOrders : builder.query({
            query : (user) => {
                return {
                    url : (user.role !== "admin") ? `/users/${user.id}/orders` : `/orders`,
                    method : 'GET'
                }
            },
            providesTags : ['Orders']
        }),
        fetchOrdersByUserId : builder.query({
            query : (userId) => `/users/${userId}/orders`
        }),
    })
})

export const { useFetchAllOrdersQuery,useFetchOrdersByUserIdQuery } = ordersApi