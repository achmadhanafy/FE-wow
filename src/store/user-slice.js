import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name : "user",
    initialState : {
        users : [],
    },
    reducers:{
        setUsers(state,action){
            state.users = action.payload.users
        }
    }
})

export const userActions = userSlice.actions

export default userSlice