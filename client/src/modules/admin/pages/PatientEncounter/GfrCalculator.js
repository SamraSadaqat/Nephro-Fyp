// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function GfrCalculator() {
//   const [sex, setSex] = useState('');
//   const [age, setAge] = useState('');
//   const [serumCreatinine, setSerumCreatinine] = useState('');
//   const [gfrResult, setGfrResult] = useState(null);
//   const [gfrError, setGfrError] = useState('');
//   const [ckdStageMessage, setCkdStageMessage] = useState('');
//   const [showMealFilter, setShowMealFilter] = useState(false);
//   const [mealOption, setMealOption] = useState('3');
//   const [isDiabetic, setIsDiabetic] = useState(false);

//   const fetchAge = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/latest-age');
//       setAge(response.data.age);
//     } catch (error) {
//       console.error('Error fetching age:', error);
//       setGfrError('Failed to fetch age from the database.');
//     }
//   };

//   const fetchCreatinine = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/latest-creatinine');
//       setSerumCreatinine(response.data.creatinine);
//     } catch (error) {
//       console.error('Error fetching serum creatinine:', error);
//       setGfrError('Failed to fetch creatinine from the database.');
//     }
//   };

//   const getCkdStageMessage = (gfr) => {
//     if (gfr >= 90) {
//       return 'Stage 1: Kidney damage with normal kidney function.';
//     } else if (gfr >= 60) {
//       return 'Stage 2: Kidney damage with mild loss of kidney function.';
//     } else if (gfr >= 45) {
//       return 'Stage 3a: Mild to moderate loss of kidney function.';
//     } else if (gfr >= 30) {
//       return 'Stage 3b: Moderate to severe loss of kidney function.';
//     } else if (gfr >= 15) {
//       return 'Stage 4: Severe loss of kidney function.';
//     } else {
//       return 'Stage 5: Kidney failure.';
//     }
//   };

//   const calculateGfr = () => {
//     if (!sex || !age || !serumCreatinine) {
//       setGfrError('Please fill in all fields.');
//       return;
//     }
//     setGfrError('');

//     // GFR Calculation formula (MDRD equation)
//     const gfr = 140 - age + (sex === 'female' ? -5 : 0) - (serumCreatinine * 10);
//     setGfrResult(gfr);
//     const stageMessage = getCkdStageMessage(gfr);
//     setCkdStageMessage(stageMessage);

//     if (gfr < 30) {
//       window.alert('Your GFR indicates Stage 4 or 5. Please consult your doctor.');
//     }
//   };

//   useEffect(() => {
//     fetchAge();
//     fetchCreatinine();
//     const interval = setInterval(() => {
//       fetchAge();
//       fetchCreatinine();
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const generateMealPlan = () => {
//     setShowMealFilter(true);
//   };

//   const getMealPlan = (stage) => {
//     const mealPlans = {
//       'Stage 2': {
//         breakfast: '1 CD-sized chapatti or paratha + 6-7 tbsp curry/omelet + tea',
//         midMeal: '1-2 apples or ¼ cup of melons',
//         lunch: '1-2 CD-sized chapatti/1 cup boiled rice + 5-6 tbsp curry or lentils + salad',
//         eveningNourishment: '1-2 cups of popcorns + tea',
//         dinner: '1-2 CD-sized chapatti + 5-6 tbsp curry + salad',
//         bedtime: '1 cup low-fat milk + honey',
//       },
//       'Stage 3a': {
//         breakfast: '2 multigrain/white bread slices + omelet',
//         midMeal: 'Handful of mixed nuts',
//         lunch: 'Wrap with veggies + chicken',
//         eveningNourishment: '1 cup low-fat yogurt + tea',
//         dinner: 'Biryani/pulao + salad + raita',
//         bedtime: '1 cup of green tea',
//       },
//       'Stage 3b': {
//         breakfast: 'Oats + milk + honey + 1 boiled egg',
//         midMeal: '1-2 cups of popcorns',
//         lunch: 'Chole chaat/salad',
//         eveningNourishment: '1-2 apples/guava + tea',
//         dinner: 'Pasta/Spaghetti + chicken + veggies',
//         bedtime: 'Handful of mixed nuts',
//       },
//     };

//     const selectedMeals = mealPlans[stage] || {};

//     // Exclude items for diabetic patients
//     const diabeticExclusions = ['sugar', 'honey'];
//     if (isDiabetic) {
//       Object.keys(selectedMeals).forEach((meal) => {
//         diabeticExclusions.forEach((exclude) => {
//           selectedMeals[meal] = selectedMeals[meal].replace(new RegExp(exclude, 'gi'), '');
//         });
//       });
//     }

//     // Adjust meals based on meal option
//     if (mealOption === '3') {
//       // Only keep breakfast, lunch, and dinner
//       return {
//         breakfast: selectedMeals.breakfast,
//         lunch: selectedMeals.lunch,
//         dinner: selectedMeals.dinner,
//       };
//     } else if (mealOption === '6') {
//       // Include all meals except snack
//       return {
//         breakfast: selectedMeals.breakfast,
//         midMeal: selectedMeals.midMeal,
//         lunch: selectedMeals.lunch,
//         eveningNourishment: selectedMeals.eveningNourishment,
//         dinner: selectedMeals.dinner,
//         bedtime: selectedMeals.bedtime,
//       };
//     }

//     return {};
//   };

//   const mealPlan = gfrResult !== null ? getMealPlan(ckdStageMessage.split(':')[0]) : {};

//   return (
//     <div style={{ padding: '20px', backgroundColor: '#f4f4f4', fontFamily: "'Arial', sans-serif", textAlign: 'center', borderRadius: '10px', maxWidth: '500px', margin: '0 auto', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
//       <h2 style={{ color: '#007BFF', marginBottom: '20px' }}>GFR Calculator</h2>
//       <select
//         value={sex}
//         onChange={(e) => setSex(e.target.value)}
//         style={{ padding: '10px', marginBottom: '10px', borderRadius: '5px', width: '100%', boxSizing: 'border-box' }}
//       >
//         <option value="">Select Sex</option>
//         <option value="male">Male</option>
//         <option value="female">Female</option>
//       </select>
//       <input
//         type="number"
//         value={age}
//         onChange={(e) => setAge(e.target.value)}
//         placeholder="Age"
//         style={{ padding: '10px', marginBottom: '10px', borderRadius: '5px', width: '100%', boxSizing: 'border-box' }}
//       />
//       <input
//         type="number"
//         value={serumCreatinine}
//         onChange={(e) => setSerumCreatinine(e.target.value)}
//         placeholder="Serum Creatinine (mg/dL)"
//         style={{ padding: '10px', marginBottom: '10px', borderRadius: '5px', width: '100%', boxSizing: 'border-box' }}
//       />
//       <button
//         onClick={calculateGfr}
//         style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
//       >
//         Calculate GFR
//       </button>
//       {gfrError && <p style={{ color: 'red' }}>{gfrError}</p>}
//       {gfrResult && (
//         <div>
//           <h3>GFR Result: {gfrResult.toFixed(2)} mL/min/1.73m²</h3>
//           <p>{ckdStageMessage}</p>
//           <button
//             onClick={generateMealPlan}
//             style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}
//           >
//             Generate Meal Plan
//           </button>
//         </div>
//       )}
//       {showMealFilter && (
//         <div>
//           <label>
//             <input
//               type="checkbox"
//               checked={isDiabetic}
//               onChange={() => setIsDiabetic(!isDiabetic)}
//             />
//             Diabetic
//           </label>
//           <label>
//             Meal Option:
//             <select
//               value={mealOption}
//               onChange={(e) => setMealOption(e.target.value)}
//               style={{ padding: '10px', marginTop: '10px', borderRadius: '5px' }}
//             >
//               <option value="3">3 Meals</option>
//               <option value="6">6 Meals</option>
//             </select>
//           </label>
//           <div>
//             <h3>Meal Plan:</h3>
//             <ul>
//               {Object.entries(mealPlan).map(([meal, plan]) => (
//                 <li key={meal}>
//                   <strong>{meal.charAt(0).toUpperCase() + meal.slice(1)}:</strong> {plan}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default GfrCalculator;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function GfrCalculator() {
//   const [sex, setSex] = useState('');
//   const [age, setAge] = useState('');
//   const [serumCreatinine, setSerumCreatinine] = useState('');
//   const [gfrResult, setGfrResult] = useState(null);
//   const [gfrError, setGfrError] = useState('');
//   const [ckdStageMessage, setCkdStageMessage] = useState('');
//   const [showMealFilter, setShowMealFilter] = useState(false);
//   const [mealOption, setMealOption] = useState('3');
//   const [isDiabetic, setIsDiabetic] = useState(false);

//   const fetchAge = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/latest-age');
//       setAge(response.data.age);
//     } catch (error) {
//       console.error('Error fetching age:', error);
//       setGfrError('Failed to fetch age from the database.');
//     }
//   };

//   const fetchCreatinine = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/latest-creatinine');
//       setSerumCreatinine(response.data.creatinine);
//     } catch (error) {
//       console.error('Error fetching serum creatinine:', error);
//       setGfrError('Failed to fetch creatinine from the database.');
//     }
//   };

//   const getCkdStageMessage = (gfr) => {
//     if (gfr >= 90) {
//       return 'Stage 1: Kidney damage with normal kidney function.';
//     } else if (gfr >= 60) {
//       return 'Stage 2: Kidney damage with mild loss of kidney function.';
//     } else if (gfr >= 45) {
//       return 'Stage 3a: Mild to moderate loss of kidney function.';
//     } else if (gfr >= 30) {
//       return 'Stage 3b: Moderate to severe loss of kidney function.';
//     } else if (gfr >= 15) {
//       return 'Stage 4: Severe loss of kidney function.';
//     } else {
//       return 'Stage 5: Kidney failure.';
//     }
//   };

//   const calculateGfr = () => {
//     if (!sex || !age || !serumCreatinine) {
//       setGfrError('Please fill in all fields.');
//       return;
//     }
//     setGfrError('');

//     // GFR Calculation formula (MDRD equation)
//     const gfr = 140 - age + (sex === 'female' ? -5 : 0) - (serumCreatinine * 10);
//     setGfrResult(gfr);
//     const stageMessage = getCkdStageMessage(gfr);
//     setCkdStageMessage(stageMessage);

//     if (gfr < 30) {
//       window.alert('Your GFR indicates Stage 4 or 5. Please consult your doctor.');
//     }
//   };

//   useEffect(() => {
//     fetchAge();
//     fetchCreatinine();
//     const interval = setInterval(() => {
//       fetchAge();
//       fetchCreatinine();
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const generateMealPlan = () => {
//     setShowMealFilter(true);
//   };

//   const getMealPlan = (stage) => {
//     const mealPlans = {
//       'Stage 2': {
//         breakfast: '1 CD-sized chapatti or paratha + 6-7 tbsp curry/omelet + tea',
//         midMeal: '1-2 apples or ¼ cup of melons',
//         lunch: '1-2 CD-sized chapatti/1 cup boiled rice + 5-6 tbsp curry or lentils + salad',
//         eveningNourishment: '1-2 cups of popcorns + tea',
//         dinner: '1-2 CD-sized chapatti + 5-6 tbsp curry + salad',
//         bedtime: '1 cup low-fat milk + honey',
//       },
//       'Stage 3a': {
//         breakfast: '2 multigrain/white bread slices + omelet',
//         midMeal: 'Handful of mixed nuts',
//         lunch: 'Wrap with veggies + chicken',
//         eveningNourishment: '1 cup low-fat yogurt + tea',
//         dinner: 'Biryani/pulao + salad + raita',
//         bedtime: '1 cup of green tea',
//       },
//       'Stage 3b': {
//         breakfast: 'Oats + milk + honey + 1 boiled egg',
//         midMeal: '1-2 cups of popcorns',
//         lunch: 'Chole chaat/salad',
//         eveningNourishment: '1-2 apples/guava + tea',
//         dinner: 'Pasta/Spaghetti + chicken + veggies',
//         bedtime: 'Handful of mixed nuts',
//       },
//     };

//     const selectedMeals = mealPlans[stage] || {};

//     // Exclude items for diabetic patients
//     const diabeticExclusions = ['sugar', 'honey'];
//     if (isDiabetic) {
//       Object.keys(selectedMeals).forEach((meal) => {
//         diabeticExclusions.forEach((exclude) => {
//           selectedMeals[meal] = selectedMeals[meal].replace(new RegExp(exclude, 'gi'), '');
//         });
//       });
//     }

//     // Adjust meals based on meal option
//     if (mealOption === '3') {
//       // Only keep breakfast, lunch, and dinner
//       return {
//         breakfast: selectedMeals.breakfast,
//         lunch: selectedMeals.lunch,
//         dinner: selectedMeals.dinner,
//       };
//     } else if (mealOption === '6') {
//       // Include all meals except snack
//       return {
//         breakfast: selectedMeals.breakfast,
//         midMeal: selectedMeals.midMeal,
//         lunch: selectedMeals.lunch,
//         eveningNourishment: selectedMeals.eveningNourishment,
//         dinner: selectedMeals.dinner,
//         bedtime: selectedMeals.bedtime,
//       };
//     }

//     return {};
//   };

//   const mealPlan = gfrResult !== null ? getMealPlan(ckdStageMessage.split(':')[0]) : {};

//   // Function to save the generated meal plan in the database
//   const saveMealPlanToDB = async (mealPlan) => {
//     try {
//       const response = await axios.post('http://localhost:5000/save-diet-plan', {
//         gfrResult,
//         ckdStageMessage,
//         mealPlan,
//       });
//       console.log('Diet plan saved successfully:', response.data);
//     } catch (error) {
//       console.error('Error saving diet plan to the database:', error);
//     }
//   };

//   const handleSaveMealPlan = () => {
//     saveMealPlanToDB(mealPlan);
//   };

//   return (
//     <div style={{ padding: '20px', backgroundColor: '#f4f4f4', fontFamily: "'Arial', sans-serif", textAlign: 'center', borderRadius: '10px', maxWidth: '500px', margin: '0 auto', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
//       <h2 style={{ color: '#007BFF', marginBottom: '20px' }}>GFR Calculator</h2>
//       <select
//         value={sex}
//         onChange={(e) => setSex(e.target.value)}
//         style={{ padding: '10px', marginBottom: '10px', borderRadius: '5px', width: '100%', boxSizing: 'border-box' }}
//       >
//         <option value="">Select Sex</option>
//         <option value="male">Male</option>
//         <option value="female">Female</option>
//       </select>
//       <input
//         type="number"
//         value={age}
//         onChange={(e) => setAge(e.target.value)}
//         placeholder="Age"
//         style={{ padding: '10px', marginBottom: '10px', borderRadius: '5px', width: '100%', boxSizing: 'border-box' }}
//       />
//       <input
//         type="number"
//         value={serumCreatinine}
//         onChange={(e) => setSerumCreatinine(e.target.value)}
//         placeholder="Serum Creatinine (mg/dL)"
//         style={{ padding: '10px', marginBottom: '10px', borderRadius: '5px', width: '100%', boxSizing: 'border-box' }}
//       />
//       <button
//         onClick={calculateGfr}
//         style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
//       >
//         Calculate GFR
//       </button>
//       {gfrError && <p style={{ color: 'red' }}>{gfrError}</p>}
//       {gfrResult && (
//         <div>
//           <h3>GFR Result: {gfrResult.toFixed(2)} mL/min/1.73m²</h3>
//           <p>{ckdStageMessage}</p>
//           <button
//             onClick={generateMealPlan}
//             style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}
//           >
//             Generate Meal Plan
//           </button>
//         </div>
//       )}
//       {showMealFilter && (
//         <div>
//           <label>
//             <input
//               type="checkbox"
//               checked={isDiabetic}
//               onChange={() => setIsDiabetic(!isDiabetic)}
//             />
//             Diabetic
//           </label>
//           <label>
//             Meal Option:
//             <select
//               value={mealOption}
//               onChange={(e) => setMealOption(e.target.value)}
//               style={{ padding: '10px', marginTop: '10px', borderRadius: '5px' }}
//             >
//               <option value="3">3 Meals</option>
//               <option value="6">6 Meals</option>
//             </select>
//           </label>
//           <div>
//             <h3>Meal Plan:</h3>
//             <ul>
//               {Object.entries(mealPlan).map(([meal, plan]) => (
//                 <li key={meal}>
//                   <strong>{meal.charAt(0).toUpperCase() + meal.slice(1)}:</strong> {plan}
//                 </li>
//               ))}
//             </ul>
//             <button
//               onClick={handleSaveMealPlan}
//               style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
//             >
//               Save Meal Plan
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default GfrCalculator;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GfrCalculator() {
  const [sex, setSex] = useState('');
  const [age, setAge] = useState('');
  const [serumCreatinine, setSerumCreatinine] = useState('');
  const [gfrResult, setGfrResult] = useState(null);
  const [gfrError, setGfrError] = useState('');
  const [ckdStageMessage, setCkdStageMessage] = useState('');
  const [showMealFilter, setShowMealFilter] = useState(false);
  const [mealOption, setMealOption] = useState('3');
  const [isDiabetic, setIsDiabetic] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loader state
  const [successMessage, setSuccessMessage] = useState(''); // Success message state

  const fetchAge = async () => {
    try {
      const response = await axios.get('http://localhost:5000/latest-age');
      setAge(response.data.age);
    } catch (error) {
      console.error('Error fetching age:', error);
      setGfrError('Failed to fetch age from the database.');
    }
  };

  const fetchCreatinine = async () => {
    try {
      const response = await axios.get('http://localhost:5000/latest-creatinine');
      setSerumCreatinine(response.data.creatinine);
    } catch (error) {
      console.error('Error fetching serum creatinine:', error);
      setGfrError('Failed to fetch creatinine from the database.');
    }
  };

  const getCkdStageMessage = (gfr) => {
    if (gfr >= 90) {
      return 'Stage 1: Kidney damage with normal kidney function.';
    } else if (gfr >= 60) {
      return 'Stage 2: Kidney damage with mild loss of kidney function.';
    } else if (gfr >= 45) {
      return 'Stage 3a: Mild to moderate loss of kidney function.';
    } else if (gfr >= 30) {
      return 'Stage 3b: Moderate to severe loss of kidney function.';
    } else if (gfr >= 15) {
      return 'Stage 4: Severe loss of kidney function.';
    } else {
      return 'Stage 5: Kidney failure.';
    }
  };

  // const calculateGfr = () => {
  //   if (!sex || !age || !serumCreatinine) {
  //     setGfrError('Please fill in all fields.');
  //     return;
  //   }
  //   setGfrError('');

  //   // GFR Calculation formula (MDRD equation)
  //   const gfr = 140 - age + (sex === 'female' ? -5 : 0) - (serumCreatinine * 10);
  //   setGfrResult(gfr);
  //   const stageMessage = getCkdStageMessage(gfr);
  //   setCkdStageMessage(stageMessage);

  //   if (gfr < 30) {
  //     window.alert('Your GFR indicates Stage 4 or 5. Please consult your doctor.');
  //   }
  // };


  // Function to retrieve a token (for example, from localStorage)
  // const getToken = () => {
  //   return localStorage.getItem('accessToken') || '';
  // };

  // const calculateGfr = async () => {
  //   if (!sex || !age || !serumCreatinine) {
  //     setGfrError('Please fill in all fields.');
  //     return;
  //   }
  //   setGfrError('');
  
  //   // GFR Calculation formula (MDRD equation)
  //   const gfr = 140 - age + (sex === 'female' ? -5 : 0) - (serumCreatinine * 10);
  //   setGfrResult(gfr);
  //   const stageMessage = getCkdStageMessage(gfr);
  //   setCkdStageMessage(stageMessage);
  
  //   if (gfr < 30) {
  //     window.alert('Your GFR indicates Stage 4 or 5. Please consult your doctor.');
  //   }
  
  //   // Save GFR to the backend
  //   try {

  //     const response = await fetch('http://localhost:5000/save-gfr', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ gfr }),
  //     });
  
  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       console.error('Failed to save GFR:', errorData.error);
  //       window.alert('Failed to save GFR to the database.');
  //     } else {
  //       const responseData = await response.json();
  //       console.log('GFR saved successfully:', responseData);
  //     }
  //   } catch (error) {
  //     console.error('Error while saving GFR:', error);
  //     window.alert('An error occurred while saving GFR to the database.');
  //   }
  // };
  const getToken = () => {
    return localStorage.getItem('accessToken') || '';
  };
  
  const calculateGfr = async () => {
    if (!sex || !age || !serumCreatinine) {
      setGfrError('Please fill in all fields.');
      return;
    }
    setGfrError('');
  
    // GFR Calculation formula (MDRD equation)
    const gfr = 140 - age + (sex === 'female' ? -5 : 0) - (serumCreatinine * 10);
    setGfrResult(gfr);
    const stageMessage = getCkdStageMessage(gfr);
    setCkdStageMessage(stageMessage);
  
    if (gfr < 30) {
      window.alert('Your GFR indicates Stage 4 or 5. Please consult your doctor.');
    }
  
    // Save GFR to the backend
    try {
      const token = getToken(); // Use the token retrieved from localStorage
  
      const response = await fetch('http://localhost:5000/save-gfr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Add the token in the Authorization header
        },
        body: JSON.stringify({ gfr, token }), // Optionally, send the token as part of the request body if needed
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to save GFR:', errorData.error);
        window.alert('Failed to save GFR to the database.');
      } else {
        const responseData = await response.json();
        console.log('GFR saved successfully:', responseData);
      }
    } catch (error) {
      console.error('Error while saving GFR:', error);
      window.alert('An error occurred while saving GFR to the database.');
    }
  };
  

  // useEffect(() => {
  //   fetchAge();
  //   fetchCreatinine();
  //   const interval = setInterval(() => {
  //     fetchAge();
  //     fetchCreatinine();
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);

  // const generateMealPlan = () => {
  //   setShowMealFilter(true);
  // };

  // const getMealPlan = (stage) => {
  //   const mealPlans = {
  //     'Stage 2': {
  //       breakfast: '1 CD-sized chapatti or paratha + 6-7 tbsp curry/omelet + tea',
  //       midMeal: '1-2 apples or ¼ cup of melons',
  //       lunch: '1-2 CD-sized chapatti/1 cup boiled rice + 5-6 tbsp curry or lentils + salad',
  //       eveningNourishment: '1-2 cups of popcorns + tea',
  //       dinner: '1-2 CD-sized chapatti + 5-6 tbsp curry + salad',
  //       bedtime: '1 cup low-fat milk + honey',
  //     },
  //     'Stage 3a': {
  //       breakfast: '2 multigrain/white bread slices + omelet',
  //       midMeal: 'Handful of mixed nuts',
  //       lunch: 'Wrap with veggies + chicken',
  //       eveningNourishment: '1 cup low-fat yogurt + tea',
  //       dinner: 'Biryani/pulao + salad + raita',
  //       bedtime: '1 cup of green tea',
  //     },
  //     'Stage 3b': {
  //       breakfast: 'Oats + milk + honey + 1 boiled egg',
  //       midMeal: '1-2 cups of popcorns',
  //       lunch: 'Chole chaat/salad',
  //       eveningNourishment: '1-2 apples/guava + tea',
  //       dinner: 'Pasta/Spaghetti + chicken + veggies',
  //       bedtime: 'Handful of mixed nuts',
  //     },
  //   };

  //   const selectedMeals = mealPlans[stage] || {};

  //   // Exclude items for diabetic patients
  //   const diabeticExclusions = ['sugar', 'honey'];
  //   if (isDiabetic) {
  //     Object.keys(selectedMeals).forEach((meal) => {
  //       diabeticExclusions.forEach((exclude) => {
  //         selectedMeals[meal] = selectedMeals[meal].replace(new RegExp(exclude, 'gi'), '');
  //       });
  //     });
  //   }

  //   // Adjust meals based on meal option
  //   if (mealOption === '3') {
  //     // Only keep breakfast, lunch, and dinner
  //     return {
  //       breakfast: selectedMeals.breakfast,
  //       lunch: selectedMeals.lunch,
  //       dinner: selectedMeals.dinner,
  //     };
  //   } else if (mealOption === '6') {
  //     // Include all meals except snack
  //     return {
  //       breakfast: selectedMeals.breakfast,
  //       midMeal: selectedMeals.midMeal,
  //       lunch: selectedMeals.lunch,
  //       eveningNourishment: selectedMeals.eveningNourishment,
  //       dinner: selectedMeals.dinner,
  //       bedtime: selectedMeals.bedtime,
  //     };
  //   }

  //   return {};
  // };

  // const mealPlan = gfrResult !== null ? getMealPlan(ckdStageMessage.split(':')[0]) : {};

  // // Function to save the generated meal plan in the database
  // const saveMealPlanToDB = async (mealPlan) => {
  //   setIsLoading(true); // Show loader
  //   setSuccessMessage(''); // Reset success message
  //   try {

  //     const response = await axios.post('http://localhost:5000/save-diet-plan', {
  //       gfrResult,
  //       ckdStageMessage,
  //       mealPlan,
  //     });
  //     console.log('Diet plan saved successfully:', response.data);
  //     setSuccessMessage('Meal plan saved successfully!'); // Set success message
  //   } catch (error) {
  //     console.error('Error saving diet plan to the database:', error);
  //     setSuccessMessage('Failed to save meal plan.'); // Show failure message
  //   } finally {
  //     setIsLoading(false); // Hide loader
  //   }
  // };

  // const handleSaveMealPlan = () => {
  //   saveMealPlanToDB(mealPlan);
  // };
  
  useEffect(() => {
    fetchAge();
    fetchCreatinine();
    const interval = setInterval(() => {
      fetchAge();
      fetchCreatinine();
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  
  const generateMealPlan = () => {
    setShowMealFilter(true);
  };
  
  const getMealPlan = (stage) => {
    const mealPlans = {
      'Stage 2': {
        breakfast: '1 CD-sized chapatti or paratha + 6-7 tbsp curry/omelet + tea',
        midMeal: '1-2 apples or ¼ cup of melons',
        lunch: '1-2 CD-sized chapatti/1 cup boiled rice + 5-6 tbsp curry or lentils + salad',
        eveningNourishment: '1-2 cups of popcorns + tea',
        dinner: '1-2 CD-sized chapatti + 5-6 tbsp curry + salad',
        bedtime: '1 cup low-fat milk + honey',
      },
      'Stage 3a': {
        breakfast: '2 multigrain/white bread slices + omelet',
        midMeal: 'Handful of mixed nuts',
        lunch: 'Wrap with veggies + chicken',
        eveningNourishment: '1 cup low-fat yogurt + tea',
        dinner: 'Biryani/pulao + salad + raita',
        bedtime: '1 cup of green tea',
      },
      'Stage 3b': {
        breakfast: 'Oats + milk + honey + 1 boiled egg',
        midMeal: '1-2 cups of popcorns',
        lunch: 'Chole chaat/salad',
        eveningNourishment: '1-2 apples/guava + tea',
        dinner: 'Pasta/Spaghetti + chicken + veggies',
        bedtime: 'Handful of mixed nuts',
      },
    };
  
    const selectedMeals = mealPlans[stage] || {};
  
    // Exclude items for diabetic patients
    const diabeticExclusions = ['sugar', 'honey'];
    if (isDiabetic) {
      Object.keys(selectedMeals).forEach((meal) => {
        diabeticExclusions.forEach((exclude) => {
          selectedMeals[meal] = selectedMeals[meal].replace(new RegExp(exclude, 'gi'), '');
        });
      });
    }
  
    // Adjust meals based on meal option
    if (mealOption === '3') {
      // Only keep breakfast, lunch, and dinner
      return {
        breakfast: selectedMeals.breakfast,
        lunch: selectedMeals.lunch,
        dinner: selectedMeals.dinner,
      };
    } else if (mealOption === '6') {
      // Include all meals except snack
      return {
        breakfast: selectedMeals.breakfast,
        midMeal: selectedMeals.midMeal,
        lunch: selectedMeals.lunch,
        eveningNourishment: selectedMeals.eveningNourishment,
        dinner: selectedMeals.dinner,
        bedtime: selectedMeals.bedtime,
      };
    }
  
    return {};
  };
  
  const mealPlan = gfrResult !== null ? getMealPlan(ckdStageMessage.split(':')[0]) : {};
  
  // Function to save the generated meal plan in the database
  const saveMealPlanToDB = async (mealPlan) => {
    setIsLoading(true); // Show loader
    setSuccessMessage(''); // Reset success message
    try {
      const token = getToken(); // Use the token retrieved from localStorage

      const response = await axios.post('http://localhost:5000/save-diet-plan', {
        gfrResult,
        ckdStageMessage,
        mealPlan,
      }, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the request headers
        },
      });
      console.log('Diet plan saved successfully:', response.data);
      setSuccessMessage('Meal plan saved successfully!'); // Set success message
    } catch (error) {
      console.error('Error saving diet plan to the database:', error);
      setSuccessMessage('Failed to save meal plan.'); // Show failure message
    } finally {
      setIsLoading(false); // Hide loader
    }
  };
  
  const handleSaveMealPlan = () => {
    saveMealPlanToDB(mealPlan);
  };
  
  
  
  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f4f4', fontFamily: "'Arial', sans-serif", textAlign: 'center', borderRadius: '10px', maxWidth: '500px', margin: '0 auto', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
      <h2 style={{ color: '#007BFF', marginBottom: '20px' }}>GFR Calculator</h2>
      <select
        value={sex}
        onChange={(e) => setSex(e.target.value)}
        style={{ padding: '10px', marginBottom: '10px', borderRadius: '5px', width: '100%', boxSizing: 'border-box' }}
      >
        <option value="">Select Sex</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Age"
        style={{ padding: '10px', marginBottom: '10px', borderRadius: '5px', width: '100%', boxSizing: 'border-box' }}
      />
      <input
        type="number"
        value={serumCreatinine}
        onChange={(e) => setSerumCreatinine(e.target.value)}
        placeholder="Serum Creatinine (mg/dL)"
        style={{ padding: '10px', marginBottom: '10px', borderRadius: '5px', width: '100%', boxSizing: 'border-box' }}
      />
      <button
        onClick={calculateGfr}
        style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        Calculate GFR
      </button>
      {gfrError && <p style={{ color: 'red' }}>{gfrError}</p>}
      {gfrResult && (
        <div>
          <p>GFR Result: {gfrResult.toFixed(2)}</p>
          <p>{ckdStageMessage}</p>
          <button onClick={generateMealPlan} style={{ marginTop: '10px', padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Generate Meal Plan
          </button>
        </div>
      )}
      {showMealFilter && (
        <div style={{ marginTop: '20px' }}>
          <h3>Meal Plan</h3>
          <label>
            <input
              type="radio"
              name="mealOption"
              value="3"
              checked={mealOption === '3'}
              onChange={() => setMealOption('3')}
            />
            3 meals per day
          </label>
          <label style={{ marginLeft: '10px' }}>
            <input
              type="radio"
              name="mealOption"
              value="6"
              checked={mealOption === '6'}
              onChange={() => setMealOption('6')}
            />
            6 meals per day
          </label>
          <label style={{ marginLeft: '10px' }}>
            <input
              type="checkbox"
              checked={isDiabetic}
              onChange={(e) => setIsDiabetic(e.target.checked)}
            />
            Diabetic
          </label>
          <div style={{ marginTop: '10px', textAlign: 'left' }}>
            {Object.entries(mealPlan).map(([meal, description]) => (
              <p key={meal}>
                <strong>{meal}:</strong> {description}
              </p>
            ))}
          </div>
          <button onClick={handleSaveMealPlan} style={{ marginTop: '10px', padding: '10px 20px', backgroundColor: '#17a2b8', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Save Meal Plan
          </button>
          {isLoading && <p style={{ color: '#007BFF', marginTop: '10px' }}>Saving...</p>}
          {successMessage && <p style={{ color: successMessage.includes('successfully') ? '#28a745' : 'red', marginTop: '10px' }}>{successMessage}</p>}
        </div>
      )}
    </div>
  );
}

export default GfrCalculator;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function GfrCalculator() {
//   const [sex, setSex] = useState('');
//   const [age, setAge] = useState('');
//   const [serumCreatinine, setSerumCreatinine] = useState('');
//   const [gfrResult, setGfrResult] = useState(null);
//   const [gfrError, setGfrError] = useState('');
//   const [ckdStageMessage, setCkdStageMessage] = useState('');
//   const [showMealFilter, setShowMealFilter] = useState(false);
//   const [mealOption, setMealOption] = useState('3');
//   const [isDiabetic, setIsDiabetic] = useState(false);
//   const [isLoading, setIsLoading] = useState(false); // Loader state
//   const [successMessage, setSuccessMessage] = useState(''); // Success message state

  
//   const fetchAge = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/latest-age');
//       setAge(response.data.age);
//     } catch (error) {
//       console.error('Error fetching age:', error);
//       setGfrError('Failed to fetch age from the database.');
//     }
//   };

//   const fetchCreatinine = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/latest-creatinine');
//       setSerumCreatinine(response.data.creatinine);
//     } catch (error) {
//       console.error('Error fetching serum creatinine:', error);
//       setGfrError('Failed to fetch creatinine from the database.');
//     }
//   };

//   const getCkdStageMessage = (gfr) => {
//     if (gfr >= 90) {
//       return 'Stage 1: Kidney damage with normal kidney function.';
//     } else if (gfr >= 60) {
//       return 'Stage 2: Kidney damage with mild loss of kidney function.';
//     } else if (gfr >= 45) {
//       return 'Stage 3a: Mild to moderate loss of kidney function.';
//     } else if (gfr >= 30) {
//       return 'Stage 3b: Moderate to severe loss of kidney function.';
//     } else if (gfr >= 15) {
//       return 'Stage 4: Severe loss of kidney function.';
//     } else {
//       return 'Stage 5: Kidney failure.';
//     }
//   };

//   const calculateGfr = async () => {
//     if (!sex || !age || !serumCreatinine) {
//       setGfrError('Please fill in all fields.');
//       return;
//     }
//     setGfrError('');

//     // GFR Calculation formula (MDRD equation)
//     const gfr = 140 - age + (sex === 'female' ? -5 : 0) - (serumCreatinine * 10);
//     setGfrResult(gfr);
//     const stageMessage = getCkdStageMessage(gfr);
//     setCkdStageMessage(stageMessage);

//     if (gfr < 30) {
//       window.alert('Your GFR indicates Stage 4 or 5. Please consult your doctor.');
//     }

//     // Save GFR result to the database
//     try {
//       const response = await axios.post('http://localhost:5000/gfr', {
//         sex,
//         age,
//         serumCreatinine,
//         gfrResult: gfr,
//         ckdStageMessage: stageMessage,
//       });
//       console.log('GFR result saved successfully:', response.data);
//     } catch (error) {
//       console.error('Error saving GFR result:', error);
//     }
//   };

//   useEffect(() => {
//     fetchAge();
//     fetchCreatinine();
//     const interval = setInterval(() => {
//       fetchAge();
//       fetchCreatinine();
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const generateMealPlan = () => {
//     setShowMealFilter(true);
//   };

//   const getMealPlan = (stage) => {
//     const mealPlans = {
//       'Stage 2': {
//         breakfast: '1 CD-sized chapatti or paratha + 6-7 tbsp curry/omelet + tea',
//         midMeal: '1-2 apples or ¼ cup of melons',
//         lunch: '1-2 CD-sized chapatti/1 cup boiled rice + 5-6 tbsp curry or lentils + salad',
//         eveningNourishment: '1-2 cups of popcorns + tea',
//         dinner: '1-2 CD-sized chapatti + 5-6 tbsp curry + salad',
//         bedtime: '1 cup low-fat milk + honey',
//       },
//       'Stage 3a': {
//         breakfast: '2 multigrain/white bread slices + omelet',
//         midMeal: 'Handful of mixed nuts',
//         lunch: 'Wrap with veggies + chicken',
//         eveningNourishment: '1 cup low-fat yogurt + tea',
//         dinner: 'Biryani/pulao + salad + raita',
//         bedtime: '1 cup of green tea',
//       },
//       'Stage 3b': {
//         breakfast: 'Oats + milk + honey + 1 boiled egg',
//         midMeal: '1-2 cups of popcorns',
//         lunch: 'Chole chaat/salad',
//         eveningNourishment: '1-2 apples/guava + tea',
//         dinner: 'Pasta/Spaghetti + chicken + veggies',
//         bedtime: 'Handful of mixed nuts',
//       },
//     };

//     const selectedMeals = mealPlans[stage] || {};

//     // Exclude items for diabetic patients
//     const diabeticExclusions = ['sugar', 'honey'];
//     if (isDiabetic) {
//       Object.keys(selectedMeals).forEach((meal) => {
//         diabeticExclusions.forEach((exclude) => {
//           selectedMeals[meal] = selectedMeals[meal].replace(new RegExp(exclude, 'gi'), '');
//         });
//       });
//     }

//     // Adjust meals based on meal option
//     if (mealOption === '3') {
//       // Only keep breakfast, lunch, and dinner
//       return {
//         breakfast: selectedMeals.breakfast,
//         lunch: selectedMeals.lunch,
//         dinner: selectedMeals.dinner,
//       };
//     } else if (mealOption === '6') {
//       // Include all meals except snack
//       return {
//         breakfast: selectedMeals.breakfast,
//         midMeal: selectedMeals.midMeal,
//         lunch: selectedMeals.lunch,
//         eveningNourishment: selectedMeals.eveningNourishment,
//         dinner: selectedMeals.dinner,
//         bedtime: selectedMeals.bedtime,
//       };
//     }

//     return {};
//   };

//   const mealPlan = gfrResult !== null ? getMealPlan(ckdStageMessage.split(':')[0]) : {};

//   // Function to save the generated meal plan in the database
//   const saveMealPlanToDB = async (mealPlan) => {
//     setIsLoading(true); // Show loader
//     setSuccessMessage(''); // Reset success message
//     try {
//       const response = await axios.post('http://localhost:5000/save-diet-plan', {
//         gfrResult,
//         ckdStageMessage,
//         mealPlan,
//       });
//       console.log('Diet plan saved successfully:', response.data);
//       setSuccessMessage('Meal plan saved successfully!'); // Set success message
//     } catch (error) {
//       console.error('Error saving diet plan to the database:', error);
//       setSuccessMessage('Failed to save meal plan.'); // Show failure message
//     } finally {
//       setIsLoading(false); // Hide loader
//     }
//   };

//   const handleSaveMealPlan = () => {
//     saveMealPlanToDB(mealPlan);
//   };

//   return (
//     <div style={{ padding: '20px', backgroundColor: '#f4f4f4', fontFamily: "'Arial', sans-serif", textAlign: 'center', borderRadius: '10px', maxWidth: '500px', margin: '0 auto', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
//       <h2 style={{ color: '#007BFF', marginBottom: '20px' }}>GFR Calculator</h2>
//       <select
//         value={sex}
//         onChange={(e) => setSex(e.target.value)}
//         style={{ padding: '10px', marginBottom: '10px', borderRadius: '5px', width: '100%', boxSizing: 'border-box' }}
//       >
//         <option value="">Select Sex</option>
//         <option value="male">Male</option>
//         <option value="female">Female</option>
//       </select>
//       <input
//         type="number"
//         value={age}
//         onChange={(e) => setAge(e.target.value)}
//         placeholder="Age"
//         style={{ padding: '10px', marginBottom: '10px', borderRadius: '5px', width: '100%', boxSizing: 'border-box' }}
//       />
//       <input
//         type="number"
//         value={serumCreatinine}
//         onChange={(e) => setSerumCreatinine(e.target.value)}
//         placeholder="Serum Creatinine (mg/dL)"
//         style={{ padding: '10px', marginBottom: '10px', borderRadius: '5px', width: '100%', boxSizing: 'border-box' }}
//       />
//       <button
//         onClick={calculateGfr}
//         style={{ padding: '10px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginBottom: '10px' }}
//       >
//         Calculate GFR
//       </button>
//       {gfrError && <p style={{ color: 'red', marginBottom: '10px' }}>{gfrError}</p>}
//       {gfrResult !== null && (
//         <>
//           <p style={{ marginBottom: '10px' }}>GFR Result: {gfrResult.toFixed(2)}</p>
//           <p style={{ color: '#007BFF', fontWeight: 'bold' }}>{ckdStageMessage}</p>
//           <button
//             onClick={generateMealPlan}
//             style={{ padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginBottom: '10px' }}
//           >
//             Generate Meal Plan
//           </button>
//         </>
//       )}
//       {showMealFilter && (
//         <div style={{ textAlign: 'left', marginTop: '20px' }}>
//           <label>
//             <input type="checkbox" checked={isDiabetic} onChange={(e) => setIsDiabetic(e.target.checked)} />
//             Diabetic
//           </label>
//           <label>
//             <input
//               type="radio"
//               name="mealOption"
//               value="3"
//               checked={mealOption === '3'}
//               onChange={(e) => setMealOption(e.target.value)}
//             />
//             3 Meals per Day
//           </label>
//           <label>
//             <input
//               type="radio"
//               name="mealOption"
//               value="6"
//               checked={mealOption === '6'}
//               onChange={(e) => setMealOption(e.target.value)}
//             />
//             6 Meals per Day
//           </label>
//           <button
//             onClick={handleSaveMealPlan}
//             style={{ display: 'block', padding: '10px', backgroundColor: '#17a2b8', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}
//           >
//             Save Meal Plan
//           </button>
//         </div>
//       )}
//       {isLoading && <p>Loading...</p>}
//       {successMessage && <p style={{ color: successMessage.includes('successfully') ? 'green' : 'red' }}>{successMessage}</p>}
//     </div>
//   );
// }

// export default GfrCalculator;

