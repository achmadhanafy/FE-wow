import { API } from "../config/api"
import { userActions } from "./user-slice"

export const getUsers = (data) =>{
    return async(dispatch)=>{
        try {
            const config = {
                headers:{
                    "Content-type":"application/json",
                }
            }

            const body = JSON.stringify(data)
            const res = await API.post('/users',body,config)
            dispatch(
                userActions.setUsers({
                    users: res.data.data.users
                })
            ) 
            
        } catch (error) {
            console.log(error)
        }
    }
}