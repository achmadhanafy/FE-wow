import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {profileActions} from '../store/profile-slice'
import { useNavigate } from 'react-router'
import userImage from '../assets/foto.jpg'
import Sidebar from '../components/Sidebar'
import { API } from '../config/api'

function EditProfile() {
    const dispatch = useDispatch()
    const user = useSelector((state)=>state.profile.user)
    const baseURL = useSelector((state)=>state.profile.baseURL)
    const role = useSelector((state)=>state.profile.role)
    const [imageToPost, setImageToPost] = useState(null);
    const [profile,setProfile] = useState(user)
    console.log(profile);
    const [image,setImage] = useState(null)
    console.log(profile); 
 
    
        useEffect(() => {
            if(user){
            setProfile(user)
            }
        }, [user])

    let {phone,gender,address} = profile
    
    const handleImage = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
            setImage(e.target.files)
            
        }

        reader.onload = (readerEvent) => {
            setImageToPost(readerEvent.target.result);
        }
    }

    const removeImage = () => {
        setImageToPost(null);
        setImage(null)
    }
    

    const handleChange = (e) => {
        
        setProfile({
          ...profile,
          [e.target.name]: e.target.value,
        });
        console.log(profile);
      };


      
      const navigate = useNavigate()

      const handleSubmit = async (e) =>{
        try {
            e.preventDefault()
            const config = {
                headers:{
                    "Content-type": "multipart/form-data",
                }
            }
            const formData = new FormData();
            //Data body
            if (image){
                formData.set("image", image[0], image[0].name);
            }
            formData.set("phone", phone);
            formData.set("gender", gender);
            formData.set("address", address);
            const response = await API.patch('/profile',formData,config)
            console.log(response.data.message);

            if (response.status === 200){
                dispatch(
                    profileActions.setUser({
                        user: response.data.data,
                        role: role,
                    })
                )
                    
                navigate('/profile')
                
            } 
        } catch (error) {
            console.log(error);
        }
      }
    return (
    <div className="App">
    <div className="flex justify-center py-8 px-16" style={{width:'100%'}}>
        <div className="flex justify-start">
            <Sidebar userImage={userImage} userName="Achmad Hanafy"/>
        </div>
        <div style={{width:'100%'}}>
            <div className="flex justify-start items-center w-3/4 mt-5" style={{marginLeft:'20%',height:'100%'}}>
               <div className="w-full">
                <p className="font-roman font-bold text-3xl mb-5">Edit Profile</p>
                <div  style={{backgroundColor:'#FFD9D9'}}>
                <form onSubmit={handleSubmit} className="flex items-center w-full rounded-lg p-5" action="">
                    <div className="w-3/5">
                        

                        <div className="flex items-center mb-5">
                           <select onChange={handleChange} value={gender} name="gender" className="formInput text-lg bg-white" id="gender">
                               <option value="Male">Male</option>
                               <option value="Female">Female</option>
                           </select>
                        </div>

                        <div className="flex items-center mb-5">
                           <input onChange={handleChange} type="text" value={phone} id="telp" name="phone" className="formInput text-lg" placeholder="Phone Number" />
                        </div>

                        <div className="flex items-center mb-5">
                           <textarea onChange={handleChange} name="address" value={address} id="address" cols="30" rows="5" placeholder="Address" className="resize-none formInput text-lg" ></textarea>
                        </div>

                        <div className="flex items-centermb-5">
                            <button className="button bgPrimary text-white text-lg font-semibold" type="submit">Save</button>
                        </div>

                        
                        
                    </div>

                    <div className="flex justify-end w-2/5 mr-5">
                        <div style={{width:'211px'}}>
                            <img src={`${baseURL}/${user.image}`} style={{height:'210px'}} className="rounded-md" width="100%" alt=""/>
                            <label htmlFor="image" className="w-full block bgPrimary text-white text-lg text-center button mt-3 font-semibold">
                                Edit
                                </label>
                                <input onChange={handleImage} type="file" name="image" id="image" hidden/>
                                {imageToPost && (
                                    // <div onClick={removeImage} className="flex justify-start flex-col hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer">
                                    //     <img className="h-10 object-contain" src ={imageToPost} alt=""/>
                                    //     <p className="text-xs text-red-500 text-center">Remove</p>
                                    // </div>
                                    <div className="p-3 mt-3 bg-white rounded-md flex justify-center">
                                         <div style={{width:'180px'}} className="my-3">
                                            <img src={imageToPost} style={{height:'150px',width:'180px'}} alt=""/>
                                            <div onClick={removeImage} className="text-center cursor-pointer text-lg font-semibold flex">
                                            Remove<p className="ml-3 font-bold text-red-500">X</p>
                                            </div>
                                        </div>
                                       
                                    </div>
                                   
                                )}
                        </div>
                    </div>
                    </form>
               </div>
               
              
               </div>
            </div>
            
        </div>
    </div>
</div>
)
}

export default EditProfile
