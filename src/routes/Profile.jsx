import React,{useState,useEffect} from 'react'
import Sidebar from '../components/Sidebar'
import mail from '../assets/mail.png'
import gender from '../assets/gender.png'
import phone from '../assets/phone.png'
import location from '../assets/location.png'
import book1 from '../assets/book2.png'
import CardBook from '../components/CardBook'
import {Link} from 'react-router-dom'
import minus from "../assets/circle-minus-solid.png"
import {deleteUserListBook, getUserListBooks} from "../store/profile-action.js"
import { useSelector,useDispatch } from 'react-redux'
import { API, configJson } from '../config/api'
import Modal from "react-modal"

function Profile() {
    const user = useSelector((state)=>state.profile.user)
    const dispatch = useDispatch()
    const [email,setEmail] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const change = useSelector((state)=>state.profile.change)
    const customStyles = useSelector((state)=>state.modal.style)
    const userListBook = useSelector((state)=>state.profile.userListBook)
    console.log(user)
    const baseURL = useSelector((state)=>state.profile.baseURL)
    
    const handleCloseModal = () =>{
        setShowModal(false)
    }

    const handleDeleteList = async(e,id) => {
        const res = await dispatch(deleteUserListBook(e,id))
        if(res.status === 200){
            setShowModal(false)
        }
    }
    useEffect(() => {
        if (user.users){
            setEmail(user.users.email)
        }

    }, [user])
    useEffect(async() => {
        await dispatch(getUserListBooks())
    }, [change])
    // console.log(state.user.users.email);
    return ( 
        <div className="App">
            <div className="flex justify-center py-8 px-16" style={{width:'100%'}}>
                <div className="flex justify-start">
                    <Sidebar userName="Achmad Hanafy"/>
                </div>
                <div style={{width:'100%'}}>
                    <div className="flex justify-start items-center w-3/4 mt-5" style={{marginLeft:'20%',height:'100%'}}>
                       <div className="w-full">
                        <p className="font-roman font-bold text-3xl mb-5">Profile</p>
                        <div className="flex items-center w-full rounded-lg bg-white p-5">
                            <div className="w-3/5">
                                <div className="flex items-center mb-5">
                                <img src={mail} alt=""/>
                                <div>
                                    <p className="text-black text-lg font-semibold ml-5">{email}</p>
                                    <p className="text-gray-500 text-lg ml-5">Email</p>
                                </div>
                                </div>

                                <div className="flex items-center mb-5">
                                <img src={gender} alt=""/>
                                <div>
                                    <p className="text-black text-lg font-semibold ml-5">{user.gender}</p>
                                    <p className="text-gray-500 text-lg ml-5">Gender</p>
                                </div>
                                </div>

                                <div className="flex items-center mb-5">
                                <img src={phone} alt=""/>
                                <div>
                                    <p className="text-black text-lg font-semibold ml-5">{user.phone}</p>
                                    <p className="text-gray-500 text-lg ml-5">Mobile Phone</p>
                                </div>
                                </div>

                                <div className="flex items-center">
                                <img src={location} alt=""/>
                                <div>
                                    <p className="text-black text-lg font-semibold ml-5">{user.address}</p>
                                    <p className="text-gray-500 text-lg ml-5">Address</p>
                                </div>
                                </div>
                            </div>

                            <div className="flex justify-end w-2/5 mr-5">
                                <div style={{width:'211px'}}>
                                    <img src={`${baseURL}/${user.image}`} style={{height:'210px'}} className="rounded-md" width="100%" alt=""/>
                                    <Link to="/profile/edit"><div className="w-full bgPrimary text-white text-lg text-center button mt-3 font-semibold">
                                        Edit Profile
                                        </div></Link>
                                </div>
                            </div>
                       </div>
                       
                       <p className="text-3xl text-black font-bold font-roman mt-16 mb-16">My List Book</p>
                            <div className="grid grid-cols-4 gap-4">
                            <Modal
                                isOpen = {showModal}
                                contentLabel = "alert"
                                style ={customStyles}
                                overlayClassName = "Overlay"
                                onRequestClose = {handleCloseModal}
                                >
                                <div class="alert text-2xl">
                                    <p>Did you want to unlist the book ?</p>
                                </div>
                                <div className="flex justify-center text-2xl">
                                    <button className="mr-5 bg-blue-500 px-5 rounded-md py-2 text-white" onClick={(e)=>handleDeleteList(e,showModal.id)}>Yes</button>
                                    <button onClick={()=>{setShowModal(false)}} className="bg-red-500 px-5 rounded-md py-2 text-white">No</button>
                                </div>
                                
                            </Modal>
                                {userListBook.map((data)=>(
                                    <div className="static">
                                        <button onClick={()=>{setShowModal({
                                            id:data.id
                                        })}}  className="absolute ml-5 mt-1"><img className="hover:scale-125" width="30px" src={minus}/></button>
                                        <CardBook bookId={data.id} image={`${baseURL}/${data.bookCover}`} bookName={data.title} bookWriter={data.author}/>
                                    </div>
                                ))}
                            </div>
                       </div>
                    </div>
                    
                </div>
            </div>
        </div>
        
    ) 
}

export default Profile
