import {Routes,Route} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Errorpage from "./components/Errorpage";
import Navbar from "./components/Navbar";


const App = () => {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/" element={<Home/>}/>
      <Route path="*" element={<Errorpage/>}/>
    </Routes>
    </>
  )
}

export default App;