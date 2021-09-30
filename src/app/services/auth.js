import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = 'https://modern-admin-panel-backend.herokuapp.com'

export const authApi = createApi({
    reducerPath : 'authApi',
    baseQuery : fetchBaseQuery({ baseUrl }),
    tagTypes : ['Auth'],
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (body) =>  ({
                url: '/auth/login',
                method: 'POST',
                body
            })
        }),
        signupUser : builder.mutation({
            query : (body) => ({
                url : '/auth/register',
                method : 'POST',
                body
            }) 
        })
    })
})

export const { useLoginUserMutation,useSignupUserMutation } = authApi
