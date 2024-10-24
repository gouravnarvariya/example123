import React from 'react'
import {
  Route,
  Routes,
  useRoutes,
} from "react-router-dom";
import ProtectedRoute from './ProtectedRoute';
import Login from './component/login/Login';
import Signup from './component/signup/Signup';
import Homepage from './component/homepage/Homepage';
import Header from './component/common/Header';
import Footer from './component/common/Footer';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const router = useRoutes([
    {
      path: "/login",
      element: <Login/>,
    },
    {
      path: "/signup",
      element: <Signup/>,
    },
    {
      path:'/*',
      element : 
      <ProtectedRoute>
      <Header/>
        <Routes>
          <Route path='/' element = {<Homepage/>} ></Route>
        </Routes>
        <Footer/>
      </ProtectedRoute>
    }
  ]);
  return (
    <>
   {router}
   <ToastContainer autoClose={2000} hideProgressBar={true} />
</>
  )
}

export default App