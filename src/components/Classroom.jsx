import mathsImg from '../assets/maths.webp';

function Classroom({ data }) {
  return (
    <div className="relative bg-white w-[400px] text-black rounded-xl transition-all duration-300 p-4 flex items-start gap-4 cursor-pointer group hover:shadow-md border border-gray-200">
      <img src={mathsImg} alt="Maths" className="w-36 h-36 object-cover rounded-md" />
      <div className="ml-8">
        <h2 className="text-xl font-semibold">Maths Class</h2>
        <p className="text-sm">{data}</p>
      </div>

      {/* SVG Arrow appears on hover */}
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
