import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { authApi } from './services/auth'
import authReducer from '../features/Auth/authSlice'
import userReducer from '../features/Users/userSlice'
import { userApi } from './services/user'
import { ordersApi } from './services/orders'
import { dashboardApi } from './services/dashboard'
export const store = configureStore({
    reducer : {
        auth: authReducer,
        user: userReducer,
        [authApi.reducerPath] : authApi.reducer,
        [userApi.reducerPath] : userApi.reducer,
        [ordersApi.reducerPath] : ordersApi.reducer,
        [dashboardApi.reducerPath] : dashboardApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware).concat(userApi.middleware).concat(ordersApi.middleware).concat(dashboardApi.middleware)
})

setupListeners(store.dispatch)