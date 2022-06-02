import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { API } from "../config/api";
import { authActions } from "./auth-slice";
import { profileActions } from "./profile-slice";

export const register = (data) => {
    return async (dispatch) => {
        try {
            //config
            const config = {
                headers:{
                    "Content-type":"application/json"
                }
            }
            //Data body
            const body = JSON.stringify(data)

             // Insert data user to database
            const response = await API.post("/register", body, config);
            console.log(response)
            return response
            

        } catch (error) {
            console.log(error);
        }
    }
}

export const login = (data) => {
    return async (dispatch) => {
        try {

            //config
            const config = {
                headers:{
                    "Content-type":"application/json"
                }
            }
            //Data body
            const body = JSON.stringify(data)
                // Insert data user to database
            const response = await API.post("/login", body, config);
            return response
            
        } catch (error) {
            console.log(error)
        }
         
    }
}

export const logout = (isLoginId) => {
    return async (dispatch,navigate) =>{
        try {

            //config
            await API.delete(`logout/${isLoginId}`)
            dispatch(
                profileActions.removeUser()
              )
              dispatch(
                authActions.logout()
              )
            localStorage.clear()
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }
}