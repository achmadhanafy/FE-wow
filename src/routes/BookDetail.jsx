import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import userImage from '../assets/foto.jpg'
import bookmark from '../assets/bookmark.png'
import Modal from 'react-modal'
import arrow from '../assets/V.png'
import { Link } from 'react-router-dom'
import { API, setAuthToken } from '../config/api'
import { useDispatch, useSelector } from 'react-redux'
import { bookActions } from '../store/book-slice'
import { getBook } from '../store/book-action'

function BookDetail() {
    const params = useParams()
    const customStyles = useSelector((state)=>state.modal.style)
    const [showModal,setShowModal] = useState(false)
    const [status, setStatus] = useState(false)
    const book = useSelector((state)=>state.book.bookDetail)
    const baseURL = useSelector((state)=>state.profile.baseURL)
    const dispatch = useDispatch()
    const [message, setMessage] = useState("")
    
    useEffect(async() => {
        await dispatch(getBook(params.id))
        }, [])

    const handleAddToList = async(e) => {
        e.preventDefault()
        try {
            const config = {
                headers:{
                    "Content-type": "application/json",
                }
            }
            const body = JSON.stringify({
                bookId:params.id
            })

            const response  = await API.post('/addtolist',body,config)
            console.log(response)
            if(response.data.status === "success"){
                setStatus(true)
                setMessage("Success add to list book")

            } else {
                setStatus(false)
                setMessage(response.data.message)
            }
            setShowModal(true)
            
        } catch (error) {
            console.log(error)
        }
    }

    const handleCloseModal = () =>{
        setShowModal(false)
    }

    console.log(book)
    return (
        book ? ( <div className="App">
            <Modal
            isOpen = {showModal}
            contentLabel = "alert"
            style ={customStyles}
            overlayClassName = "Overlay"
            onRequestClose = {handleCloseModal}
            >
                <div class={`${status ? "success" : "alert"} text-2xl`}>
                    {message}
                </div>
            </Modal>
        <div className="flex justify-center py-8 px-16" style={{width:'100%'}}>
       <div className="flex justify-start">
           <Sidebar userImage={userImage} userName="Achmad Hanafy"/>
       </div>
       <div className="flex justify-end" style={{width:'100%'}}>
           <div className="bookDetail pt-16">
               <div className ="flex">
                   <img src={`${baseURL}/${book.bookCover}`}width="379px" alt=""/>
                   <div className="ml-8">
                       <div className="font-roman">
                       <p className="text-6xl font-bold mb-3">{book.name}</p>
                       <p className="text-gray-500 text-2xl">{book.author}</p>
                       </div>
                       <br/>
                       <p className="text-black text-2xl font-semibold mt-8">Publication date</p>
                       <p className="text-gray-500 text-2xl">{book.publicationDate}</p>
                       <br/>
                       <p className="text-black text-2xl font-semibold mt-8">Pages</p>
                       <p className="text-gray-500 text-2xl">{book.pages}</p>
                       <br/>
                       <p className="textColorRed text-2xl font-semibold mt-8">ISBN</p>
                       <p className="text-gray-500 text-2xl">{book.isbn}</p>
                       
                   </div>
               </div>
               <div className="font-roman mt-24">
                   <p className="text-3xl font-bold">About This Book</p>
                   <br/>
                   <p className="text-gray-500 text-lg text-justify">
                   {book.about}
                   </p>
               </div>
               <div className="flex justify-end mt-8">
                   <button onClick={handleAddToList} className="buttonSecondary w-40 flex items-center text-white font-semibold bgPrimary text-lg mr-5">Add My List <img src={bookmark} style={{height:'20px',marginLeft:'20px'}} width="20px" alt=""/></button>
                   <Link to={`/read/${book.bookFile}`}> <div className="buttonSecondary w-40 flex items-center text-black font-semibold bg-gray-300 text-lg">Read Book <img src={arrow} style={{height:'20px',marginLeft:'20px'}} width="18px" alt=""/></div> </Link>
               </div>
           </div>
           
       </div>
      
   </div>
   
   </div>):(
       <div>Not FOund</div>
   )
       
       
       
    )
}

export default BookDetail
