import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const Navbar = () => {

  // We use useNavigate from react router dom library so we can route to another page.
  const navigate = useNavigate();

  // Here we get the data stored from localStorage.
  const parsedData = localStorage.getItem("user");
  // Here we check if the data we get from localStorage is parsed or null;
  const userData = parsedData ? JSON.parse(parsedData) : null;


  // Function to handle the Logout.
  const handleLogout = () =>{
    // Check if the user data from localStorage exists or not.
    if(userData){
      // If exists then navigate to login page.
      navigate("/login");
      // And remove the user Data from localStorage.
      localStorage.removeItem("user");
    };
  };


  return (
    <header className="bg-white">
        <div className="mx-auto flex justify-between h-16 items-center gap-8 px-4">
          <h3 className="font-bold text-2xl">Todo List</h3>
          {/* Here we check if the user Data exists, if it exists then show the welcome user data and a logout button that navigate to login page. */}
          {
            userData &&  
            <div className="flex gap-4 items-center">             
              <p className="text-xl">Welcome, {userData ? <span className="font-semibold">{userData?.name}</span> : <span className="font-semibold">Guest</span>}</p>
              <Button onClick={handleLogout} type="submit">
                Log out
              </Button>
            </div>
          }
        </div>
    </header>
  )
}

export default Navbar