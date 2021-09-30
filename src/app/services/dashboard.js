import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const baseUrl = `https://modern-admin-panel-backend.herokuapp.com`
//sortedorders
export const dashboardApi = createApi({
    reducerPath : 'dashboardApi',
    baseQuery : fetchBaseQuery({baseUrl,prepareHeaders : (headers,{getState}) => {
        const token = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).access_token : null
        if(token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers
    }}),
    tagTypes : ['Dashboard'],
    endpoints : (builder) => ({
        fetchRecentOrders : builder.query({
            query : (user) => {
                return {
                    url : (user.role !== "admin") ? `/users/${user.id}/sortedorders` : `/sortedorders`,
                    method : 'GET'
                }
            },
            providesTags : ['Dashboard']
        }),
        fetchMonthlyOrders : builder.query({
            query : () => {
                return {
                    url : `/monthlyorders`,
                    method : 'GET'
                }
            },
            providesTags : ['Dashboard']
        }),
    })
})

export const { useFetchRecentOrdersQuery,useFetchMonthlyOrdersQuery } = dashboardApi