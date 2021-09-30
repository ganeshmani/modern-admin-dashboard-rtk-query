import { createSlice } from '@reduxjs/toolkit'
import { authApi } from '../../app/services/auth'
import { browserHistory } from 'react-router';

const initialState = {
    user : {
        email : localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).email : "",
        role: localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).role : ""
    },
    isAuthenticated : localStorage.getItem('currentUser') ? true : false
}

const authSlice = createSlice({
    name : 'auth',
    initialState : initialState,
    reducers : {
    },
    extraReducers : (builder) => {
        builder.addMatcher(authApi.endpoints.loginUser.matchFulfilled,(state,{ payload }) => {
            console.log("login payload",payload)
            // if(payload.success) {
                state.user = {
                    email : payload.email,
                    role: payload.role
                }
                state.isAuthenticated = true
                localStorage.setItem('currentUser',JSON.stringify(payload))

                return state;
            // }
           
        }).addMatcher(authApi.endpoints.signupUser.matchFulfilled,(state,{ payload }) => {
            console.log("signup payload",payload)
            state.user = {
                email : payload.email,
                role: payload.role
            }
           
                // state.user = payload.data
                localStorage.setItem('currentUser',JSON.stringify(payload))
            
            
        })
    }
})

export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user
export const isAuthenticated = state => state.auth.isAuthenticated