import React from 'react'
import userImage from '../assets/foto.jpg'
import { Link} from 'react-router-dom'
import knowledge from '../assets/knowledge.png'
import logoutImage from '../assets/logout2.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faNoteSticky, faUser } from '@fortawesome/free-solid-svg-icons'
import logo from '../assets/Icon.png'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/auth-action'

function AdminHeader() {
    const isLoginId = useSelector((state)=>state.auth.isLoginId)
    const dispatch = useDispatch()

    const handleLogout = async (e) =>{
           dispatch(logout(isLoginId))
        }
    return (
        <div className="flex w-full">
                <div className="w-2/4">
                    <img className="ml-24 mb-8 pt-5" src={logo} width="100px" alt=""/>
                </div>
                <div className="w-2/4 flex justify-end">
                <div class="dropdown">
                <img className="mr-36 rounded-full shadow-xl mb-5 mt-5" src={userImage} width="60px"style={{height:'60px',border:'2px solid black'}} alt=""/>
                    <div class="dropdown-content">
                        <div>
                            <Link to="/admin/book"><div className="p-3 rounded-md flex items-center">
                                <FontAwesomeIcon icon={faBook} size="lg"/>
                                <p className="text-lg font-semibold ml-3">
                                    Book
                                </p>
                                </div>
                            </Link>
                        </div>
                        <div>
                            <Link to="/admin/transaction"><div className="p-3 rounded-md flex items-center">
                                <FontAwesomeIcon icon={faNoteSticky} size="lg"/>
                                <p className="text-lg font-semibold ml-3">
                                    Transacation
                                </p>
                                </div>
                            </Link>
                        </div>
                         <div>
                            <Link to="/admin/user"><div className="p-3 rounded-md flex items-center">
                                <FontAwesomeIcon icon={faUser} size="lg"/>
                                <p className="text-lg font-semibold ml-3">
                                    User
                                </p>
                                </div>
                            </Link>
                        </div>
                        
                        <div style={{borderTop:'3px solid gray'}}>
                            <button onClick={handleLogout}><div className="p-3 rounded-md flex">
                                <img src={logoutImage} width="35px" alt=""/>
                                <p className="text-lg font-semibold ml-3">
                                    logout
                                </p>
                                </div></button>
                        </div>
                                    
                    </div>
                </div>
                   
                </div>
            
            </div>
    )
}

export default AdminHeader
