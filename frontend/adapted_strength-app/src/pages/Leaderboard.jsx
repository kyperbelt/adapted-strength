import { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import Footer from '../components/footer';
import { UserApi } from '../api/UserApi';
import { AuthApi } from '../api/AuthApi';

function AdaptedStrengthLogo() {
  return (
    <div className="flex flex-col items-center mt-12">
      <img src={logo} alt="Adapted Strength Logo" className="w-3/4" />
    </div>
  );
}

 // Function to generate CSS for table columns
 const getColumnStyle = () => {
  return {
    padding: '20px', // Adjust padding as needed
    textAlign: 'center', // Center align text in columns
  };
};

const getRowStyle = (index) => {
  switch (index) {
    case 0:
      return { backgroundColor: 'goldenrod' };
    case 1:
      return { backgroundColor: 'lightgray' };
    case 2:
      return { backgroundColor: '#D2B48C' };
    default:
      return {};
  }
};


const weightClasses = {
  Olympic: {
    Men: [55, 61, 67, 73, 81, 89, 96, 102, 109, '109+'],
    Women: [45, 49, 55, 59, 64, 71, 76, 81, 87, '87+'],
  },
  Powerlifting: {
    Men: [52, 56, 60, 67.5, 75, 82.5, 90, 100, 110, 125, 140, '140+'],
    Women: [44, 48, 52, 56, 60, 67.5, 75, 82.5, 90, 100, '100+'],
  },
};

export default function Leaderboard() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedWeightClass, setSelectedWeightClass] = useState(null);
  const [addCategory, setAddCategory] = useState(null);
  const [addGender, setAddGender] = useState(null);
  const [addWeightClass, setAddWeightClass] = useState(null);
  const [snatchValue, setSnatchValue] = useState(0.0);
  const [cleanJerkValue, setCleanJerkValue] = useState(0.0);
  const [squatValue, setSquatValue] = useState(0.0);
  const [benchValue, setBenchValue] = useState(0.0);
  const [deadliftValue, setDeadliftValue] = useState(0.0);
  const [topAthletes, setTopAthletes] = useState([]);
  const [addRecords, setAddRecords] = useState(true);
  const [deleteRank, setDeleteRank] = useState("");
  const [idToDelete, setIdToDelete] = useState(null);

  const calculateTotal = () => {
    let total = 0;
  
    // Check if selectedCategory is set and at least one lift value is provided
    if (selectedCategory) {
      if (selectedCategory === 'Olympic') {
        const snatch = parseFloat(snatchValue);
        const cleanJerk = parseFloat(cleanJerkValue);
  
        // Check if both snatch and clean & jerk values are valid numbers
        if (!isNaN(snatch) && !isNaN(cleanJerk)) {
          total = snatch + cleanJerk;
        }
      } else if (selectedCategory === 'Powerlifting') {
        const squat = parseFloat(squatValue);
        const bench = parseFloat(benchValue);
        const deadlift = parseFloat(deadliftValue);
  
        // Check if all squat, bench, and deadlift values are valid numbers
        if (!isNaN(squat) && !isNaN(bench) && !isNaN(deadlift)) {
          total = squat + bench + deadlift;
        }
      }
    }
  
    return total;
  };

  useEffect(() => {
    const total = calculateTotal();
    // Update any UI or state based on the new total here
  }, [snatchValue, cleanJerkValue, squatValue, benchValue, deadliftValue]);
  

  useEffect(() => {
    if (idToDelete !== null) {
      // Call the appropriate delete API function based on the category
      console.log(idToDelete)
      let deleteApiCall;
      if (selectedCategory === "Olympic") {
        deleteApiCall = UserApi.deleteOlympicEntry(idToDelete);
      } else if (selectedCategory === "Powerlifting") {
        deleteApiCall = UserApi.deletePowerliftingEntry(idToDelete);
      }

      if (deleteApiCall) {
        deleteApiCall.then((response) => {
          console.log("Response from delete API:", response); 
          console.log("Entry deleted successfully");
          // Optionally, update the state to reflect the deletion
        }).catch((error) => {
          console.error("Error deleting entry:", error);
        });
      }
    }
  }, [idToDelete, selectedCategory]);

  // Function to handle deletion of record
  const handleDeleteRecord = () => {
    if (topAthletes && topAthletes.length > 0) {
      // Find the athlete object based on the rank number
      const athleteToDelete = topAthletes[deleteRank - 1]; // Adjust for 0-based index
      console.log('Athlete to delete: ', athleteToDelete);

      // Extract the athlete ID to delete
      const athleteIdToDelete = athleteToDelete ? athleteToDelete.id : null;
      setIdToDelete(athleteIdToDelete);
    } else {
      console.error("No top athletes to delete");
    }
  };

  // Handle form submission to add record to the database
  const handleSubmit = () => {
    const total = calculateTotal();
    const record = {
      weightClass: addWeightClass,
      gender: addGender.charAt(0), // Assuming 'F' or 'M' for gender
      total: total,
    };

    if (addCategory === 'Olympic') {
      record.snatch = parseFloat(snatchValue);
      record.cleanJerk = parseFloat(cleanJerkValue);
      UserApi.addOlympicEntry(record)
        .then(response => {
          console.log('Record added successfully:', response);
          // Reset form after successful submission
          setSnatchValue('');
          setCleanJerkValue('');
        })
        .catch(error => console.error('Error adding record:', error));
    } else if (addCategory === 'Powerlifting') {
      record.squat = parseFloat(squatValue);
      record.bench = parseFloat(benchValue);
      record.deadlift = parseFloat(deadliftValue);
      UserApi.addPowerliftingEntry(record)
        .then(response => {
          console.log('Record added successfully:', response);
          // Reset form after successful submission
          setSquatValue('');
          setBenchValue('');
          setDeadliftValue('');
        })
        .catch(error => console.error('Error adding record:', error));
    }
  };

  // Function to handle additional dropdown menu change
  const handleAdditionalDropdownChange = (value) => {
    // Logic to handle change in the additional dropdown menu
    console.log('Selected value in additional dropdown:', value);
  };

  if (!addRecords && AuthApi.hasRole('ROLE_ADMIN')) {
    setAddRecords(true);
  }

  useEffect(() => {
    console.log('Top athletes have been updated:', topAthletes);
  }, [topAthletes]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedGender(null); // Reset gender when category changes
    setSelectedWeightClass(null); // Reset weight class when category changes
    setTopAthletes([]); // Clear top athletes when category changes
  };

  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
    setSelectedWeightClass(null); // Reset weight class when gender changes
    setTopAthletes([]); // Clear top athletes when gender changes
  };

  // Inside handleWeightClassChange function
const handleWeightClassChange = (weightClass) => {
  setSelectedWeightClass(weightClass);
  console.log('Selected weight class:', weightClass);

  // Fetch top athletes based on selected category, gender, and weight class
  if (selectedCategory === 'Olympic') {
    if (selectedGender === 'Men') {
      UserApi.getTop10OlympicMalesByWeightClass(weightClass)
        .then(response => {
          console.log('Top Olympic male athletes:', response);
          // Ensure response.data is an array before setting state
          if (Array.isArray(response.data)) {
            setTopAthletes(response.data);
          } else {
            setTopAthletes([]);
          }
        })
        .catch(error => console.error('Error fetching top Olympic male athletes:', error));
    } else if (selectedGender === 'Women') {
      UserApi.getTop10OlympicFemalesByWeightClass(weightClass)
        .then(response => {
          console.log('Top Olympic female athletes:', response);
          // Ensure response.data is an array before setting state
          if (Array.isArray(response.data)) {
            setTopAthletes(response.data);
          } else {
            setTopAthletes([]);
          }
        })
        .catch(error => console.error('Error fetching top Olympic female athletes:', error));
    }
  } else if (selectedCategory === 'Powerlifting') {
    if (selectedGender === 'Men') {
      UserApi.getTop10MalePowerliftersByWeightClass(weightClass)
        .then(response => {
          console.log('Top Powerlifting male athletes:', response);
          // Ensure response.data is an array before setting state
          if (Array.isArray(response.data)) {
            setTopAthletes(response.data);
          } else {
            setTopAthletes([]);
          }
        })
        .catch(error => console.error('Error fetching top Powerlifting male athletes:', error));
    } else if (selectedGender === 'Women') {
      UserApi.getTop10FemalePowerliftersByWeightClass(weightClass)
        .then(response => {
          console.log('Top Powerlifting female athletes:', response);
          // Ensure response.data is an array before setting state
          if (Array.isArray(response.data)) {
            setTopAthletes(response.data);
          } else {
            setTopAthletes([]);
          }
        })
        .catch(error => console.error('Error fetching top Powerlifting female athletes:', error));
    }
  }
};

  

return (
  <div className="h-full my-0 content-center w-full top-[100px]">
    <br />
    <div className="h-56 bg-header-background1">
      <AdaptedStrengthLogo />
    </div>
    <br />
    <div>
      <p className="font-bold text-lg">Adapted Strength (A.S.) All Time Records</p>
      <br />
    </div>
    
    {/* Dropdown menus */}
    <div className="flex flex-col">
      <div className="mb-4">
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          onChange={(e) => handleCategoryChange(e.target.value)}
          value={selectedCategory}
        >
          <option value="">Select category</option>
          <option value="Olympic">Olympic</option>
          <option value="Powerlifting">Powerlifting</option>
        </select>
      </div>
      {selectedCategory && (
        <div className="mb-4">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            onChange={(e) => handleGenderChange(e.target.value)}
            value={selectedGender}
          >
            <option value="">Select gender</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
          </select>
        </div>
      )}
      {selectedCategory && selectedGender && (
        <div className="mb-4">
          <label htmlFor="weightClass">Weight Class:</label>
          <select
            id="weightClass"
            onChange={(e) => handleWeightClassChange(e.target.value)}
            value={selectedWeightClass}
          >
            <option value="">Select weight class</option>
            {weightClasses[selectedCategory][selectedGender].map((weight, index) => (
              <option key={index} value={weight}>
                {weight}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>

    {/* Display top athletes in a table */}
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th style={getColumnStyle()}>Rank</th>
            <th style={getColumnStyle()}>Gender</th>
            <th style={getColumnStyle()}>Weight Class</th>
            {selectedCategory === 'Powerlifting' ? (
              <>
                <th style={getColumnStyle()}>Squat</th>
                <th style={getColumnStyle()}>Bench</th>
                <th style={getColumnStyle()}>Deadlift</th>
              </>
            ) : (
              <>
                <th style={getColumnStyle()}>Snatch</th>
                <th style={getColumnStyle()}>Clean & Jerk</th>
              </>
            )}
            <th style={getColumnStyle()}>Total</th>
          </tr>
        </thead>
        <tbody>
          {topAthletes.map((athlete, index) => (
            <tr key={index} style={getRowStyle(index)}>
              <td>{index + 1}</td>
              <td>{athlete.gender}</td>
              <td>{athlete.weightClass}</td>
              {selectedCategory === 'Powerlifting' ? (
                <>
                  <td>{athlete.squat}</td>
                  <td>{athlete.bench}</td>
                  <td>{athlete.deadlift}</td>
                </>
              ) : (
                <>
                  <td>{athlete.snatch}</td>
                  <td>{athlete.cleanJerk}</td>
                </>
              )}
              <td>{athlete.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <br></br>

    <div>
      <p className="font-bold">Add Records Here</p>
    </div>

    {/* Additional dropdown menu for adding records */}
    {addRecords && (
      <div className="flex flex-col">
        <div className="mb-4">
          <label htmlFor="addRecordsCategory">Category:</label>
          <select
            id="addRecordsCategory"
            onChange={(e) => setAddCategory(e.target.value)}
            value={addCategory}
          >
            <option value="">Select category</option>
            <option value="Olympic">Olympic</option>
            <option value="Powerlifting">Powerlifting</option>
          </select>
        </div>
        {addCategory && (
          <div className="mb-4">
            <label htmlFor="addRecordsGender">Gender:</label>
            <select
              id="addRecordsGender"
              onChange={(e) => setAddGender(e.target.value)}
              value={addGender}
            >
              <option value="">Select gender</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
            </select>
          </div>
        )}
        {addCategory && addGender && (
          <div className="mb-4">
            <label htmlFor="addRecordsWeightClass">Weight Class:</label>
            <select
              id="addRecordsWeightClass"
              onChange={(e) => setAddWeightClass(e.target.value)}
              value={addWeightClass}
            >
              <option value="">Select weight class</option>
              {weightClasses[addCategory][addGender].map((weight, index) => (
                <option key={index} value={weight}>
                  {weight}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Input boxes for discipline based on category */}
        {addCategory === 'Olympic' && (
          <div className="mb-4">
            <label htmlFor="snatchInput">Snatch:</label>
            <input
              type="text"
              id="snatchInput"
              onChange={(e) => setSnatchValue(e.target.value)}
              value={snatchValue}
            />
          </div>
        )}
        {addCategory === 'Olympic' && (
          <div className="mb-4">
            <label htmlFor="cleanJerkInput">Clean & Jerk:</label>
            <input
              type="text"
              id="cleanJerkInput"
              onChange={(e) => setCleanJerkValue(e.target.value)}
              value={cleanJerkValue}
            />
          </div>
        )}
        {addCategory === 'Powerlifting' && (
          <div className="mb-4">
            <label htmlFor="squatInput">Squat:</label>
            <input
              type="text"
              id="squatInput"
              onChange={(e) => setSquatValue(e.target.value)}
              value={squatValue}
            />
          </div>
        )}
        {addCategory === 'Powerlifting' && (
          <div className="mb-4">
            <label htmlFor="benchInput">Bench:</label>
            <input
              type="text"
              id="benchInput"
              onChange={(e) => setBenchValue(e.target.value)}
              value={benchValue}
            />
          </div>
        )}
        {addCategory === 'Powerlifting' && (
          <div className="mb-4">
            <label htmlFor="deadliftInput">Deadlift:</label>
            <input
              type="text"
              id="deadliftInput"
              onChange={(e) => setDeadliftValue(e.target.value)}
              value={deadliftValue}
            />
          </div>
        )}
      </div>
    )}

    {/* Submit button */}
    {addCategory && addGender && addWeightClass && (
      <button className="border-slate-50 border-8 bg-black text-slate-200 rounded-full px-3 py-1 " onClick={handleSubmit}>Add Record</button>
    )}
    
    <br></br>
    <br></br>

    <div>
      <p className="font-bold">Delete Records Here</p>
    </div>

    {/* Input field and button for deletion */}
    {addRecords && topAthletes && topAthletes.length > 0 && (
      <div className="flex flex-col">
        <div className="mb-4">
          <label htmlFor="deleteRank">Rank Number to Delete:</label>
          <input
            type="number"
            id="deleteRank"
            value={deleteRank}
            onChange={(e) => setDeleteRank(e.target.value)}
          />
        </div>
      </div>
    )}

    {addRecords && topAthletes && topAthletes.length > 0 && (
      <button className="border-slate-50 border-8 bg-black text-slate-200 rounded-full px-3 py-1 " onClick={handleDeleteRecord}>Confirm Delete</button>
    )}

    <br />
    <Footer />
  </div>
);
}
