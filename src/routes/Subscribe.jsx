import React, {useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import FormSubscribe from '../components/FormSubscribe'
import { useSelector } from 'react-redux'


function Subscribe() {
    const [userStatus,setUserStatus] = useState(null)
    const user = useSelector((state)=>state.profile.user)
    useEffect(() => {
        if(user.users){
            if(user.users.userStatus == 'Active'||user.users.userStatus == 'Pending'){
                setUserStatus(true)
            } else{
                setUserStatus(null)
            }
        }
        
    }, [user])
    
    console.log(userStatus);
    const popUpSuccess = () =>{
            if (user.users?.userStatus == 'Active'){
                return (
                    <div className="text-lg text-center mb-8 bg-white p-3 rounded-md" style={{color:'#29BD11'}}>
                        Your Success for subscribing to premium, your premium package is activated. Thank you for subscribing 
                    </div>
                )
            } else if(user.users?.userStatus == 'Pending'){
                return(
                    <div className="text-lg text-center mb-8 bg-white p-3 rounded-md" style={{color:'#29BD11'}}>
                        Thank you for subscribing to premium. Your premium package will be active after our admin approve your transaction. Thank you
                    </div>
                )
            }   
    }
    
    return (
        <div className="App">
            <div className="flex justify-center py-8 px-16" style={{width:'100%'}}>
                <div className="flex justify-start">
                    <Sidebar userName="Achmad Hanafy"/>
                </div>
                <div style={{width:'100%',height:'90vh'}}>
                    <div className="flex justify-center items-center w-3/4" style={{marginLeft:'20%',height:'100%'}}>
                        <div className="text-center w-2/4">
                            {userStatus ?
                            popUpSuccess() : <FormSubscribe/>
                        }
                            
                        </div>
                    
                    </div>
                    
                </div>
            </div>
        </div>
    
    )
}

export default Subscribe
