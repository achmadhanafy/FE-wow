import React, { useState,useContext, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import logoIcon from '../assets/logoIcon.png'
import Background from '../assets/Vector1.png'
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom'
import {authActions} from '../store/auth-slice'
import {profileActions} from '../store/profile-slice'
import { API,setAuthToken } from "../config/api";
import success from '../assets/circle-check-solid.png'
import { login, register } from '../store/auth-action';

function LandingPage() {
    const [showSuccess,setShowSuccess] = useState(false)
    const dispatch = useDispatch();
    const [message,setMessage] = useState(null)
    const [showLogin,setShowLogin] = useState(false)
    const [showRegister,setShowRegister] = useState(false)
    const [formRegister,setFormRegister] = useState({
        fullName: "",
        email: "",
        password: "",
    })

    const { fullName, email, password } = formRegister;
    const navigate = useNavigate()
    const handleChange = (e) => {
        setFormRegister({
          ...formRegister,
          [e.target.name]: e.target.value,
        });
        console.log(formRegister);
      };

      const checkAuth = async () => {
        try {
            const response =  await API.get('/profile')
    
            if (response.status == 200){
              console.log(response.data.data.profile.users.role == 'admin');
              if(response.data.data.profile.users.role == 'admin'){
                localStorage.setItem('isLogin','true')
                localStorage.setItem('role','true')                
                dispatch(
                    profileActions.setUser({
                        user: response.data.data.profile,
                        role: true,
                    })
                )

                navigate('/admin')
            } else if(response.data.data.profile.users.role == 'user'){
              localStorage.setItem('isLogin','true')
              
              dispatch(
                  profileActions.setUser({
                      user: response.data.data.profile,
                      role: false,
                  })
              )
            }
            navigate('/home')
              
            } else {
              dispatch(
                profileActions.removeUser()
              )
              dispatch(
                authActions.logout()
              )
            }
          
        } catch (error) {
          dispatch(
            profileActions.removeUser()
          )
          dispatch(
            authActions.logout()
          )
        }
      }

      useEffect(() => {
        if (localStorage.token){
            checkAuth()
        }
      }, [])
      
     
    const HandleLogin = async (e) => {

        try {
            e.preventDefault()

            const data = {
                email: formRegister.email,
                password: formRegister.password
            }
            const response = await dispatch(login(data))
            
            // Notification
            if (response.data.status === "success") {
                setAuthToken(response.data.data.user.token)
                localStorage.setItem('token',response.data.data.user.token)
                
                const response2 =  await API.get(("/profile"))
    
                if (response2.status == 200){
                localStorage.setItem('isLogin','true')
                localStorage.setItem('isLoginId',response.data.data.isLoginId)
                // dispatch({
                //     type:"USER_SUCCESS",
                //     payload: response2.data.data.profile,
                //     loginId: response.data.data.isLoginId,
                //     role: true
                // })
                if(response2.data.data.profile.users.role == 'admin'){
                dispatch(
                    authActions.login({
                        isLoginId: response.data.data.isLoginId,
                        token : response.data.data.user.token
                    })
                )
                
                dispatch(
                    profileActions.setUser({
                        user: response2.data.data.profile,
                        role: true,
                    })
                )
                } else if(response2.data.data.profile.users.role == 'user'){
                    
                    dispatch(
                        authActions.login({
                            isLoginId: response.data.data.isLoginId,
                            token : response.data.data.user.token
                        })
                    )
                    
                    dispatch(
                        profileActions.setUser({
                            user: response2.data.data.profile,
                            role: false,
                        })
                    )
                }

               if(response2.data.data.profile.users.role == 'admin'){
                    navigate('/admin')
                } else if(response2.data.data.profile.users.role == 'user'){
                    navigate('/home')
                }
                
                console.log(response2.data.data.profile.users.role);
                } else {
                dispatch(
                    profileActions.removeUser()
                  )
                  dispatch(
                    authActions.logout()
                  )
                }

            } else {
                setMessage(response.data.error.message)
                setFormRegister({
                    fullName: "",
                    email: "",
                    password: "",
                    });
                console.log("failed");
            }
            

        } catch (error) {
            
            console.log(error);
        }
    }


   

    const HandleSignUp = async (e) => {

        try {
            e.preventDefault()

           const response = await dispatch(register(formRegister))
            console.log(response)
            // Notification
            if (response.data.status === "success") {
                handleCloseRegister()
                setShowLogin(true)
                setShowSuccess(true)

            } else {
                setMessage(response.data.message)
                setFormRegister({
                    fullName: "",
                    email: "",
                    password: "",
                    });
                console.log("failed");
            }

        } catch (error) {
            console.log(error);
        }
    }

   

    const handleShowRegister = () =>{
        setShowRegister(true)
        setShowLogin(false)
    }
    const handleShowLogin = () =>{
        setShowLogin(true)
        setShowRegister(false)
    }

    const handleCloseLogin = () => {
        setShowLogin(false)
        setMessage(null)
        setFormRegister({
            fullName: "",
            email: "",
            password: "",
            });
    }
    const handleCloseRegister = () => {
        setShowRegister(false)
        setMessage(null)
        setFormRegister({
            fullName: "",
            email: "",
            password: "",
            });
        
    }
    const handleCloseSuccess = () =>{
        setShowSuccess(false)
    }
    const customStyles = useSelector((state)=>state.modal.style)
    return (
        <div>
                <div style={{backgroundImage:`url(${Background})`,backgroundSize:'1500px 700px',height:'100vh',backgroundRepeat:'no-repeat'}}>
                    <div className="container">
                        <div className="landingContent pt-16">
                        <img src={logoIcon} width="396px" alt=""/>
                        <p className="text-xl text-justify font-normal" style={{width:'83%'}}>Sign-up now and subscribe to enjoy all the cool and latest books - The best book rental service provider in the World</p>
                        <div className="flex mt-16" style={{width:'90%'}}>
                        <div className="w-2/5 mr-8">
                        <button onClick={handleShowRegister} className="w-full"><div className="bgPrimary button text-white text-lg text-center font-semibold">
                            Sign Up
                            </div></button>
                        <Modal 
                        isOpen = {showRegister}
                        contentLabel = "Form Register"
                        style={customStyles}
                        overlayClassName="Overlay"
                        onRequestClose = {handleCloseRegister}
                        >
                            <div className="App" style={{background:'white'}}>
                                <div className="flex justify-center items-center w-full" style={{height:'70vh'}}>
                                    <div className="registerContent">
                                        <div>
                                        <p className="text-4xl font-bold">Sign Up</p>
                                        <div className="text-red-400 font-semibold mt-3">
                                        {message}
                                        </div>
                                        <form onSubmit={HandleSignUp} action="" className="mt-8">
                                            <input type="text" name="email" onChange={handleChange} value={email} className="formInput bg-gray-200 text-lg" placeholder="Email"/>
                                            <input type="password" name="password" onChange={handleChange} value={password} className="formInput bg-gray-200 text-lg" placeholder="Password"/>
                                            <input type="text" name="fullName" onChange={handleChange} value={fullName}  className="formInput bg-gray-200 text-lg" placeholder="Full Name"/>
                                            <button className="button bgPrimary text-white font-bold text-lg mt-5">Sign Up</button>
                                            <p className="text-lg mt-5 text-gray-600 text-center">Already have an account? Klik <a className="cursor-pointer" onClick={handleShowLogin} > <b>Here</b>
                                                </a></p>
                                        </form>
                                        </div>
                                        
                                    </div>
                                
                                </div>
                            </div>
                        </Modal>
                        
                        </div>
                        <div  className="w-2/5">
                        <button onClick={handleShowLogin} className ="w-full" >
                            <div className="bg-gray-300 button text-black text-lg font-semibold text-center">
                                Sign In
                            </div>
                        </button>
                        <Modal 
                        isOpen = {showLogin}
                        contentLabel = "Form Login"
                        style={customStyles}
                        overlayClassName="Overlay"
                        onRequestClose = {handleCloseLogin}
                        >
                            <div className="App" style={{background:'white'}}>
                                <div className="flex justify-center items-center w-full" style={{height:'70vh'}}>
                                    <div className="registerContent">
                                        <div>
                                        <p className="text-4xl font-bold">Sign In</p>
                                        <div className="text-red-400 font-semibold mt-3">
                                        {message}
                                        </div>
                                        
                                        <form action="" onSubmit={HandleLogin} className="mt-8">
                                            <input type="text" onChange={handleChange} value={email} name="email" id="email" className="formInput bg-gray-200 text-lg" placeholder="Email"/>
                                            <input type="password" onChange={handleChange} value={password} name="password" id="password" className="formInput bg-gray-200 text-lg" placeholder="Password"/>
                                            <button type="submit" className="button bgPrimary text-white font-bold text-lg mt-5">Sign In</button>
                                            <p className="text-lg mt-5 text-gray-600 text-center">Don't have an account ? Klik <a className="cursor-pointer" onClick={handleShowRegister}><b>Here</b></a></p>
                                        </form>
                                        </div>
                                        
                                    </div>
                                
                                </div>
                            </div>
                        </Modal>
                        <Modal 
                        isOpen = {showSuccess}
                        contentLabel = "Form Register"
                        style={customStyles}
                        overlayClassName="Overlay"
                        onRequestClose = {handleCloseSuccess}>
                            <div className="flex justify-center items-center">
                                <img src={success} width="50px" alt=""/> 

                                <div className="text-2xl font-semibold text-gray-500 ml-5">
                                 Register Success
                                </div>
                                
                                
                            </div>
                        </Modal>
                        </div>
                        
                        </div>
                        
                        </div>
                    </div>
                    
                </div>
              
            
        </div>
    )
}

export default LandingPage