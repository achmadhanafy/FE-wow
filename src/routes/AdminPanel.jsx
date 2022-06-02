import React, {useEffect,useState} from 'react'
import polygon from '../assets/Polygon.png'
import {useNavigate} from 'react-router-dom'
import AdminHeader from '../components/AdminHeader'
import { API,setAuthToken } from '../config/api'
import {transactionActions} from '../store/transaction-slice' 
import { useDispatch, useSelector } from 'react-redux'
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBill, faSearch,faUser } from '@fortawesome/free-solid-svg-icons'
import { getTransactions, updateTransaction } from '../store/transaction-action'

function Items({ transaction }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    async function handleCancel(e,id){
        e.preventDefault()
        const data = {
            paymentStatus:'Cancel',
            useStatus:'Not Active',
            remainingActive:0
        }
        const response = await dispatch(updateTransaction(id,data))
        if(response.status === 200){
            navigate('/admin/transaction')
        }
    }
    function statusPayment(paymentStatus){
        if (paymentStatus === 'Approved'){
            return{color:'#0ACF83'}
        } else if (paymentStatus == "Cancel") {
            return {color:'#FF0742'}
        } else {
           return {color:'#F7941E'}
        }
    }
    async function handleApprove(e,id){
        const data = {
            paymentStatus:'Approved'
        }

        const response  = await dispatch(updateTransaction(id,data))
        if(response.status === 200){
            navigate('/admin/transaction')
        }
      }
      function userStatus(status){
        if (status === 'Active'){
            return{color:'#0ACF83'}
            
        } else {
            return{color:'#FF0742'}
            
        }
    }
    return (
      <div className="tableFixHead">
         <table class="table-auto">
             <thead>
             <tr className="text-left">
                <th style={{width:100}}>Id</th>
                <th>User</th>
                <th>Bukti Transfer</th>
                <th>Remaining Active</th>
                <th>Status User</th>
                <th>Status Payment</th>
                <th>Action</th>
            </tr>
             </thead>
            
            <tbody>
            {transaction ?
            <>
                    {transaction.map((data)=>(
                    <tr>
                    <td style={{width:100}}>{data.id}</td>
                    <td>{data.users.fullName}</td>
                    <td>{data.transferProof}</td>
                    <td>{data.remainingActive} Days</td>
                    <td style={userStatus(data.userStatus)}>{data.userStatus}</td>
                    <td style={statusPayment(data.paymentStatus)}>{data.paymentStatus}</td>
                    <td>
                    <div class="dropdown">
                    <img className="cursor-pointer" src={polygon} alt=""/>
                        <div class="dropdown-content">
                        <div>
                        <button onClick={(e)=>handleApprove(e,data.id)} className="p-3 text-lg approve text-center w-full font-semibold" style={{color:'#0ACF83'}}>Approved</button>
                        </div>
                        <div>
                        <button onClick={(e)=>handleCancel(e,data.id)} className="p-3 text-lg cancel text-center w-full font-semibold" style={{color:'#FF0000'}}>Cancel</button>
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
      </div>
    );
  }

function AdminPanel() {
    const transaction = useSelector((state)=>state.transaction.allTransaction)
    const active = useSelector((state)=>state.transaction.active)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [currentItems, setCurrentItems] = useState(transaction);
    const itemsPerPage = 20
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [searchBar, setSearchBar] = useState({
        search:"",
        userStatus:"",
        paymentStatus:""
    })
    const {search, userStatus, paymentStatus} = searchBar

    const handleChangeSearch = (e) =>{
        setSearchBar({
            ...searchBar,
            [e.target.name]:e.target.value
        })
    }

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(transaction.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(transaction.length / itemsPerPage));
      }, [itemOffset, itemsPerPage,transaction]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % transaction.length;
        console.log(
          `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
      };

    const getTransaction = async ()=>{
        await dispatch(getTransactions(searchBar))
    }
    useEffect(() => {
        getTransaction();
      }, [searchBar]);
      useEffect(() => {
        getTransaction();
      }, [active,searchBar]);
    console.log(transaction)
    

    
    
    return (
        <div className="App h-full">
            <AdminHeader/>
            <div className="flex justify-center">
                <div className="" style={{width:'1085px',height:'100%'}}>
                    <p className="font-roman text-2xl font-bold">Incoming Transaction</p>
                    <div className="flex justify-between items-center mb-8 bg-gray-200 p-3 rounded-lg mt-5">
                        <div className="flex items-center">
                            <input value={search} onChange={handleChangeSearch} type="text" name="search" className="p-3 rounded-2xl shadow-lg shadow-gray-400 w-80" placeholder="Search ID or Name"/>
                            <FontAwesomeIcon icon={faSearch} className="ml-3" size="xl" />
                        </div>
                        
                        <div className="flex items-center">
                            <select value={userStatus} onChange={handleChangeSearch}  name="userStatus" className="p-3 rounded-2xl shadow-lg bg-white shadow-gray-400 w-40" id="role">
                                <option value="" selected disabled hidden>Status User</option>
                                <option value="Active">Active</option>
                                <option value="Not Active">Not Active</option>
                            </select>
                            <FontAwesomeIcon icon={faUser} size="xl" className="ml-3"/>
                        </div>
                        
                        <select value={paymentStatus} onChange={handleChangeSearch} name="paymentStatus"  className="p-3 rounded-2xl shadow-lg bg-white shadow-gray-400 w-40" id="status">
                            <option value="" selected disabled hidden>Status Payment</option>
                            <option value="Approved">Approved</option>
                            <option value="Cancel">Cancel</option>
                            <option value="Pending">Pending</option>
                        </select>
                    </div>
                    <Items transaction={currentItems}/>
                    <div className="flex justify-center mt-8 mb-5">
                    <p className="font-bold">Results {itemOffset} of {transaction.length} rows </p>
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

export default AdminPanel
