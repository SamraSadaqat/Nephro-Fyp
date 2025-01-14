// import React from 'react';
// export default function Dashboard() {
//     return (
//         <div>
//             Dashboard gfggdg
//         </div>
//     )
// }

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function Dashboard() {
//   const [stats, setStats] = useState({
//     userCount: 0,
//     testResultCount: 0,
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get("http://localhost:5000/api/dashboard-stats"); // URL for Flask backend
//         setStats(response.data);
//       } catch (err) {
//         console.error("Error fetching stats:", err);
//         setError("Failed to fetch data. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.header}>Admin Dashboard</h1>
//       <div style={styles.cardContainer}>
//         <div style={styles.card}>
//           <h2>Total Users</h2>
//           <p>{stats.userCount}</p>
//         </div>
//         <div style={styles.card}>
//           <h2>Total Test Results</h2>
//           <p>{stats.testResultCount}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Styles for the component
// const styles = {
//   container: {
//     fontFamily: "Arial, sans-serif",
//     padding: "20px",
//     textAlign: "center",
//   },
//   header: {
//     marginBottom: "20px",
//   },
//   cardContainer: {
//     display: "flex",
//     justifyContent: "center",
//     gap: "20px",
//   },
//   card: {
//     border: "1px solid #ddd",
//     borderRadius: "8px",
//     padding: "20px",
//     width: "200px",
//     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//     textAlign: "center",
//   },
// };
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Card, CardContent, Typography, Grid, Box, CircularProgress } from "@mui/material";

// export default function Dashboard() {
//   const [stats, setStats] = useState({
//     userCount: 0,
//     testResultCount: 0,
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get("http://localhost:5000/api/dashboard-stats"); // URL for Flask backend
//         setStats(response.data);
//       } catch (err) {
//         console.error("Error fetching stats:", err);
//         setError("Failed to fetch data. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, []);

//   if (loading) {
//     return (
//       <Box sx={styles.centeredBox}>
//         <CircularProgress size={60} />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box sx={styles.centeredBox}>
//         <Typography variant="h6" color="error">
//           {error}
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={styles.container}>
//       <Typography variant="h3" sx={styles.header}>
//         Admin Dashboard
//       </Typography>
//       <Grid container spacing={4} justifyContent="center" sx={styles.gridContainer}>
//         <Grid item xs={12} sm={6} md={4}>
//           <Card sx={styles.card}>
//             <CardContent>
//               <Typography variant="h5" sx={styles.cardTitle}>Total Users</Typography>
//               <Typography variant="h4" sx={styles.cardValue}>{stats.userCount}</Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} sm={6} md={4}>
//           <Card sx={styles.card}>
//             <CardContent>
//               <Typography variant="h5" sx={styles.cardTitle}>Total Test Results</Typography>
//               <Typography variant="h4" sx={styles.cardValue}>{stats.testResultCount}</Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }

// // Styles for the component using Material-UI's sx prop
// const styles = {
//   container: {
//     backgroundColor: "#fff",
//     padding: "20px",
//     minHeight: "100vh",
//   },
//   header: {
//     textAlign: "center",
//     marginBottom: "40px",
//     fontWeight: "bold",
//     color: "#333",
//   },
//   gridContainer: {
//     display: "flex",
//     justifyContent: "center",
//     gap: "20px",
//   },
//   card: {
//     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//     borderRadius: "8px",
//     padding: "20px",
//     backgroundColor: "#f7f7f7",
//     textAlign: "center",
//     transition: "transform 0.3s ease",
//     "&:hover": {
//       transform: "translateY(-10px)",
//       boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
//     },
//   },
//   cardTitle: {
//     fontWeight: "500",
//     color: "#555",
//   },
//   cardValue: {
//     fontWeight: "bold",
//     color: "#2c6bb8",
//     fontSize: "2rem",
//   },
//   centeredBox: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     height: "100vh",
//   },
// };
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Grid, Box, CircularProgress, Button } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Updated for React Router v6

export default function Dashboard() {
  const [stats, setStats] = useState({
    userCount: 0,
    testResultCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // React Router for navigation

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/dashboard-stats"); // URL for Flask backend
        setStats(response.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = () => {
    // Clear authentication data from localStorage (assuming it's stored here)
    localStorage.removeItem("authToken"); // Change if using a different storage method

    // Redirect to login page
    navigate("/login");
  };

  if (loading) {
    return (
      <Box sx={styles.centeredBox}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={styles.centeredBox}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={styles.container}>
      <Typography variant="h3" sx={styles.header}>
        Admin Dashboard
      </Typography>

      {/* Logout Button */}
      <Box sx={styles.logoutContainer}>
        <Button variant="contained" color="error" onClick={handleLogout} sx={styles.logoutButton}>
          Logout
        </Button>
      </Box>

      <Grid container spacing={4} justifyContent="center" sx={styles.gridContainer}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={styles.card}>
            <CardContent>
              <Typography variant="h5" sx={styles.cardTitle}>Total Users</Typography>
              <Typography variant="h4" sx={styles.cardValue}>{stats.userCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={styles.card}>
            <CardContent>
              <Typography variant="h5" sx={styles.cardTitle}>Total Test Results</Typography>
              <Typography variant="h4" sx={styles.cardValue}>{stats.testResultCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

// Styles for the component using Material-UI's sx prop
const styles = {
  container: {
    backgroundColor: "#fff",
    padding: "20px",
    minHeight: "100vh",
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
    fontWeight: "bold",
    color: "#333",
  },
  logoutContainer: {
    textAlign: "right",
    marginBottom: "20px",
  },
  logoutButton: {
    backgroundColor: "#f44336", // Red color for logout button
    "&:hover": {
      backgroundColor: "#d32f2f", // Darker red on hover
    },
  },
  gridContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
  card: {
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    padding: "20px",
    backgroundColor: "#f7f7f7",
    textAlign: "center",
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "translateY(-10px)",
      boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
    },
  },
  cardTitle: {
    fontWeight: "500",
    color: "#555",
  },
  cardValue: {
    fontWeight: "bold",
    color: "#2c6bb8",
    fontSize: "2rem",
  },
  centeredBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
};
