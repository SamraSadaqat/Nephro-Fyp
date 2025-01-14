// import { Row, Col } from "antd";
// import React from "react";
// import Patients from "./Patients";
// // import Footer from "modules/common/components/Footer";
// import PatientsReport from "./PatientsReport";
// import AuthFooter from "../Dashboard/AuthFooter";
// import GfrCalculator from "./GfrCalculator";
// import Main from "./Main";

// const PatientEncounter = () => {
//   return (
//     <>
//       <DashboardView />
//     </>
//   );
// };

// export default PatientEncounter;

// const DashboardView = () => {
//   return (
//     <Row>
//       <header className="top-header"></header>
//       <Col span={24} className="dashboardResultImage">
//       <Main/>
//       <Patients/>
//       <PatientsReport/>
//       <GfrCalculator/>
//       <AuthFooter/>
//       </Col>
     
//     </Row>
    
//   );
// };
// import React, { useState } from "react";
// import { Row, Col, Steps, Button } from "antd";
// import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from "@ant-design/icons";
// import Patients from "./Patients";
// import PatientsReport from "./PatientsReport";
// import GfrCalculator from "./GfrCalculator";
// import AuthFooter from "../Dashboard/AuthFooter";
// import Main from "./Main";

// const PatientEncounter = () => {
//   return (
//     <>
//       <DashboardView />
//     </>
//   );
// };

// export default PatientEncounter;

// const DashboardView = () => {
//   // State to manage the current step in the Steps component
//   const [currentStep, setCurrentStep] = useState(0);

//   // Define each step's content
//   const steps = [
//     {
//       title: "Main",
//       content: <Main />,
//       icon: <UserOutlined />,
//     },
//     {
//       title: "Patients",
//       content: <Patients />,
//       icon: <SolutionOutlined />,
//     },
//     {
//       title: "Patients Report",
//       content: <PatientsReport />,
//       icon: <LoadingOutlined />,
//     },
//     {
//       title: "GFR Calculator",
//       content: <GfrCalculator />,
//       icon: <SmileOutlined />,
//     },
//     {
//       title: "Footer",
//       content: <AuthFooter />,
//       icon: <SmileOutlined />,
//     },
//   ];

//   // Function to go to the next step
//   const next = () => {
//     setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
//   };

//   // Function to go to the previous step
//   const prev = () => {
//     setCurrentStep((prev) => Math.max(prev - 1, 0));
//   };

//   return (
//     <Row>
//       <header className="top-header"></header>
//       <Col span={24} className="dashboardResultImage">
//         {/* Render the Steps component */}
//         <Steps current={currentStep}>
//           {steps.map((item, index) => (
//             <Steps.Step key={index} title={item.title} icon={item.icon} />
//           ))}
//         </Steps>

//         {/* Render the content for the current step */}
//         <div className="steps-content" style={{ padding: "20px 0" }}>
//           {steps[currentStep].content}
//         </div>

//         {/* Navigation buttons */}
//         <div className="steps-action">
//           {currentStep > 0 && (
//             <Button style={{ marginRight: 8 }} onClick={() => prev()}>
//               Previous
//             </Button>
//           )}
//           {currentStep < steps.length - 1 && (
//             <Button type="primary" onClick={() => next()}>
//               Next
//             </Button>
//           )}
//         </div>
//       </Col>
//     </Row>
//   );
// };
// import React, { useState } from "react";
// import { Row, Col, Steps, Button } from "antd";
// import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from "@ant-design/icons";
// import Patients from "./Patients";
// import PatientsReport from "./PatientsReport";
// import GfrCalculator from "./GfrCalculator";
// import AuthFooter from "../Dashboard/AuthFooter";

// const PatientEncounter = () => {
//   return (
//     <>
//       <DashboardView />
//     </>
//   );
// };

// export default PatientEncounter;

// const DashboardView = () => {
//   // State to manage the current step in the Steps component
//   const [currentStep, setCurrentStep] = useState(0);

//   // Define each step's content (starting from Patients)
//   const steps = [
//     {
//       title: "BMI Calculator",
//       content: <Patients />,
//       icon: <UserOutlined />,
//     },
//     {
//       title: "Patients Report",
//       content: <PatientsReport />,
//       icon: <SolutionOutlined />,
//     },
//     {
//       title: "GFR Calculator and Diet Plan",
//       content: <GfrCalculator />,
//       icon: <LoadingOutlined />,
//     },
//     {
//       title: "History",
//       content: <AuthFooter />,
//       icon: <SmileOutlined />,
//     },
//   ];

//   // Function to go to the next step
//   const next = () => {
//     setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
//   };

//   // Function to go to the previous step
//   const prev = () => {
//     setCurrentStep((prev) => Math.max(prev - 1, 0));
//   };

//   return (
//     <Row style={{ backgroundColor: "white", minHeight: "100vh", padding: "20px" }}>
//       <header className="top-header" style={{ marginBottom: "20px" }}></header>
//       <Col span={24} className="dashboardResultImage" style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px" }}>
//         {/* Render the Steps component */}
//         <Steps current={currentStep}>
//           {steps.map((item, index) => (
//             <Steps.Step key={index} title={item.title} icon={item.icon} />
//           ))}
//         </Steps>

//         {/* Render the content for the current step */}
//         <div className="steps-content" style={{ padding: "20px 0", backgroundColor: "white" }}>
//           {steps[currentStep].content}
//         </div>

//         {/* Navigation buttons */}
//         <div className="steps-action" style={{ marginTop: "20px" }}>
//           {currentStep > 0 && (
//             <Button style={{ marginRight: 8 }} onClick={() => prev()}>
//               Previous
//             </Button>
//           )}
//           {currentStep < steps.length - 1 && (
//             <Button type="primary" onClick={() => next()}>
//               Next
//             </Button>
//           )}
//         </div>
//    
// import { Row, Col, Steps, Button, notification } from "antd";
// import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from "@ant-design/icons";
// import Patients from "./Patients";
// import PatientsReport from "./PatientsReport";
// import GfrCalculator from "./GfrCalculator";
// import AuthFooter from "../Dashboard/AuthFooter";

// import React from "react";
// import { Card, Button } from "antd";
// import { Route, Routes } from "react-router-dom";
// import PatientEncounterView from "./PatientEncounterView";
// import {useNavigate} from 'react-router-dom';
// import PatientEncounterHistory from './PatientEncounterHistory'


// const PatientEncounter = () => {
//   const navigate = useNavigate()
//   const navigateHandler = (link) =>  {
//     navigate(`${link}`)
//     }

//   return (
//     <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
//       <Card
//         title="Patient Input"
//         bordered={true}
//         style={{
//           width: 300,
//           textAlign: "center",
//           boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//         }}
//       >
//         <Button 
//         onClick= {()=> navigateHandler('patient-input')}

//           type="primary"
//           style={{ width: "100%", marginTop: "10px" }}
//         >
//           Go to Patient Input
//         </Button>
//       </Card>

//       <Card
//         title="Patient History"
//         bordered={true}
//         style={{
//           width: 300,
//           textAlign: "center",
//           boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//         }}
//       >
//         <Button
//         onClick= {()=> navigateHandler('patient-history')}
//           type="primary"
//           style={{ width: "100%", marginTop: "10px" }}
//         >
//           Go to Patient History
//         </Button>
//       </Card>
//     </div>
//   );
// };

// const PatientEncounterContainer = () =>{
//   return(
    
//     <div>
//       <Routes>
//       <Route index element={<PatientEncounter />} />
//           <Route path="/patient-input" element={<PatientEncounterView/>} />
//           <Route path="/patient-history" element={<PatientEncounterHistory/>} />
        
//       </Routes>

//     </div>
  
//   )
// }
// export default PatientEncounterContainer;

// import React from "react";
// import { Card, Button } from "antd";
// import { Route, Routes } from "react-router-dom";
// import PatientEncounterView from "./PatientEncounterView";
// import { useNavigate } from "react-router-dom";
// import PatientEncounterHistory from './PatientEncounterHistory';

// const PatientEncounter = () => {
//   const navigate = useNavigate();

//   const navigateHandler = (link) => {
//     navigate(`${link}`);
//   };

//   // Inline styles
//   const containerStyle = {
//     display: "flex",
//     gap: "20px",
//     padding: "40px",
//     justifyContent: "center",
//     backgroundColor: "#f0f2f5",
//   };

//   const cardStyle = {
//     width: "300px",
//     textAlign: "center",
//     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//     borderRadius: "8px",
//   };

//   const buttonStyle = {
//     width: "100%",
//     marginTop: "10px",
//     backgroundColor: "#003366",
//     borderColor: "#003366",
//     color: "white",
//   };

//   const buttonHoverStyle = {
//     backgroundColor: "#0055a5",
//     borderColor: "#0055a5",
//   };

//   return (
//     <div style={containerStyle}>
//       <Card title="Patient Input" bordered={true} style={cardStyle}>
//         <Button
//           onClick={() => navigateHandler("patient-input")}
//           type="primary"
//           style={buttonStyle}
//           onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
//           onMouseLeave={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
//         >
//           Go to Patient Input
//         </Button>
//       </Card>

//       <Card title="Patient History" bordered={true} style={cardStyle}>
//         <Button
//           onClick={() => navigateHandler("patient-history")}
//           type="primary"
//           style={buttonStyle}
//           onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
//           onMouseLeave={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
//         >
//           Go to Patient History
//         </Button>
//       </Card>
//     </div>
//   );
// };

// const PatientEncounterContainer = () => {
//   return (
//     <div>
//       <Routes>
//         <Route index element={<PatientEncounter />} />
//         <Route path="/patient-input" element={<PatientEncounterView />} />
//         <Route path="/patient-history" element={<PatientEncounterHistory />} />
//       </Routes>
//     </div>
//   );
// };

// export default PatientEncounterContainer;
import React from "react";
import { Card, Button } from "antd";
import { Route, Routes } from "react-router-dom";
import PatientEncounterView from "./PatientEncounterView";
import { useNavigate } from "react-router-dom";
import PatientEncounterHistory from './PatientEncounterHistory';

const PatientEncounter = () => {
  const navigate = useNavigate();

  const navigateHandler = (link) => {
    navigate(`${link}`);
  };

  // Inline styles
  const containerStyle = {
    display: "flex",
    gap: "20px",
    padding: "40px",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f2f5", // This can remain for content background
    minHeight: "100vh", // Ensures the container fills the full viewport height
    width: "100vw", // Ensures the container spans the full viewport width
    margin: 0,
  };

  const cardStyle = {
    width: "300px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
  };

  const buttonStyle = {
    width: "100%",
    marginTop: "10px",
    backgroundColor: "#003366",
    borderColor: "#003366",
    color: "white",
  };

  const buttonHoverStyle = {
    backgroundColor: "#0055a5",
    borderColor: "#0055a5",
  };

  return (
    <div style={containerStyle}>
      <Card title="Patient Input" bordered={true} style={cardStyle}>
        <Button
          onClick={() => navigateHandler("patient-input")}
          type="primary"
          style={buttonStyle}
          onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
        >
          Go to Patient Input
        </Button>
      </Card>

      <Card title="Patient History" bordered={true} style={cardStyle}>
        <Button
          onClick={() => navigateHandler("patient-history")}
          type="primary"
          style={buttonStyle}
          onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
        >
          Go to Patient History
        </Button>
      </Card>
    </div>
  );
};

const PatientEncounterContainer = () => {
  // Parent wrapper to ensure the background spans the entire screen
  const wrapperStyle = {
    backgroundColor: "#ffffff", // Full white background
    minHeight: "100vh", // Full viewport height
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
  };

  return (
    <div style={wrapperStyle}>
      <Routes>
        <Route index element={<PatientEncounter />} />
        <Route path="/patient-input" element={<PatientEncounterView />} />
        <Route path="/patient-history" element={<PatientEncounterHistory />} />
      </Routes>
    </div>
  );
};

export default PatientEncounterContainer;
