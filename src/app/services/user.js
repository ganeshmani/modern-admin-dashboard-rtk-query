import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = `https://modern-admin-panel-backend.herokuapp.com`

export const userApi = createApi({
    reducerPath : 'userApi',
    baseQuery : fetchBaseQuery({baseUrl,prepareHeaders : (headers,{getState}) => {
        const token = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).access_token : null
        if(token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers
    }}),
    tagTypes : ['Users'],
    endpoints : (builder) => ({
        fetchAllUsers : builder.query({
            query : () => `/users`,
            providesTags : ['Users']
        }),
        fetchUsersByQuery : builder.query({
            query : (searchTerm) => `/users?q=${searchTerm}`
        }),
        createUser: builder.mutation({
            query(body){
                return {
                url : '/users',
                method : 'POST',
                body
                }
            },
            invalidatesTags : ['Users']
        }),
        updateUser : builder.mutation({
            query : (data) => 
            {
                const { id, ...body } = data
                return {
                    url : `/users/${id}`,
                    method : 'PUT',
                    body
                }
            },
            invalidatesTags : ['Users']
        })
    })
})

export const { useFetchAllUsersQuery,useFetchUsersByQueryQuery,useCreateUserMutation,useUpdateUserMutation } = userApi