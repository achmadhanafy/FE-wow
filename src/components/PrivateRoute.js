import React, { useContext,useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {Outlet, Navigate} from 'react-router-dom'


function PrivateRoute({element:Component}) {
    const isLogin = useSelector((state) => state.auth.isLogin)
    return (
        isLogin ? <Outlet/> : <Navigate to="/"/>
    )
}

export default PrivateRoute
