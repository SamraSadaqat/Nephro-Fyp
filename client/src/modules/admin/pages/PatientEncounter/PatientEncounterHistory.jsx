// import React from 'react';
// const PatientEncounterHistory=()=>{
//     return(
//         <div>
//             hghfhh
//         </div>
//     )
// }
// export default PatientEncounterHistory;
// import React, { useEffect, useState } from 'react';

// const PatientEncounterHistory = () => {
//   const [encounterHistory, setEncounterHistory] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Fetch encounter history from the API
//   useEffect(() => {
//     const fetchData = async () => {
//       const token = localStorage.getItem('accessToken'); // Retrieve token from localStorage (or use another method)

//       if (!token) {
//         setError("User not authenticated. Please log in.");
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await fetch('http://localhost:5000/patient_profiling', {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.error || "Failed to fetch data");
//         }

//         const data = await response.json();
//         setEncounterHistory(data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div
//       style={{
//         backgroundColor: 'white',
//         minHeight: '100vh',
//         padding: '20px',
//         fontFamily: 'Arial, sans-serif',
//         color: 'darkblue',
//       }}
//     >
//       <h1 style={{ textAlign: 'center', color: 'darkblue' }}>
//         Patient Encounter History
//       </h1>

//       {loading ? (
//         <p style={{ textAlign: 'center', fontWeight: 'bold' }}>Loading...</p>
//       ) : error ? (
//         <p style={{ textAlign: 'center', color: 'red', fontWeight: 'bold' }}>
//           {error}
//         </p>
//       ) : encounterHistory.length === 0 ? (
//         <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
//           No encounter history found.
//         </p>
//       ) : (
//         <div
//           style={{
//             margin: '20px auto',
//             maxWidth: '600px',
//             padding: '20px',
//             border: '1px solid darkblue',
//             borderRadius: '8px',
//           }}
//         >
//           {encounterHistory.map((encounter, index) => (
//             <div
//               key={index}
//               style={{
//                 marginBottom: '15px',
//                 padding: '15px',
//                 backgroundColor: 'lightblue',
//                 borderRadius: '5px',
//                 boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//               }}
//             >
//               <p>
//                 <strong>Patient Name:</strong> {encounter['patient-name']}
//               </p>
//               <p>
//                 <strong>Patient Age:</strong> {encounter['patient-age']}
//               </p>
//               <p>
//                 <strong>Test Date/Time:</strong> {encounter['test-date-time']}
//               </p>
//               <p>
//                 <strong>User ID:</strong> {encounter['user-id']}
//               </p>
//               <p>
//                 <strong>Test Results:</strong>
//               </p>
//               <ul>
//                 {Object.entries(encounter)
//                   .filter(([key]) =>
//                     !['patient-name', 'patient-age', 'test-date-time', 'user-id', '_id'].includes(key)
//                   )
//                   .map(([test, result], idx) => (
//                     <li key={idx}>
//                       {test}: {result}
//                     </li>
//                   ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PatientEncounterHistory;
import React, { useEffect, useState } from "react";

const PatientEncounterHistory = () => {
  const [encounterHistory, setEncounterHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch encounter history from the API
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken"); // Retrieve token from localStorage (or use another method)

      if (!token) {
        setError("User not authenticated. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/patient_profiling", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch data");
        }

        const data = await response.json();
        setEncounterHistory(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#f0f4f8",
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "'Roboto', Arial, sans-serif",
        color: "#333",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#1e3a8a",
          fontSize: "2rem",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        Patient Encounter History
      </h1>

      {loading ? (
        <p
          style={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#1e3a8a",
            fontSize: "1.2rem",
          }}
        >
          Loading...
        </p>
      ) : error ? (
        <p
          style={{
            textAlign: "center",
            color: "#d32f2f",
            fontWeight: "bold",
            fontSize: "1.2rem",
          }}
        >
          {error}
        </p>
      ) : encounterHistory.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#616161",
            fontSize: "1.2rem",
          }}
        >
          No encounter history found.
        </p>
      ) : (
        <div
          style={{
            margin: "20px auto",
            maxWidth: "800px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {encounterHistory.map((encounter, index) => (
            <div
              key={index}
              style={{
                padding: "20px",
                backgroundColor: "#ffffff",
                borderRadius: "10px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "pointer",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 8px 16px rgba(0, 0, 0, 0.2)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 4px 6px rgba(0, 0, 0, 0.1)")
              }
            >
              <h3
                style={{
                  marginBottom: "10px",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  color: "#1e3a8a",
                }}
              >
                {encounter["patient-name"]}
              </h3>
              <p
                style={{
                  marginBottom: "10px",
                  fontSize: "0.9rem",
                  color: "#555",
                }}
              >
                <strong>Age:</strong> {encounter["patient-age"]}
              </p>
              <p
                style={{
                  marginBottom: "10px",
                  fontSize: "0.9rem",
                  color: "#555",
                }}
              >
                <strong>Date/Time:</strong> {encounter["test-date-time"]}
              </p>
              <p
                style={{
                  marginBottom: "10px",
                  fontSize: "0.9rem",
                  color: "#555",
                }}
              >
                <strong>User ID:</strong> {encounter["user-id"]}
              </p>
              <div>
                <strong style={{ color: "#1e3a8a" }}>Test Results:</strong>
                <ul style={{ paddingLeft: "20px", marginTop: "10px" }}>
                  {Object.entries(encounter)
                    .filter(
                      ([key]) =>
                        ![
                          "patient-name",
                          "patient-age",
                          "test-date-time",
                          "user-id",
                          "_id",
                        ].includes(key)
                    )
                    .map(([test, result], idx) => (
                      <li
                        key={idx}
                        style={{
                          fontSize: "0.9rem",
                          color: "#444",
                          marginBottom: "5px",
                        }}
                      >
                        {test}: {result}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientEncounterHistory;
