import {createSlice} from "@reduxjs/toolkit"

const profileSlice = createSlice({
    name:'profile',
    initialState: {
        user : {},
        change: false,
        userListBook: [],
        role : localStorage.role || false,
        baseURL:'http://localhost:5000/uploads',
    },
    reducers: {
        setUser(state,action){
            state.user = action.payload.user
            state.role = action.payload.role
        },
        removeUser(state){
            state.user = {}
            state.role = false
        },
        setUserListBook(state,action){
            state.userListBook = action.payload.userListBook
        },
        deleteUserListBook(state,action){
            state.change = action.payload.change

        }
    }
})

export const profileActions = profileSlice.actions

export default profileSlice