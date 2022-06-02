import {configureStore} from "@reduxjs/toolkit"
import authSlice from './auth-slice'
import bookSlice from './book-slice'
import modalSlice from "./modal-slice"
import profileSlice from './profile-slice'
import transactionSlice from './transaction-slice'
import userSlice from "./user-slice"

const store = configureStore({
    reducer:{
        auth: authSlice.reducer,
        book: bookSlice.reducer,
        profile: profileSlice.reducer,
        transaction: transactionSlice.reducer,
        modal: modalSlice.reducer,
        user: userSlice.reducer
    }
})

export default store