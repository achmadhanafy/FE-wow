import React, { useEffect, useState } from 'react'
import CardBook from '../components/CardBook'
import HeaderCard from '../components/HeaderCard'
import Sidebar from '../components/Sidebar'
import { API } from '../config/api'
import { useDispatch, useSelector } from 'react-redux'
import { bookActions } from '../store/book-slice'
import { getBooks } from '../store/book-action'

function Home() {
    const books = useSelector((state)=>state.book.allBook)
    const baseURL = useSelector((state)=> state.profile.baseURL)
    const dispatch = useDispatch()

    useEffect(async() => {
        await dispatch(getBooks())
    }, [])
    console.log(books)
    return (
        <div className="App">
             <div className="flex justify-center py-8 px-16" style={{width:'100%'}}>
            <div className="flex justify-start">
                <Sidebar/>
            </div>
            <div className="flex justify-end" style={{width:'100%'}}>
                <div>
                
                <HeaderCard/>
                <div id="demo" className="fixed" style={{top:'10px'}}></div>
                <p className="text-4xl my-5 font-semibold font-roman ml-5">List Book</p>
                <div className="grid grid-cols-4 gap-4">
                    {books.map((data,index)=>(
                        <CardBook bookId={data.id} image={`${baseURL}/${data.bookCover}`} bookName={data.title} bookWriter={data.author}/>
                    ))}
                </div>
                </div>
                
            </div>
        </div>
        
        </div>
       
    )
}

export default Home
