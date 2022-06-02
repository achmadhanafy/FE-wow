import React, { useState,useEffect } from 'react'
import AdminHeader from '../components/AdminHeader'
import clip from '../assets/clip2.png'
import knowledge from '../assets/knowledge2.png'
import success from '../assets/circle-check-solid.png'
import Modal from 'react-modal';
import { API,setAuthToken } from "../config/api";
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { addBook, getBook, updateBook } from '../store/book-action'

function AddBook() {
    const dataBook = useSelector((state)=>state.book.bookDetail)
    const [form,setForm] = useState({
        title:'',
        publicationDate:'',
        pages:'',
        author:'',
        isbn:'',
        about:'',
    })
    const {id} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showModal,setShowModal] = useState(false)
    const [image,setImage] = useState(null)
    const [image2,setImage2] = useState(null)
    const customStyles = useSelector((state)=>state.modal.style)

    let {title,publicationDate,pages,author,isbn,about} = form

    useEffect(async() => {
        await dispatch(getBook(id))
    }, [])
    useEffect(() => {
        console.log(dataBook)
       if(id){
        let {title,fullDatePublication,pages,author,isbn,about} = dataBook
           setForm({
            title:title,
            publicationDate:fullDatePublication,
            pages:pages,
            author:author,
            isbn:isbn,
            about:about,
           })
       }
    }, [dataBook])

    const handleChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        });
        console.log(form);
      };
    const handleCloseModal = () => {
        setShowModal(false)
    }
    
      const handleImage = () => {
        setImage(document.getElementById('bookFile').files)
    }
    const handleImage2 = () => {
        setImage2(document.getElementById('bookCover').files)
    }
    const handleSubmit = async (e) => {
        if(!id){
            try {
                e.preventDefault()
                setAuthToken(localStorage.token)
                const response = await dispatch(addBook(form,image,image2))
                console.log(response.data);
                if(response.status === 200){
                    setShowModal(true)
                    setForm({
                        title:'',
                        publicationDate:'',
                        pages:'',
                        author:'',
                        isbn:'',
                        about:'',
                    })
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            e.preventDefault()
            try {
                const response  = await dispatch(updateBook(id,form,image,image2))
                if(response.status === 200){
                    setShowModal(true)
                    setTimeout(() => {   
                        navigate('/admin/book');  
                    }, 1000);
                    
                }
            } catch (error) {
                console.log(error)
            }
           
        }
        
    }

    return (
        <div className="App h-full pb-8">
            <AdminHeader/>
            <div className="flex justify-center w-full">
                <div className="w-3/5">
                    <div className="flex justify-start mb-8">
                        <p className="text-3xl font-roman font-bold text-left">{id ? "Edit Book" : "Add Book"}</p>
                    </div>
                    <form onSubmit={handleSubmit} action="">
                        <input required onChange={handleChange} value={title} type="text" name="title" id="title" placeholder="Title" className="text-lg bg-gray-200 text-black p-2 mt-3 formInput" />
                        <input required onChange={handleChange} value={publicationDate} type="date" name="publicationDate" id="publicationDate" placeholder="Publication Date" className="text-lg bg-gray-200 text-black p-2 mt-3 formInput" />
                        <input required onChange={handleChange} value={pages} type="text" name="pages" id="pages" placeholder="Pages" className="text-lg bg-gray-200 text-black p-2 mt-3 formInput" />
                        <input required onChange={handleChange} value={author} type="text" name="author" id="author" placeholder="Author" className="text-lg bg-gray-200 text-black p-2 mt-3 formInput" />
                        <input required onChange={handleChange} value={isbn} type="text" name="isbn" id="isbn" placeholder="ISBN" className="text-lg bg-gray-200 text-black p-2 mt-3 formInput" />
                        <textarea required onChange={handleChange} value={about} className="resize-none formInput bg-gray-200 text-lg" name="about" id="about" cols="30" rows="5"></textarea>
                        {id ? <></> :  <label className="text-gray-500 text-lg mr-3 border border-gray-500 rounded-md p-3 bg-gray-200" htmlFor="file">
                           Upload Book File
                        </label> }
                       
                        {id ? <></> : <input required onChange={handleImage} type="file" id="bookFile" name="bookFile"/> }
                        <div className="mt-8">
                            {id ? <></> : <label className="text-gray-500 text-lg mr-3 border border-gray-500 rounded-md p-3 bg-gray-200" htmlFor="file">
                            Upload Cover
                            </label> }
                            
                            {id  ? <></> :  <input required onChange={handleImage2} type="file" id="bookCover" name="bookCover"/> }
                        </div>
                        
                        <div className="flex justify-end w-full">
                            <button className="text-white text-lg font-semibold button flex items-center" style={{width:id ? "25%" : "20%" ,paddingLeft:'10px',background:'#FF0000'}}>{id ? "Update Book" : "AddBook" }
                            <img src={knowledge} className="ml-8" alt=""/>
                            </button>
                        </div>
                    </form>
                </div>
                <Modal 
                        isOpen = {showModal}
                        contentLabel = "Add Book Success"
                        style={customStyles}
                        overlayClassName="Overlay"
                        onRequestClose = {handleCloseModal}>
                            <div className="flex justify-center items-center">
                                <img src={success} width="50px" alt=""/> 

                                <div className="text-2xl font-semibold text-gray-500 ml-5">
                                    {id ? "Update Book Success" : "Add Book Success"}
                                </div>
                                
                                
                            </div>
                        </Modal>
               
            </div>
        </div>
    )
}

export default AddBook
