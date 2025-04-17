import Girl from "../assets/login.png"

function Signup() {
    return(
        <div style={{overflow:'hidden'}} className="bg-white flex border-[20px] border-[#242424] box-border flex-row w-[100vw] h-[100vh] absolute top-0 left-0 text-black">
            <div className="w-[50%] flex flex-col justify-center items-center">
                <div className="flex flex-col justify-center items-start">
                    <h1 className="text-4xl font-semibold mb-2">Join Us Today!</h1><br />
                    <h2 className="text-xl text-gray-700 mb-6">Create your account and start your journey with us.</h2><br />
                    <input className="border-b border-gray-400 focus:border-blue-500 outline-none w-[100%] py-2 mb-4" placeholder="Username" /><br />
                    <input className="border-b border-gray-400 focus:border-blue-500 outline-none w-[100%] py-2 mb-4" placeholder="Email" /><br />
                    <input className="border-b border-gray-400 focus:border-blue-500 outline-none w-[100%] py-2 mb-4" placeholder="Password" type="password" /><br /><br />
                    <div className="cursor-pointer bg-[#3c3c3c] text-white px-6 py-2 rounded-full shadow-md transition-all duration-500 ease-out-elastic hover:bg-[#1a1a1a] relative overflow-hidden group">
                        Signup
                    </div><br /><br />
                    <p>Already have an account? <a href="/login" className="text-blue-500">Log in</a></p>
                </div>
            </div>
            <div className="w-[50%] flex flex-col">
                <img src={Girl} className="grayscale" alt="Signup" />
            </div>
        </div>
    )
}

export default Signup;
