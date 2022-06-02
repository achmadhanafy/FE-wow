import { API } from "../config/api"
import { profileActions } from "./profile-slice"

export const getUserListBooks = () =>{
    return async(dispatch) =>{
        try {

            const response = await API.get('/userlistbook')
            if(response.status === 200){
                dispatch(
                    profileActions.setUserListBook({
                        userListBook:response.data.data
                    })
                )
            }
            
        } catch (error) {
            console.log(error)
        }
    }
}

export const deleteUserListBook = (e,id) =>{
    return async(dispatch) =>{
        e.preventDefault()
        try {
            const config=  {
                headers: {
                "Content-type": "application/json",
              },
              }
            const body = JSON.stringify({
                bookId:id
            })
            const res = await API.post('/userlistbook',body,config)
           dispatch(
               profileActions.deleteUserListBook({
                   change: res
               })
           )
           return res
            
        } catch (error) {
            console.log(error)
        }
    }
}