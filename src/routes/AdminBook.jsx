import React, { useEffect,useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import polygon from '../assets/Polygon.png'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBook, getBooks } from '../store/book-action'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import ReactPaginate from 'react-paginate';
import Modal from 'react-modal'
import { bookActions } from '../store/book-slice'

function Items({ books }) {
    const customStyles = useSelector((state)=>state.modal.style)
    const [showModal, setShowModal] = useState(false)
    const dispatch = useDispatch()
    const handleCloseModal = () =>{
        setShowModal(false)
    }
    const handleDelete = async(e,id) => {
        e.preventDefault()
        const response = await dispatch(deleteBook(id))
        console.log(response)
        if(response.status === 200){
            setShowModal(false)
            dispatch(
                bookActions.setChange({
                    change: response.data
                })
            )
        }
    }
    return (
      <div className="tableFixHead">
        <table class="table-auto w-full">
            <thead>
            <tr className="text-left">
                <th>No</th>
                <th>id</th>
                <th>Title</th>
                <th>Author</th>
                <th>Publication Date</th>
                <th>ISBN</th>
                <th>Action</th>
            </tr>
            </thead>
            
            <tbody >
            {books ?
            <>
                    {books.map((data,index)=>(
                    <tr>
                        <td>{index+1}</td>
                        <td>{data.id}</td>
                        <td>{data.title}</td>
                        <td>{data.author}</td>
                        <td>{data.publicationDate}</td>
                        <td>{data.isbn}</td>
                        <td>
                        
                        <div class="dropdown">
                        <img className="cursor-pointer" src={polygon} alt=""/>
                            <div class="dropdown-content">
                                <div>
                                    <Link className="p-3 text-lg hover:bg-green-200 rounded-2xl text-center w-full font-semibold" style={{color:'#0ACF83'}} to ={`/detail-book/${data.id}`} target="_blank">Read Book</Link>
                                </div>
                                <div>
                                    <Link to={`/admin/editbook/${data.id}`} style={{color:'rgb(250 204 21 / var(--tw-text-opacity))'}} className="p-3 hover:bg-yellow-200 rounded-2xl text-lg text-center w-full font-semibold text-yellow-400">Edit</Link>
                                </div>
                                <div>
                                    <button onClick={()=>setShowModal({id:data.id})} className="p-3 text-lg cancel text-center w-full font-semibold" style={{color:'#FF0000'}}>Delete</button>
                                </div>
                            <div>
                            
                        </div>
                        
                        </div>
                        </div>
                        </td>
                </tr>
                
            ))}
            </>
                :
                <>
                <tr>
                    <td colSpan="5">No Book</td>
                </tr>
                </>
                }
            
            </tbody>
        </table>
        <Modal 
            isOpen = {showModal}
            contentLabel = "Request Delete"
            style={customStyles}
            overlayClassName="Overlay"
            onRequestClose = {handleCloseModal}>
                <div className="">
                    <p style={{color:'#D60000'}} className="text-2xl font-bold ">Are you sure to delete book id {showModal ? showModal.id : ""} ?</p>
                    <div className="flex justify-between mt-5">
                        <button onClick={(e)=>handleDelete(e,showModal.id)} className="text-xl shadow-md shadow-green-500 font-semibold text-green-500 bg-green-200 py-1 px-5 rounded-md hover:scale-110">Yes</button>
                        <button onClick={()=>setShowModal(false)} className="text-xl shadow-md shadow-red-500 font-semibold text-red-500 py-1 px-5 rounded-md bg-red-200 hover:scale-110">No</button>
                    </div>
                </div>
        </Modal>   
      </div>
    );
  }

function AdminBook() {
    const dispatch = useDispatch()
    const books = useSelector((state)=>state.book.allBook)
    const booksChange = useSelector((state)=>state.book.change)
    const [currentItems, setCurrentItems] = useState(books);
    const itemsPerPage = 20
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [searchBar, setSearchBar] = useState({
        search : "",
        date: ""
    })
    const {search, date} = searchBar
    const handleChangeSearch = (e) =>{
        setSearchBar({
            ...searchBar,
            [e.target.name]:e.target.value
        })
    }
    

    useEffect(async() => {
        await dispatch(getBooks(searchBar))
    }, [booksChange,searchBar])

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(books.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(books.length / itemsPerPage));
      }, [itemOffset, itemsPerPage,books]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % books.length;
        console.log(
          `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
      };
    
    return (
        <div className="App h-full">
           
        <AdminHeader/>
            <div className="flex justify-center">
                <div className="" style={{width:'1085px',height:'100%'}}>
                <div className="flex justify-between">
                    <p className="font-roman text-2xl font-bold">List Book</p>
                    
                    <Link className="rounded-lg bg-green-200 text-green-500 px-5 py-2 font-bold" to="/admin/addBook">Add Book<FontAwesomeIcon className="ml-3" icon={faPlus}/></Link>
                </div>
                <div className="flex justify-between items-center mb-8 bg-gray-200 p-3 mt-5 rounded-lg">
                        <div className="flex items-center">
                            <input type="text" name="search" value={search} onChange={handleChangeSearch} className="p-3 rounded-2xl shadow-lg shadow-gray-400 w-80" placeholder="Search ID, Title, Author or ISBN"/>
                            <FontAwesomeIcon icon={faSearch} className="ml-3" size="xl" />
                        </div>
                        
                        
                        <div className="flex items-center">
                            <input value={date} onChange={handleChangeSearch} className="p-3 rounded-2xl shadow-lg bg-white shadow-gray-400 w-40" type="date" name="date"/>
                            <FontAwesomeIcon icon={faCalendar} size="xl" className="ml-3"/>
                       </div>
                       
                    </div>
                
                <Items books={currentItems} />
                    <div className="flex justify-center mt-8 mb-5">
                        <p className="font-bold">Results {itemOffset} of {books.length} rows </p>
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel="Next" mb-5
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={pageCount}
                            previousLabel="Previous"
                            renderOnZeroPageCount={null}
                            containerClassName={"pagination"}
                            // subContainerClassName={"pages pagination"}
                            activeClassName={"active"}
                        />
                    </div>   
                </div>
            </div>
        </div>
    )
}

export default AdminBook
