import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Girl from "../assets/login.png";

function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/dashboard");
    };

    return (
        <div style={{ overflow: 'hidden' }} className="bg-white flex border-[20px] border-[#242424] border-box flex-row w-[100vw] h-[100vh] absolute top-0 left-0 text-black">
            <div className="w-[50%] flex flex-col justify-center items-center">
                <div className="flex flex-col justify-center items-start">
                    <h1>Ready to start your<br></br>your success story?</h1><br></br>
                    <h2>Login to our website and start leafing</h2><br></br><br></br>
                    <input className="border-b border-gray-400 focus:border-blue-500 outline-none w-[100%] py-2" placeholder="Username"></input><br></br>
                    <input className="border-b border-gray-400 focus:border-blue-500 outline-none w-[100%] py-2" placeholder="Password" type="password"></input><br></br><br></br>
                    <div 
                        onClick={handleLogin}
                        className="cursor-default bg-[#3c3c3c] text-white px-6 py-2 rounded-full shadow-md transition-all duration-500 ease-out-elastic hover:bg-[#1a1a1a] relative overflow-hidden group"
                    >
                        Login
                    </div><br></br><br></br>
                    <p>Don't have an account? <a href="/signup">Sign up</a></p>
                </div>
            </div>
            <div className="w-[50%] flex flex-col">
                <img src={Girl} className="grayscale" alt="Login visual" />
            </div>
        </div>
    );
}

export default Login;