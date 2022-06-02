import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdminHeader from '../components/AdminHeader'
import { getUsers } from '../store/user-action'
import polygon from '../assets/Polygon.png'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Modal from 'react-modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

function Items({ users,offset }) {
    const [showModal, setShowModal] = useState(false)
    const customStyles = useSelector((state)=>state.modal.style)

    const handleCloseModal = () =>{
        setShowModal(false)
    }
    return (
      <div className="tableFixHead">
        <table class="table-auto w-full mt-3">
            <thead>
                <tr className="text-left">
                    <th style={{width:100}}>No</th>
                    <th style={{width:100}}>id</th>
                    <th style={{width:'400px'}}>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th style={{width:'200px'}}>Action</th>
                </tr>
            </thead>
                       
            <tbody>
            {users ?
            <>
                    {users.map((data,index)=>(
                    <tr>
                        <td style={{width:100}}>{offset+index+1}</td>
                        <td style={{width:100}}>{data.id}</td>
                        <td className="email" style={{width:'400px'}}>{data.email}</td>
                        <td className={data.role === "admin" ? "text-blue-500" : "text-green-500"}>{data.role}</td>
                        <td className={data.userStatus === "Active" ? "text-green-500" : "text-red-500"}>{data.userStatus === "" ? "Not Active" : data.userStatus}</td>
                        <td className="action" style={{width:'200px'}}>
                        <div class="dropdown">
                            <img className="cursor-pointer" src={polygon} alt=""/>
                            <div class="dropdown-content fixed">
                                <div>
                                <button onClick={()=>setShowModal(true)} className="p-3 hover:bg-yellow-200 rounded-2xl text-lg text-center w-full font-semibold text-yellow-400">Change Password</button>
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
                    <td colSpan="5">No Transaction</td>
                </tr>
                </>
                }
            
            </tbody>
        </table>   
        <Modal 
            isOpen = {showModal}
            contentLabel = "Change Password"
            style={customStyles}
            overlayClassName="Overlay"
            onRequestClose = {handleCloseModal}>
                <div style={{width:'500px'}}>
                    <p style={{color:'#D60000'}} className="text-2xl font-bold text-center">Change Password</p>
                    <hr style={{backgroundColor:'#D60000',height:'2px'}} className="mb-12" />
                    <form>
                        <div className="flex justify-between items-center">
                            <label className="text-xl font-semibold" htmlFor="password">Password</label>
                            <input style={{width:'60%',marginBottom:'0px'}} id="password" name="password" type="password" placeholder="Enter Password" className="formInput"/>
                        </div>
                        <div className="flex justify-between items-center mt-3">
                            <label className="text-xl font-semibold" htmlFor="confirmPassword">Confirm Password</label>
                            <input style={{width:'60%',marginBottom:'0px'}} id="confirmPassword" name="password" type="password" placeholder="Enter Confirm Password" className="formInput"/>
                        </div>
                        <input className="mt-3" onClick={()=>{
                            const password = document.getElementById("password")
                            const confirmPassword = document.getElementById("confirmPassword")
                            if(password.type === "password"){
                                password.type = "text"
                                confirmPassword.type = "text"
                            } else {
                                password.type = "password"
                                confirmPassword.type = "password"
                            }
                        }} type="checkbox"/> Show Password

                        <div className="mt-5">
                            <button className="button bgPrimary shadow-md shadow-red-500 text-white font-semibold">Submit</button>
                        </div>
                        
                    </form>
                </div>
        </Modal>   
          
      </div>
    );
  }

function AdminUser() {
    const users = useSelector((state)=>state.user.users)
    const dispatch = useDispatch()
    const [currentItems, setCurrentItems] = useState(users);
    const itemsPerPage = 20
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [searchBar, setSearchBar] = useState({
        search:"",
        role:"",
        status:""
    })

    const {search,role,status} = searchBar

    const handleChangeSearch = (e) =>{
        setSearchBar({
            ...searchBar,
            [e.target.name]:e.target.value
        })
    }

    
    useEffect(async() => {
        console.log(itemOffset)
        await dispatch(getUsers(searchBar))
     }, [searchBar])

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(users.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(users.length / itemsPerPage));
      }, [itemOffset, itemsPerPage,users]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % users.length;
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
                    <p className="font-roman text-3xl font-bold mb-5">Users</p>
                    <div className="flex justify-between items-center mb-8 bg-gray-200 p-3 rounded-lg">
                        <div className="flex items-center">
                            <input value={search} onChange={handleChangeSearch} type="text" name="search" className="p-3 rounded-2xl shadow-lg shadow-gray-400 w-80" placeholder="Search ID or Email"/>
                            <FontAwesomeIcon icon={faSearch} className="ml-3" size="xl" />
                        </div>
                        
                        
                        <select value={role} onChange={handleChangeSearch} name="role" className="p-3 rounded-2xl shadow-lg bg-white shadow-gray-400 w-40" id="role">
                            <option value="" selected disabled hidden>Role</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                        <select value={status} onChange={handleChangeSearch} name="status"  className="p-3 rounded-2xl shadow-lg bg-white shadow-gray-400 w-40" id="status">
                            <option value="" selected disabled hidden>Status</option>
                            <option value="Active">Active</option>
                            <option value="Not Active">Not Active</option>
                        </select>
                    </div>
                    
                    
                    <Items users={currentItems} offset={itemOffset} />
                    <div className="flex justify-center items-center mt-8 mb-5">
                        <p className="font-bold">Results {itemOffset} of {users.length} rows </p>
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

export default AdminUser
