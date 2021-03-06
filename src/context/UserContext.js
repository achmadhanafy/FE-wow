import React, {createContext,useReducer,useEffect} from 'react'
import { API } from "../config/api";

export const UserContext = createContext()

const initialState = {
    isLogin: localStorage.isLogin || false,
    user: {},
    isLoginId: localStorage.isLoginId || null,
    baseURL:'http://localhost:5000/uploads',
    role: localStorage.role || false
}

const reducer = (state,action) => {
    const {type,payload,loginId,role} = action
    switch(type){
        case 'LOGIN':
            localStorage.setItem("token",payload.token)
            return{
                
            }
        case 'USER_SUCCESS':
            return{
                isLogin:true,
                user:payload,
                isLoginId: loginId,
                baseURL:'http://localhost:5000/uploads',
                role: role
            }
        case 'LOGOUT':
            localStorage.clear();
            return{
                isLogin:false,
                user:{}
            }
            case 'SUBSCRIBE':
                return{
                    isLogin: JSON.parse(localStorage.getItem('isLogin')),
                    user: payload
                }
                case "AUTH_ERROR":
                    localStorage.removeItem("token");
                    return {
                        isLogin: false,
                        user: {},
                    };
        default:
            throw new Error()
    }
}

export const UserContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(reducer, initialState)
    
    return (
        <UserContext.Provider value={[state,dispatch]}>
            {children}
        </UserContext.Provider>
    )
}