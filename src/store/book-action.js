import { API } from "../config/api"
import { bookActions } from "./book-slice"

export const getBooks = ({search, date}) => {
    return async(dispatch) =>{
        try {
            const config = {
                headers:{
                    "Content-type":"application/json",
                }
            }
            const body = JSON.stringify({
                search,
                date
            })            
            const response = await API.post('/books',body,config)
            console.log(response)
            dispatch(
                bookActions.setBook({
                    allBook: response.data.data.results
                })
            )

        } catch (error) {
            console.log(error)
        }
    }
}

export const getBook = (id) => {
    return async(dispatch) =>{
        try {

            const response = await API.get(`/book/${id}`)

            dispatch(
                bookActions.setDetailBook({
                    bookDetail: response.data.data
                })
            )
            
        } catch (error) {
            console.log(error)
        }
    }
}

export const updateBook = (id,data) =>{
    return async(dispatch) => {
        try {
            const config = {
                headers:{
                    "Content-type":"application/json",
                }
            }
            const body = JSON.stringify(data)
            const response = await API.patch(`/book/${id}`,body,config)
            return response
        } catch (error) {
            console.log(error)
        }
    }
}

export const deleteBook = (id) =>{
    return async(dispatch) =>{
        try {
            const response = await API.delete(`/book/${id}`)
            return response
            
        } catch (error) {
            console.log(error)
        }
    }
}

export const addBook = (data,image,image2) => {
    return async(dispatch) =>{
        try {
            const config = {
                headers:{
                    "Content-type": "multipart/form-data",
                }
            }
            const formData = new FormData();
            formData.set("bookFile", image[0], image[0].name);
            formData.set("bookCover",image2[0],image2[0].name)
            formData.set("title", data.title);
            formData.set("publicationDate", data.publicationDate);
            formData.set("pages", parseInt(data.pages));
            formData.set("author", data.author);
            formData.set("isbn", data.isbn);
            formData.set("about", data.about);
            const response = await API.post('/books',formData,config)
            return response
        } catch (error) {
            console.log(error)
        }
    }
}