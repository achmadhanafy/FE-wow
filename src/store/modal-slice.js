import {createSlice} from "@reduxjs/toolkit"

const modalSlice = createSlice({
    name:'modal',
    initialState:{
        style: {
            content: {
              top: '50%',
              left: '50%',
              paddingRight:'30px',
              paddingLeft:'30px',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              borderRadius:'10px',
              transform: 'translate(-50%, -50%)',
            },
          },
    },
    
})

export const modalActions = modalSlice.actions

export default modalSlice