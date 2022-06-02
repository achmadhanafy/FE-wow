import React,{useState,useRef,useEffect} from 'react'
import logo from '../assets/Icon.png'
import screen from '../assets/BookScreen.png'
import { ReactReader,ReactReaderStyle } from "react-reader"
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'

function ReadBook() {
    const style = {
        ...ReactReaderStyle,
        arrow: {
          ...ReactReaderStyle.arrow,
          //
        }
      }
    
    const params = useParams()
    const fileURL = useSelector((state)=>state.book.baseURL) + params.id
    console.log(fileURL)
    console.log(params)
    const [bookUrl,setBookUrl] = useState(null)
    const locationChanged = (epubcifi) =>{
        setBookUrl(epubcifi)
    }
    const [size, setSize] = useState(100)
    const renditionRef = useRef(null)
    const changeSize = (newSize) => {
        setSize(newSize)
    }
    useEffect(() => {
        if (renditionRef.current) {
        renditionRef.current.themes.fontSize(`${size}%`)
        }
    }, [size])
    return (
        <div className="App">
            <img className="ml-24 mb-8 pt-5" src={logo} width="100px" alt=""/>
            <div className="flex justify-center pb-5">
            <div style={{height:'78vh',width:'90vw'}}>
            <ReactReader
            showToc = {false}
            location={bookUrl}
            locationChanged={locationChanged}
            url={fileURL}
            title="Book Example"
            getRendition={(rendition) => {
                renditionRef.current = rendition
                renditionRef.current.themes.fontSize(`${size}%`)
              }}
            />
            </div>
            <div style={{ position: 'absolute', bottom: '2rem', right: '5rem', zIndex: 1}} className="bg-gray-300 rounded-md p-1">
            <button className="font-bold" onClick={() => changeSize(Math.max(80, size - 10))}>-</button>
            <span> Toggle font size: {size}% </span>
            <button className="font-bold" onClick={() => changeSize(Math.min(130, size + 10))}>+</button>
            </div>
            </div>
            
           
            
            
        </div>
    )
}

export default ReadBook
