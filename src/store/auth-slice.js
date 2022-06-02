import {createSlice} from "@reduxjs/toolkit"

const authSlice = createSlice({
    name:'auth',
    initialState: { 
        isLogin:localStorage.isLogin || false,
        isLoginId:localStorage.isLoginId || null,
        token:false,
    },
    reducers: {
        login(state, action){
            state.isLogin = true
            state.token = action.payload.token
            state.isLoginId = action.payload.isLoginId
        },
        logout(state){
            state.isLogin = false
            state.isLoginId = null
        }
    }
})

export const authActions = authSlice.actions

export default authSlice