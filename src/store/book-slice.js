import {createSlice} from "@reduxjs/toolkit"

const bookSlice = createSlice({
    name:'book',
    initialState:{
        allBook: [],
        bookDetail: {},
        baseURL: 'http://localhost:5000/uploads/',
        change: "",
    },
    reducers:{
        setBook(state, action){
            state.allBook = action.payload.allBook
        },
        setChange(state,action){
            state.change = action.payload.change
        },
        setDetailBook(state, action){
            state.bookDetail = action.payload.bookDetail
        }
    }
})

export const bookActions = bookSlice.actions

export default bookSlice