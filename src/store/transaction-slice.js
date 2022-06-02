import {createSlice} from "@reduxjs/toolkit"

const transactionSlice = createSlice({
    name:'transaction',
    initialState:{
        allTransaction:[],
        active:false
    },
    reducers: {
        setTransaction(state,action){
            state.allTransaction = action.payload.transaction
        },
        setActive(state, action){
            state.active = action.payload.active
        }
    }
})

export const transactionActions = transactionSlice.actions

export default transactionSlice