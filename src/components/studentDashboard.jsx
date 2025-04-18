import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useParams } from "react-router-dom";



const StudentDashboard = () => {
  const { id } = useParams();
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const getUserClasses = async () => {
      try {
        const response = await fetch(
          `https://intelliskoolbackend.onrender.com/api/assignments/class/${id}`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODAxZThmN2YxMGRjMWIyNTNkNjM3MmIiLCJpYXQiOjE3NDQ5NTU2NTYsImV4cCI6MTc0NDk1OTI1Nn0.tvBYx31gfxmd1EukvJ9iVWSVnbsIGgN-P9ysvj1VHQM",
            },
          }
        );
        const assignments = await response.json();
        const response1 = await fetch(
          `https://intelliskoolbackend.onrender.com/api/tests/classroom/${id}`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODAxZThmN2YxMGRjMWIyNTNkNjM3MmIiLCJpYXQiOjE3NDQ5NTU2NTYsImV4cCI6MTc0NDk1OTI1Nn0.tvBYx31gfxmd1EukvJ9iVWSVnbsIGgN-P9ysvj1VHQM",
            },
          }
        );
        const tests = await response1.json();
        const response2 = await fetch(
          `https://intelliskoolbackend.onrender.com/api/classes/classroom/${id}`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODAxZThmN2YxMGRjMWIyNTNkNjM3MmIiLCJpYXQiOjE3NDQ5NTU2NTYsImV4cCI6MTc0NDk1OTI1Nn0.tvBYx31gfxmd1EukvJ9iVWSVnbsIGgN-P9ysvj1VHQM",
            },
          }
        );
        const classes = await response2.json();
        console.log(classes);
        // Merge with type
        const activities = [];

        // Add assignments
        assignments.forEach((assignment) => {
          activities.push({
            type: "assignment",
            name: assignment.name,
            deadline: new Date(assignment.deadline).toLocaleDateString(
              "en-US",
              { month: "short", day: "numeric" }
            ),
            submitted: assignment.submitted,
            createdAt: assignment.createdAt,
            fileURL: assignment.fileURL,
            totalMarks: assignment.totalMarks,
            description: assignment.description,
          });
        });

        // Add tests
        tests.forEach((test) => {
          activities.push({
            type: "test",
            name: test.name,
            deadline: new Date(test.deadline).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            }),
            duration: `${test.duration} min`,
            attempted: test.attempted,
            marks: test.marks,
            createdAt: test.createdAt,
          });
        });

        // Add classes
        classes.forEach((classroom) => {
          activities.push({
            type: "class",
            topic: classroom.topic,
            startTime: new Date(classroom.startTime).toLocaleTimeString(
              "en-US",
              { hour: "2-digit", minute: "2-digit" }
            ),
            duration: `${classroom.duration} hr`,
            joinLink: classroom.joinLink,
            createdAt: classroom.createdAt,
          });
        });

        activities.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setActivities(activities);

      } catch (error) {
        console.error("Error fetching user classes:", error);
      }
    };
    getUserClasses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-5xl mt-[80px] mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Welcome to Cyber Forensics IT312
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {activities?.map((item, idx) => {
            const getStatusColor = (submitted, attempted) => {
              if (item.type === "class") return "bg-blue-50 text-blue-700";
              if (item.type === "assignment")
                return submitted
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700";
              return attempted
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700";
            };

            const getIcon = (type) => {
              switch (type) {
                case "class":
                  return "📘";
                case "assignment":
                  return "📄";
                case "test":
                  return "📝";
                default:
                  return "";
              }
            };

            return (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => {
                  if (item.type === "class" && item.joinLink) {
                    window.open(item.joinLink, "_blank");
                  } else if (item.type === "assignment") {
                    window.location.href = `/submit-assignment?name=${encodeURIComponent(
                      item.name
                    )}`;
                  } else if (item.type === "test") {
                    window.location.href = `/test-page?name=${encodeURIComponent(
                      item.name
                    )}`;
                  }
                }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl font-bold">
                      {getIcon(item.type)}
                    </div>
                    <div
                      className={`px-4 py-1 rounded-full text-sm ${getStatusColor(
                        item.submitted,
                        item.attempted
                      )}`}
                    >
                      {item.type === "class"
                        ? "Live"
                        : item.submitted || item.attempted
                        ? "Completed"
                        : "Pending"}
                    </div>
                  </div>

                  <h2 className="text-xl font-semibold mb-2 text-gray-900">
                    {item.name || item.topic}
                  </h2>

                  <div className="space-y-2 text-gray-600 text-sm">
                    {item.type === "class" && (
                      <p>Starts at: {item.startTime}</p>
                    )}
                    {item.deadline && <p>Due: {item.deadline}</p>}
                    {item.duration && <p>Duration: {item.duration}</p>}
                    {item.totalMarks && <p>Marks: {item.totalMarks}</p>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
