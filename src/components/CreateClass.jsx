import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import Header from '../components/Header';
import Classroom from './Classroom';

function CreateClass() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [userData, setUserData] = useState(null);
  const [classrooms, setClassrooms] = useState([]); // NEW state for classrooms
  const [className, setClassName] = useState('');
  const [classDescription, setClassDescription] = useState('');

  const navigate = useNavigate(); // Initialize the navigate function

  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,'$1'
  );

  const fetchClassRoomData = async () => {
    try {
      const response = await fetch('https://intelliskoolbackend.onrender.com/api/classrooms/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.error) {
        console.error('Error fetching classroom data:', data.error);
      } else {
        setClassrooms(data); // store classroom array
        console.log('Classroom data:', data);
      }
    } catch (err) {
      console.error('Error during classroom fetch:', err);
    }
  };

  const handleCreateClassroom = async () => {
    try {
      const response = await fetch('https://intelliskoolbackend.onrender.com/api/classrooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          className,
          classDescription,
        }),
      });

      const data = await response.json();
      if (data.error) {
        console.error("Error creating classroom:", data.error);
      } else {
        console.log("Classroom created successfully:", data);
        setShowCreateForm(false);
        setClassName('');
        setClassDescription('');
        fetchClassRoomData(); // refresh classroom list after creation
      }
    } catch (err) {
      console.error("Error sending create request:", err);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://intelliskoolbackend.onrender.com/api/user/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (data.error) {
          console.error('Error fetching user data:', data.error);
        } else {
          setUserData(data);
        }
      } catch (err) {
        console.error('Error during fetch:', err);
      }
    };

    fetchClassRoomData();
    fetchUserData();
  }, []);

  // Handle the classroom click to navigate to the teacher dashboard
  const handleClassroomClick = (classroomId) => {
    navigate('/teacher-dashboard/'); // Redirect to the teacher dashboard
  };

  return (
    <div className='bg-white w-[100vw] h-[100vh] absolute top-0 left-0 text-black'>
      <Header />
      <div className='pt-[100px] px-4'>
        <div className='border border-gray-300 rounded-xl h-[85vh] flex flex-col'>
          {/* Header */}
          <div onClick={() => setShowCreateForm(false)} className='flex items-center h-[60px] px-2 py-2 text-xl font-semibold border-b border-gray-300 cursor-pointer'>
            My Classes
          </div>

          {/* Content */}
          <div className={`flex flex-wrap gap-4 transition-all duration-500 overflow-y-auto ${showCreateForm ? 'h-0 opacity-0' : 'flex-grow opacity-100 p-4'}`}>
            {classrooms && classrooms.length > 0 ? (
              classrooms.map((classroom) => (
                <div key={classroom._id} onClick={() => handleClassroomClick(classroom._id)}>
                  <Classroom
                    keyId={classroom._id}
                    title={classroom.className}
                    desc={classroom.classDescription}
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-500">No classrooms found.</p>
            )}
          </div>

          {/* Create Form */}
          <div
            onClick={() => setShowCreateForm(true)}
            className={`transition-all duration-500 overflow-hidden items-center py-4 px-2 border-t text-xl font-semibold cursor-pointer border-gray-300 ${showCreateForm ? 'h-[calc(100vh-120px)] opacity-100 p-4' : 'h-[60px] opacity-100 p-4'}`}
          >
            <p className='cursor-pointer'>Create Classroom</p><br />
            <div className='flex flex-col w-[450px]'>
              <input
                placeholder='Classroom Title'
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="border-b-2 border-[#2E3A59] focus:border-blue-500 px-4 py-2 outline-none transition-colors duration-200"
              /><br />
              <textarea
                placeholder='Classroom Description'
                value={classDescription}
                onChange={(e) => setClassDescription(e.target.value)}
                className="border overflow-auto h-[150px] border-[#2E3A59] focus:border-blue-500 px-2 py-2 outline-none transition-colors duration-200 resize-none"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none'
                }}
              /><br />
              <div
                onClick={handleCreateClassroom}
                className="bg-blue-0 border flex items-center justify-center text-[#2E3A59] px-4 rounded-xl py-2 w-[100px] hover:bg-[#2E3A59] hover:text-white transition-colors duration-200"
              >
                Save
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateClass;
