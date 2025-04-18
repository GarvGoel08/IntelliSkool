import React, { useEffect, useState } from "react";
import Header from "./Header";
import classroomcover from "../assets/ClassroomCover.png";

const classrooms = [
  {
    name: "Cyber Forensics",
    code: "CF2025",
    teacher: "Prof. Khushi Ray",
    color: "#4285F4",
  },
  {
    name: "Digital Security",
    code: "DS2025",
    teacher: "Dr. Aryan Mehta",
    color: "#DB4437",
  },
  {
    name: "Ethical Hacking",
    code: "EH2025",
    teacher: "Prof. Neha Sharma",
    color: "#F4B400",
  },
];

export default function StudentClassrooms() {
  const [showPopup, setShowPopup] = useState(false);
  const [classCode, setClassCode] = useState("");
  const [classroomsState, setClassrooms] = useState();

  useEffect(() => {
    const getUserClasses = async () => {
      try {
        const response = await fetch("https://intelliskoolbackend.onrender.com/api/register/my", {
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODAxZThmN2YxMGRjMWIyNTNkNjM3MmIiLCJpYXQiOjE3NDQ5NTU2NTYsImV4cCI6MTc0NDk1OTI1Nn0.tvBYx31gfxmd1EukvJ9iVWSVnbsIGgN-P9ysvj1VHQM'
          }
        });
        const data = await response.json();
        console.log(data);
        
        // Update the classrooms state with fetched data
        if (data && Array.isArray(data)) {
          setClassrooms(data);
        }
      } catch (error) {
        console.error("Error fetching user classes:", error);
      }
    };
    getUserClasses();
  }, [])

  const handleJoin = async () => {
    try {
      const response = await fetch("https://intelliskoolbackend.onrender.com/api/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODAxZThmN2YxMGRjMWIyNTNkNjM3MmIiLCJpYXQiOjE3NDQ5NTU2NTYsImV4cCI6MTc0NDk1OTI1Nn0.tvBYx31gfxmd1EukvJ9iVWSVnbsIGgN-P9ysvj1VHQM'
        },
        body: JSON.stringify({
          classCode: classCode
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        const getUserClasses = async () => {
          try {
            const response = await fetch("https://intelliskoolbackend.onrender.com/api/register/my", {
              headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODAxZThmN2YxMGRjMWIyNTNkNjM3MmIiLCJpYXQiOjE3NDQ5NTU2NTYsImV4cCI6MTc0NDk1OTI1Nn0.tvBYx31gfxmd1EukvJ9iVWSVnbsIGgN-P9ysvj1VHQM'
              }
            });
            const data = await response.json();
            console.log(data);
            
            if (data && Array.isArray(data)) {
              setClassrooms(data);
            }
          } catch (error) {
            console.error("Error fetching user classes:", error);
          }
        };
        getUserClasses();
        setShowPopup(false);
        setClassCode("");
        alert("Successfully joined the class!");
      } else {
        throw new Error(data.message || "Failed to join class");
      }
    } catch (error) {
      alert(`Error joining class: ${error.message}`);
      console.error("Error joining class:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-5xl mx-auto px-4 py-8 mt-[80px]">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">My Classes</h1>
          <button
            onClick={() => setShowPopup(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Join Class
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classroomsState?.map((classroom, idx) => (
            <a
            href={`/student/${classroom.classroom._id}`}
              key={idx}
              className="bg-cover bg-center bg-no-repeat rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
              <div className="h-20 bg-cover bg-center bg-no-repeat from-transparent to-white" style={{
                    backgroundImage: `url(${classroomcover})`,
                  }}>
                <div
                  className="h-16 w-16 rounded-full flex items-center justify-center shadow-lg absolute -top-6 left-6"
                  
                >
                  <span className="text-white font-bold text-2xl">
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 text-gray-900">
                  {classroom.classroom.className}
                </h2>
                <div className="space-y-2 text-gray-600 text-sm">
                  <p>Class Code: {classroom.classroom.classCode}</p>
                  <p>{classroom.classroom.classDescription}</p>
                </div>
              </div>
            </a>
          ))}
        </div>

        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                Join a Class
              </h2>
              <p className="text-gray-600 mb-4">
                Enter the class code provided by your teacher.
              </p>
              <div className="mb-4">
                <input
                  type="text"
                  value={classCode}
                  onChange={(e) => setClassCode(e.target.value)}
                  placeholder="Class code"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 text-black focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => {
                    setShowPopup(false);
                    setClassCode("");
                  }}
                  className="px-4 py-2 text-gray-400 hover:text-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleJoin}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
