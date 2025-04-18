import { useState, useRef, useEffect } from "react";
import Header from "./Header";

function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("assignments");
  const [showCreateAssignmentForm, setShowCreateAssignmentForm] = useState(false);
  const [showCreateTestForm, setShowCreateTestForm] = useState(false);

  const tabRefs = {
    assignments: useRef(null),
    tests: useRef(null),
    meet: useRef(null),
  };
  const underlineRef = useRef(null);

  useEffect(() => {
    const activeEl = tabRefs[activeTab].current;
    const underlineEl = underlineRef.current;

    if (activeEl && underlineEl) {
      underlineEl.style.width = `${activeEl.offsetWidth}px`;
      underlineEl.style.left = `${activeEl.offsetLeft}px`;
    }
  }, [activeTab]);

  const tabClass = (tab) =>
    `cursor-pointer relative px-4 py-2 transition-all duration-300 ease-in-out ${
      activeTab === tab
        ? "text-blue-600 font-semibold"
        : "text-gray-500 hover:text-blue-400"
    }`;

  const fadeClass = (tab) =>
    `transition-all duration-500 ease-in-out ${
      activeTab === tab
        ? "opacity-100 translate-y-0"
        : "opacity-0 -translate-y-2 absolute pointer-events-none"
    }`;

  const renderCreateForm = (isAssignment = true) => (
    <div className="flex flex-row-reverse border border-gray-300 rounded-xl h-[60vh] py-4 px-4 space-x-4 space-x-reverse">
      {/* Side form for medium+ screens */}
      <div
        className={`transition-all duration-500 w-[50%] hidden md:flex justify-center align-center overflow-hidden pl-4 mb-4`}
      >
        <div className="flex flex-col w-full max-w-md">
          <input
            placeholder={`${isAssignment ? "Assignment" : "Test"} Title`}
            className="border-b-2 border-[#2E3A59] focus:border-blue-500 px-4 py-2 outline-none transition-colors duration-200 mb-3"
          />
          <textarea
            placeholder={`${isAssignment ? "Assignment" : "Test"} Description`}
            className="border h-[150px] border-[#2E3A59] focus:border-blue-500 px-2 py-2 outline-none resize-none transition-colors duration-200 mb-3"
          />
          <div className="bg-blue-0 border flex items-center justify-center text-[#2E3A59] px-4 rounded-xl py-2 w-[100px] hover:bg-[#2E3A59] hover:text-white transition-colors duration-200">
            Save
          </div>
        </div>
      </div>

      {/* List container */}
      <div className="flex flex-col w-[100%] md:w-[50%] pr-4 overflow-auto">
        {[`${isAssignment ? "Assignment" : "Test"} 1`, `${isAssignment ? "Assignment" : "Test"} 2`, `${isAssignment ? "Assignment" : "Test"} 3`].map((title, idx) => (
          <div
            key={idx}
            className="flex items-center border mb-4 px-4 py-2 rounded-lg shadow-sm"
          >
            <input type="checkbox" className="w-4 h-4 mr-4" />
            <p>{title}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMobileCreateForm = (isVisible, isAssignment = true) => (
    <div
      className={`transition-all duration-500 overflow-hidden border border-gray-300 rounded-xl mb-4 ${
        isVisible ? "max-h-[400px] opacity-100 p-4" : "max-h-0 opacity-0"
      }`}
    >
      <div className="flex flex-col w-full max-w-md">
        <input
          placeholder={`${isAssignment ? "Assignment" : "Test"} Title`}
          className="border-b-2 border-[#2E3A59] focus:border-blue-500 px-4 py-2 outline-none transition-colors duration-200 mb-3"
        />
        <textarea
          placeholder={`${isAssignment ? "Assignment" : "Test"} Description`}
          className="border h-[150px] border-[#2E3A59] focus:border-blue-500 px-2 py-2 outline-none resize-none transition-colors duration-200 mb-3"
        />
        <div className="bg-blue-0 border flex items-center justify-center text-[#2E3A59] px-4 rounded-xl py-2 w-[100px] hover:bg-[#2E3A59] hover:text-white transition-colors duration-200">
          Save
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <Header />
      <div className="bg-white w-[100vw] h-[100vh] absolute top-0 left-0 text-black pt-[100px] px-4 overflow-hidden">
        <div className="relative w-full">
          {/* Tab Headings */}
          <div className="flex space-x-6 relative border-b border-gray-300 mb-6">
            <p
              ref={tabRefs.assignments}
              className={tabClass("assignments")}
              onClick={() => {
                setActiveTab("assignments");
                setShowCreateAssignmentForm(false);
                setShowCreateTestForm(false);
              }}
            >
              Assignments
            </p>
            <p
              ref={tabRefs.tests}
              className={tabClass("tests")}
              onClick={() => {
                setActiveTab("tests");
                setShowCreateAssignmentForm(false);
                setShowCreateTestForm(false);
              }}
            >
              Tests
            </p>
            <p
              ref={tabRefs.meet}
              className={tabClass("meet")}
              onClick={() => {
                setActiveTab("meet");
                setShowCreateAssignmentForm(false);
                setShowCreateTestForm(false);
              }}
            >
              Meet
            </p>
            <div
              ref={underlineRef}
              className="absolute bottom-0 h-[1px] bg-blue-600 transition-all duration-300 ease-in-out"
              style={{ left: 0, width: 0 }}
            />
          </div>

          {/* Tab Content */}
          <div className="relative min-h-[300px]">
            {/* Assignments Tab */}
            <div className={fadeClass("assignments")}>
              <div className="flex justify-between items-center mb-4">
                <p className="text-lg font-semibold">📋 Assignment List</p>
                <div
                  onClick={() => setShowCreateAssignmentForm(!showCreateAssignmentForm)}
                  className="bg-blue-0 border flex items-center justify-center text-[#2E3A59] px-4 rounded-xl py-2 hover:bg-[#2E3A59] hover:text-white transition-all md:hidden duration-200"
                >
                  {showCreateAssignmentForm ? "Close" : "Create Assignment"}
                </div>
              </div>
              {renderMobileCreateForm(showCreateAssignmentForm, true)}
              {renderCreateForm(true)}
            </div>

            {/* Tests Tab */}
            <div className={fadeClass("tests")}>
              <div className="flex justify-between items-center mb-4">
                <p className="text-lg font-semibold">🧪 Test List</p>
                <div
                  onClick={() => setShowCreateTestForm(!showCreateTestForm)}
                  className="bg-blue-0 border flex items-center justify-center text-[#2E3A59] px-4 rounded-xl py-2 hover:bg-[#2E3A59] hover:text-white transition-all md:hidden duration-200"
                >
                  {showCreateTestForm ? "Close" : "Create Test"}
                </div>
              </div>
              {renderMobileCreateForm(showCreateTestForm, false)}
              {renderCreateForm(false)}
            </div>

            {/* Meet Tab */}
            {/* Meet Tab */}
<div className={fadeClass("meet")}>
  <p className="text-lg font-semibold mb-4">📅 Create a Meeting</p>
  <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mb-4">
    <input
      type="text"
      placeholder="Meeting Topic"
      className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full md:w-1/3"
    />
    <input
      type="number"
      placeholder="Duration (in minutes)"
      className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full md:w-1/3"
      min={1}
    />
    <input
      type="date"
      className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full md:w-1/3"
    />
  </div>
  <div className="flex justify-end">
    <div className="bg-[#2E3A59] text-white px-6 py-2 rounded-xl cursor-pointer transition-colors duration-200">
      Create Meeting
    </div>
  </div>
</div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;
