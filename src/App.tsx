import {Routes,Route, useNavigate} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
// import Signup from "./components/Signup";
import Errorpage from "./components/Errorpage";
import Navbar from "./components/Navbar";
import { useEffect } from "react";


const App = () => {

  const navigate = useNavigate();

  // Here we check if a user from the users.json file exists or not so when this todolist is deployed on a cloud service such as Vercel or Netlify it shows the the login page for authentication so u can login with one of the users of the users.json file instead of showing the todolist page immediately.
  useEffect(()=>{
    // We get the user from localStorage.
    const userExist = localStorage.getItem("user");
    // If there's no user logged in then navigate to Login page.
    if(!userExist){
      navigate("/login");
    }
  },[]);


  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      {/* <Route path="/signup" element={<Signup/>}/> */}
      <Route path="/" element={<Home/>}/>
      <Route path="*" element={<Errorpage/>}/>
    </Routes>
    </>
  )
}

export default App;