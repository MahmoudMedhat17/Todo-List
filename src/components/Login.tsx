import { FormEvent, useState } from "react";
import {useNavigate} from "react-router-dom";


interface userProps{
  name:string;
  email:string;
  password:string;
};


const Login = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();


  const handleLogin = async(e:FormEvent<HTMLFormElement>) =>{
    e.preventDefault();

    try {
      const response = await fetch("/users.json");
      const data = await response.json();

      const userData = data.users.find((user:userProps)=> user.email === email && user.password === password);


      if(userData){
        navigate("/");
        window.alert(`${userData.name} logged in!`);
        localStorage.setItem("user", JSON.stringify(userData));
      }
      else{
        window.alert("Invalid credentials, please enter the correct credentials.");
      }
    } catch (error) {
      console.log(error);
      throw new Error("Something went wrong!");
    }
  };
  

  return (
    <div>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Log in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="m7moooud.17@gmail.com"
                  value={email}
                  onChange={(e)=> setEmail(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="******"
                  value={password}
                  onChange={(e)=> setPassword(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-black/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Log in
              </button>
            </div>
          </form>

          {/* <p className="mt-10 flex justify-center gap-2 text-center text-sm/6 text-gray-500">
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold text-black hover:text-black/90">
              Sign up
            </Link>
          </p> */}
        </div>
      </div>
    </div>
        )
      };

export default Login;