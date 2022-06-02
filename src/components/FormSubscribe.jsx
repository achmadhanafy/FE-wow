import React,{useState,useEffect} from 'react'
import wow from '../assets/Wow.png'
import clip from '../assets/clip.png'
import { useNavigate } from 'react-router'
import Modal from 'react-modal'
import { API } from '../config/api'
import { useSelector } from 'react-redux'

function FormSubscribe() {
    const [userStatus,setUserStatus] = useState(null)
    const user = useSelector((state)=>state.profile.user)
    const [image,setImage] = useState(null)
    const [message,setMessage] = useState(null)
    useEffect(() => {
        if(user.users){
            if(user.users.userStatus == 'Not Active'){
                setUserStatus(false)
            } else if(user.users.userStatus == 'Pending'){
                setUserStatus(true)
            }
        }
        
    }, [user])


    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          paddingRight:'30px',
          paddingLeft:'30px',
          right: 'auto',
          bottom: 'auto',
          borderRadius:'10px',
          transform: 'translate(-50%, -50%)',
        },
      };
    const [showModal,setShowModal] = useState(false)
    console.log(showModal);
    const [imageToPost, setImageToPost] = useState(null);
    const[dataSubscribe, setDataSubscribe] = useState(null)

    const handleSubscribe = async (e) => {
        e.preventDefault()
        try {
            const config = {
                headers:{
                    "Content-type": "multipart/form-data",
                }
            }
            const formData = new FormData();
            //Data body
            if (image){
                formData.set("transferProof", image[0], image[0].name);
            }

            const response = await API.post('/transaction',formData,config)
            console.log(response.status);
            if(response.data.status == 'success'){
                setUserStatus(true)
                setShowModal(true)
            } else {
                setMessage(response.data.message)
            }
            
        } catch (error) {
            console.log(error);
            
        }
    }
    const handleCloseModal = () => {
        setShowModal(false)
    }
    const navigate = useNavigate()
    const handleImage = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
            setImage(e.target.files)
            
        }

        reader.onload = (readerEvent) => {
            setImageToPost(readerEvent.target.result);
        }
        
    } ;

    const removeImage = () => {
        setImageToPost(null);
    }
    

    if (userStatus == false){
        return (
            <div>
                <p className="text-3xl font-roman font-bold mb-8">Premium</p>
                    <p className="text-lg flex justify-center mb-5">Pay now and access all the latest books from <img src={wow} alt=""/></p>
                    <form onSubmit={handleSubscribe} action="">
                        <p className="text-red-400 font-semibold mb-3">{message}</p>
                    
                    <div  className="formInput bg-gray-300 m-auto font-semibold" style={{width:'80%'}}>Account Number : {user.users.id}
                   </div>
                        <label className="flex justify-center w-4/4" htmlFor="image">
                        <div className="formInput textColorRed flex font-bold" style={{width:'80%'}}> Attache proof of transfer <img width="30px" style={{height:'30px',marginLeft:'120px'}} src={clip} alt=""/></div>
                            </label>
                            
                            <input onChange={handleImage} id="image" name="transferProof" className="formInput bg-gray-300" style={{width:'80%'}} type="file" hidden/>
                            {imageToPost && (
                                    // <div onClick={removeImage} className="flex justify-start flex-col hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer">
                                    //     <img className="h-10 object-contain" src ={imageToPost} alt=""/>
                                    //     <p className="text-xs text-red-500 text-center">Remove</p>
                                    // </div>
                                    <div>
                                         <div style={{marginLeft:'50px',width:'200px'}} className="mb-3">
                                            <img src={imageToPost} alt=""/>
                                            <div onClick={removeImage} className="text-center cursor-pointer text-lg font-semibold flex">
                                            Remove<p className="ml-3 font-bold text-red-500">X</p>
                                            </div>
                                        </div>
                                       
                                    </div>
                                   
                                )}
                            <button className="button bgPrimary text-white text-lg font-bold" style={{width:'80%'}}>Send</button>
                    </form>
                   
                            
             </div>
        )
    } 
    else {
        return (
            
            <div className="text-lg text-center mb-8 bg-white p-3 rounded-md" style={{color:'#29BD11'}}>
                        <Modal
                            isOpen = {showModal}
                            contentLabel = "alert"
                            style = {customStyles}
                            onRequestClose = {handleCloseModal}
                            overlayClassName = "Overlay"
                            >
                                <div style={{color:'#29BD11'}} className="text-2xl text-center">
                                    Thank you for subscribing to premium, your premium package will be active after our admin approves your transaction, thank you
                                </div>
                            </Modal>
                Thank you for subscribing to premium, your premium package will be active after our admin approves your transaction, thank you
            </div>
        )
    }
    
}

export default FormSubscribe
