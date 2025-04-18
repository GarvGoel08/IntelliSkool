import Girl from "../assets/login.png";
import { useState } from "react";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!role) {
      setError("Please select Student or Teacher.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch("https://intelliskoolbackend.onrender.com/api/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: username,
          email,
          password,
          type: role,
        }),
      });

      const data = await response.json();

      if (data.error) {
        alert(data.error);
        setLoading(false);
      } else {
        console.log("Signup result:", data);
        document.cookie = `token=${data.token}; path=/; max-age=${60 * 60 * 24 * 7}`;
        window.location.href = "/create-class";
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div style={{ overflow: 'hidden' }} className="bg-white flex border-[20px] border-[#242424] box-border flex-row w-[100vw] h-[100vh] absolute top-0 left-0 text-black">
      <div className="logo absolute left-[40px] top-[10px]">
        <a href="/">IntelliSkool</a>
      </div>
      <div className="w-[50%] flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-start">
          <h1 className="text-4xl font-semibold mb-2">Join Us Today!</h1><br />
          <h2 className="text-xl text-gray-700 mb-6">Create your account and start your journey with us.</h2><br />
          <input
            onChange={(e) => setUsername(e.target.value)}
            className="border-b border-gray-400 focus:border-blue-500 outline-none w-[100%] py-2 mb-4"
            placeholder="Username"
          /><br />
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="border-b border-gray-400 focus:border-blue-500 outline-none w-[100%] py-2 mb-4"
            placeholder="Email"
          /><br />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="border-b border-gray-400 focus:border-blue-500 outline-none w-[100%] py-2 mb-4"
            placeholder="Password"
            type="password"
          />

          <div className="flex items-center gap-6 mb-6">
            <label className="flex items-center gap-2 mt-4 text-[18px]">
              <input
                type="radio"
                name="role"
                value="Student"
                checked={role === "Student"}
                onChange={(e) => setRole(e.target.value)}
                className="accent-white"
              />
              <span>Student</span>
            </label>
            <label className="flex items-center gap-2 mt-4 text-[18px]">
              <input
                type="radio"
                name="role"
                value="Teacher"
                checked={role === "Teacher"}
                onChange={(e) => setRole(e.target.value)}
                className="accent-white"
              />
              <span>Teacher</span>
            </label>
          </div>

          {error && <p className="text-red-500 text-sm -mt-4 mb-4">{error}</p>}

          <div
            onClick={loading ? null : handleSignup}
            className={`cursor-pointer bg-[#3c3c3c] text-white px-6 py-2 rounded-full shadow-md transition-all duration-500 ease-out-elastic hover:bg-[#1a1a1a] relative overflow-hidden group flex items-center justify-center w-[120px] h-[42px]`}
          >
            {loading ? (
              <div className="w-[18px] h-[18px] border-[3px] border-gray-300 border-t-white rounded-full animate-spin" />
            ) : (
              "Signup"
            )}
          </div><br /><br />

          <p>Already have an account? <a href="/login" className="text-blue-500">Log in</a></p>
        </div>
      </div>
      <div className="w-[50%] flex flex-col">
        <img src={Girl} className="grayscale" alt="Signup" />
      </div>
    </div>
  );
}

export default Signup;
