import { createSlice } from '@reduxjs/toolkit'
import { userApi } from '../../app/services/user'

const initialState = {
    users: []
}

const userSlice = createSlice({
    name: 'user',
    initialState : initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addMatcher(userApi.endpoints.fetchAllUsers.matchFulfilled,(state,{payload}) => {
            state.users = payload

            return state
        })
    }
})

export default userSlice.reducer

export const usersList = state => state.user.users

