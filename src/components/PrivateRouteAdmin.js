import React, { useContext, useState,useEffect } from 'react'
import { useSelector } from 'react-redux';
import {Outlet, Navigate, useNavigate} from 'react-router-dom'

function PrivateRouteAdmin({element:Component}) {
    const isLogin = useSelector((state)=>state.auth.isLogin)
    const role = useSelector((state)=>state.profile.role)
    const navigate = useNavigate()
    console.log(isLogin)
    useEffect(() => {
        if(role){
            localStorage.setItem('role','true')
        } else {
            navigate('/')
        }
     }, [role])
    
     return (
        <Outlet/> 
    )
}

export default PrivateRouteAdmin
