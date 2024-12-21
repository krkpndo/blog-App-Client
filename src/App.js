import AppNavBar from './components/AppNavBar';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Blogs from './pages/Blogs';
import AddPost from './pages/AddBlog';
import GetMyBlogs from './pages/MyBlogs';
import ViewBlog from './components/ViewDetails';
import UpdateBlog from './components/UpdateBlog';
import DeleteBlog from './components/DeleteBlog';
import AdminDashBoard from './pages/AdminDashBoard';

import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';

import {useState, useEffect} from 'react';
import AdminDashboard from './pages/AdminDashBoard';
function App() {
  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  })

  function unsetUser(){
    localStorage.clear();
  }

  useEffect(()=> {

  
  if(localStorage.getItem('token')){
      fetch(`https://blog-app-api-06de.onrender.com/users/details`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => response.json())
      .then(data => {
          if(data.user._id === undefined){
            setUser({
              id:null,
              isAdmin:null
            })
          }else{
            setUser({
              id: data.user._id,
              isAdmin: data.user.isAdmin
            })
          }
      })

  }else{
    setUser({
      id: null
    })
  }

}, [])
  return (
    <>
        <UserProvider value = {{user, setUser, unsetUser}}>
            <Router>
              <AppNavBar/>
              <Container>
                <Routes>
                  <Route path="/" element={<Home/>} />  
                  <Route path="/getAllBlogs" element={<Blogs />} />
                  <Route path="/addPost" element={<AddPost />} />
                  <Route path="/getMyBlogs" element={<GetMyBlogs />} />
                  <Route path="/register" element={<Register/>} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/logout" element={<Logout />} />
                  <Route path="/updateBlog/:id" element={<UpdateBlog />} />
                  <Route path="/deleteBlog/:id" element={<DeleteBlog />} />
                  <Route path="/adminDashboard" element={<AdminDashBoard />} />
                  <Route path="/viewBlog/:id" element={<ViewBlog />} />
                  
                </Routes>
              </Container>
            </Router>
        </UserProvider>
    </>
   



  );
}

export default App;
