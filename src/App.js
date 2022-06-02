import './App.css';
import {BrowserRouter as Router, Routes, Route,useNavigate} from "react-router-dom"
import { useDispatch } from "react-redux";
import LandingPage from './routes/LandingPage';
import Home from './routes/Home';
import BookDetail from './routes/BookDetail';
import ReadBook from './routes/ReadBook';
import Subscribe from './routes/Subscribe';
import Profile from './routes/Profile';
import AdminPanel from './routes/AdminPanel';
import AddBook from './routes/AddBook';
import { useEffect } from 'react';
import {profileActions} from './store/profile-slice'
import {authActions} from './store/auth-slice'
import PrivateRoute from './components/PrivateRoute'
import EditProfile from './routes/EditProfile';
import PrivateRouteAdmin from './components/PrivateRouteAdmin';
import NotFound from './routes/NotFound';
import PrivateRouteSubscribe from './components/PrivateRouteSubscribe';
import { API, setAuthToken } from "./config/api";

import { UserContext } from './context/UserContext';
import AdminBook from './routes/AdminBook';
import AdminUser from './routes/AdminUser';

function App() {
  return (
    <Router>
      <WowApp/>
    </Router>
  )
}

function WowApp() {
      // localStorage.clear();
      const dispatch = useDispatch();
      const navigate = useNavigate()
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      } 

      useEffect(() => {
        if (localStorage.token) {
          setAuthToken(localStorage.token);

        }
      }, []);


      const checkUser = async () =>{
        try {
            const response =  await API.get('/profile')
    
            if (response.status == 200){
              console.log(response.data.data.profile.users.role == 'admin');
              if(response.data.data.profile.users.role == 'admin'){
                localStorage.setItem('isLogin','true')  
                localStorage.setItem('role','true')             
                dispatch(
                    profileActions.setUser({
                        user: response.data.data.profile,
                        role: true,
                    })
                )
            } else if(response.data.data.profile.users.role == 'user'){
              localStorage.setItem('isLogin','true')
              
              dispatch(
                  profileActions.setUser({
                      user: response.data.data.profile,
                      role: false,
                  })
              )
            }
            
              
            } else {
              dispatch(
                profileActions.removeUser()
              )
              dispatch(
                authActions.logout()
              )
            }
          
        } catch (error) {
          dispatch(
            profileActions.removeUser()
          )
          dispatch(
            authActions.logout()
          )
        }
      }
      useEffect(() => {
          checkUser();
      }, []);
      
    return (
      <div>
              <Routes>
              <Route path ="/" element ={<LandingPage/>}/>
              <Route path="/" element={<PrivateRoute/>}>
                <Route path ="/home" element ={<Home/>}/>
                <Route path ="/subscribe" element ={<Subscribe/>}/>
                <Route path ="/profile" element ={<Profile/>}/>
                <Route path ="/profile/edit" element ={<EditProfile/>}/>
                
              </Route>
              <Route path="/" element={<PrivateRouteAdmin/>}>
                <Route path ="/admin/transaction" element ={<AdminPanel/>}/>
                <Route path ="/admin/addbook" element ={<AddBook/>}/>
                <Route path ="/admin/editbook/:id" element ={<AddBook/>}/>
                <Route path="/admin/book"  element ={<AdminBook/>}/>
                <Route path="/admin/user" element ={<AdminUser/>}/>
              </Route>
              <Route path="/" element={<PrivateRouteSubscribe/>}>
                <Route path ="/detail-book/:id" element ={<BookDetail/>}/>
                <Route path ="/read/:id" element ={<ReadBook/>}/>
              </Route>
              <Route path ="/error" element ={<NotFound/>}/>
              </Routes>
      </div>
    )
}

export default App;
