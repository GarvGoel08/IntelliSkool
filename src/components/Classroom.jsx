import mathsImg from '../assets/maths.webp';

function Classroom({ keyId, title, desc }) {
  const handleDelete = async () => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    try {
      const response = await fetch(`https://intelliskoolbackend.onrender.com/api/classrooms/${keyId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.error) {
        console.error("Error deleting classroom:", data.error);
      } else {
        console.log("Classroom deleted:", data);
        window.location.reload(); // refresh page or handle state update instead
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="relative bg-white h-[180px] w-[400px] text-black rounded-xl transition-all duration-300 p-4 flex items-start gap-4 cursor-pointer group hover:shadow-md border border-gray-200">
      <img src={mathsImg} alt="Maths" className="w-36 h-36 object-cover rounded-md" />
      <div className="ml-8">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm">{desc}</p>
      </div>

      {/* Hover icons */}
      <div className="absolute bottom-4 right-4 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {/* Delete Icon */}
        <svg
          onClick={handleDelete}
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-red-500 hover:text-red-700 cursor-pointer transition-colors duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>

        {/* Arrow Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-black group-hover:text-blue-500 transition-colors duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}

export default Classroom;
