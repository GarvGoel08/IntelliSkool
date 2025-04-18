import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Girl from "../assets/login.png";

function Login() {
    const [email, setEmail] = useState(""); // Changed username to email
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!email || !password) {
            setError("Please enter both email and password.");
            return;
        }

        setError("");
        setIsLoading(true);

        try {
            const response = await fetch("https://intelliskoolbackend.onrender.com/api/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email, // Use email instead of username
                    password,
                }),
            });

            const data = await response.json();

            if (data.error) {
                setError(data.error);
                setIsLoading(false);
            } else {
                console.log("Login result:", data);
                document.cookie = `token=${data.token}; path=/; max-age=${60 * 60 * 24 * 7}`;
                navigate("/create-class"); // Redirect after successful login
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("Something went wrong. Please try again.");
            setIsLoading(false);
        }
    };

    return (
        <div style={{ overflow: 'hidden' }} className="bg-white flex border-[20px] border-[#242424] border-box flex-row w-[100vw] h-[100vh] absolute top-0 left-0 text-black">
            <div className="w-[50%] flex flex-col justify-center items-center">
                <div className="flex flex-col justify-center items-start">
                    <h1>Ready to start your<br />your success story?</h1><br />
                    <h2>Login to our website and start leafing</h2><br /><br />
                    <input
                        value={email} // Binding to email state
                        onChange={(e) => setEmail(e.target.value)} // Handle email input
                        className="border-b border-gray-400 focus:border-blue-500 outline-none w-[100%] py-2 mb-4"
                        placeholder="Email" // Change placeholder to "Email"
                    /><br />
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border-b border-gray-400 focus:border-blue-500 outline-none w-[100%] py-2 mb-4"
                        placeholder="Password"
                        type="password"
                    /><br /><br />
                    
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    <div 
                        onClick={isLoading ? null : handleLogin}
                        className={`cursor-pointer bg-[#3c3c3c] text-white px-6 py-2 rounded-full shadow-md transition-all duration-500 ease-out-elastic hover:bg-[#1a1a1a] relative overflow-hidden group flex items-center justify-center w-[120px] h-[42px]`}
                    >
                        {isLoading ? (
                            <div className="w-[18px] h-[18px] border-[3px] border-gray-300 border-t-white rounded-full animate-spin" />
                        ) : (
                            "Login"
                        )}
                    </div><br /><br />
                    <p>Don't have an account? <a href="/signup" className="text-blue-500">Sign up</a></p>
                </div>
            </div>
            <div className="w-[50%] flex flex-col">
                <img src={Girl} className="grayscale" alt="Login visual" />
            </div>
        </div>
    );
}

export default Login;
