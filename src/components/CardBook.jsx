import React, { useContext, useState } from 'react'
import { useNavigate} from 'react-router-dom'
import {UserContext} from '../context/UserContext'
import Modal from 'react-modal'
import { useSelector } from 'react-redux';

function CardBook(props) {
    const customStyles = useSelector((state)=>state.modal.style)
    const [showModal,setShowModal] = useState(false)
    const user  = useSelector((state)=>state.profile.user)
    const navigate = useNavigate()
    const handleDetailBook = () =>{
        if (user.users.userStatus == "Active"){
            navigate(`/detail-book/${props.bookId}`)
        } else if(showModal == false){
            setShowModal(true)
        }
    }
    const handleCloseModal = () =>{
        setShowModal(false)
    }
    console.log(showModal);
    return (
        
        <div>
            <button onClick={handleDetailBook}>
            <Modal
            isOpen = {showModal}
            contentLabel = "alert"
            style ={customStyles}
            overlayClassName = "Overlay"
            onRequestClose = {handleCloseModal}
            >
                <div class="alert text-2xl">
                    Please make a payment to read the latest books.
                </div>
            </Modal>
            <div style={{width:'190px'}} className=" ml-5">
                <img src={props.image} width="100%" style={{height:"256px"}} alt=""/>
                <p className="text-2xl font-semibold mt-3 text-left font-roman">{props.bookName}</p>
                <p className="text-lg text-gray-500 font-light text-left">{props.bookWriter}</p>
            </div>
            </button>
            
        </div>
        
    )
}

export default CardBook
