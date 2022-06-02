import React, {useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
import {Outlet, Navigate, useNavigate} from 'react-router-dom'

function PrivateRouteSubscribe({element:Component}) {
    const [subsribe,setSubsribe] = useState(false)
    const user = useSelector((state)=>state.profile.user)
    const isLogin = useSelector((state)=>state.auth.isLogin)
    const navigate = useNavigate()
    
    useEffect(() => {
        console.log(isLogin)
        if(isLogin){
            if(user.users){
                if(user.users.userStatus === "Active"){
                    setSubsribe(true)
                } else {
                    navigate('/')
                }
            }
        }else {
            navigate('/')
        }
      
       console.log(subsribe)
    }, [user])

        
    return (
        <Outlet/>
    )
}

export default PrivateRouteSubscribe

