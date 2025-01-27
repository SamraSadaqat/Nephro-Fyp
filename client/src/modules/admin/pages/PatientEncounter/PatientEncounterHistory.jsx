import React, { useState } from "react"; // Removed useEffect import

const PatientEncounterHistory = () => {
  const [encounterHistory, setEncounterHistory] = useState([]);
  const [dietPlan, setDietPlan] = useState(null); // State to store diet plan
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showHistory, setShowHistory] = useState(false); // State to toggle history visibility
  const [showDietPlan, setShowDietPlan] = useState(false); // State to toggle diet plan visibility

  // Fetch encounter history from the API
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

  // Fetch diet plan from the API
  const fetchDietPlan = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setError("User not authenticated. Please log in.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/get-diet-plan", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch diet plan");
      }

      const data = await response.json();
      setDietPlan(data); // Set the fetched diet plan data
    } catch (err) {
      setError(err.message);
    }
  };

  const handleShowHistory = () => {
    setShowHistory(true); // Trigger the history display
    fetchData(); // Fetch data when the button is clicked
  };

  const handleShowDietPlan = () => {
    setShowDietPlan(true); // Trigger the diet plan display
    fetchDietPlan(); // Fetch the diet plan data when the button is clicked
  };

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

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button
          onClick={handleShowHistory}
          style={{
            padding: "10px 20px",
            backgroundColor: "#1e3a8a",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "background-color 0.2s",
            marginRight: "10px", // Adding some space between the buttons
          }}
        >
          Show Test History
        </button>

        <button
          onClick={handleShowDietPlan}
          style={{
            padding: "10px 20px",
            backgroundColor: "#1e3a8a",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
        >
          Show Diet Plan
        </button>
      </div>

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
      ) : showHistory && encounterHistory.length > 0 ? (
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
                  "0 8px 16px rgba(0, 0, 0, 0.2)")}
              onMouseOut={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 4px 6px rgba(0, 0, 0, 0.1)")}
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
      ) : null}

      {showDietPlan && dietPlan && (
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            maxWidth: "800px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <h3 style={{ color: "#1e3a8a", fontSize: "1.5rem", fontWeight: "bold" }}>
            Diet Plan
          </h3>

          <p style={{ fontSize: "1rem", color: "#555" }}>
            <strong>CKD Stage Message:</strong> {dietPlan.ckdStageMessage}
          </p>
          <p style={{ fontSize: "1rem", color: "#555" }}>
            <strong>GFR Result:</strong> {dietPlan.gfrResult}
          </p>

          <div>
            <strong style={{ color: "#1e3a8a" }}>Meal Plan:</strong>
            <ul style={{ paddingLeft: "20px", marginTop: "10px" }}>
              {dietPlan.mealPlan &&
                Object.entries(dietPlan.mealPlan).map(([meal, food], idx) => (
                  <li
                    key={idx}
                    style={{
                      fontSize: "1rem",
                      color: "#444",
                      marginBottom: "5px",
                    }}
                  >
                    <strong>{meal.charAt(0).toUpperCase() + meal.slice(1)}:</strong> {food}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientEncounterHistory;
