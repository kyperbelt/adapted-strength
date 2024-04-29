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
  Snatch: {
    Men: [55, 61, 67, 73, 81, 89, 96, 102, 109, '109+'],
    Women: [45, 49, 55, 59, 64, 71, 76, 81, 87, '87+'],
  },
  CleanJerk: {
    Men: [55, 61, 67, 73, 81, 89, 96, 102, 109, '109+'],
    Women: [45, 49, 55, 59, 64, 71, 76, 81, 87, '87+'],
  },
  Squat: {
    Men: [52, 56, 60, 67.5, 75, 82.5, 90, 100, 110, 125, 140, '140+'],
    Women: [44, 48, 52, 56, 60, 67.5, 75, 82.5, 90, 100, '100+'],
  },
  Bench: {
    Men: [52, 56, 60, 67.5, 75, 82.5, 90, 100, 110, 125, 140, '140+'],
    Women: [44, 48, 52, 56, 60, 67.5, 75, 82.5, 90, 100, '100+'],
  },
  Deadlift: {
    Men: [52, 56, 60, 67.5, 75, 82.5, 90, 100, 110, 125, 140, '140+'],
    Women: [44, 48, 52, 56, 60, 67.5, 75, 82.5, 90, 100, '100+'],
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
  const [name, setName] = useState("");
  const [addGender, setAddGender] = useState(null); 
  const [addWeightClass, setAddWeightClass] = useState(null); 
  const [weight, setWeight] = useState(0.0);
  const [snatchValue, setSnatchValue] = useState(0.0);
  const [cleanJerkValue, setCleanJerkValue] = useState(0.0);
  const [squatValue, setSquatValue] = useState(0.0);
  const [benchValue, setBenchValue] = useState(0.0);
  const [deadliftValue, setDeadliftValue] = useState(0.0);
  const [totalValue, setTotalValue] = useState(0.0);
  const [topAthletes, setTopAthletes] = useState([]);
  const [addRecords, setAddRecords] = useState(true);
  const [deleteRank, setDeleteRank] = useState("");
  const [idToDelete, setIdToDelete] = useState(null);
  const [topMaleSquat, setTopMaleSquat] = useState([]);
  const [topFemaleSquat, setTopFemaleSquat] = useState([]);
  const [topMaleBench, setTopMaleBench] = useState([]);
  const [topFemaleBench, setTopFemaleBench] = useState([]);
  const [topMaleDeadlift, setTopMaleDeadlift] = useState([]);
  const [topFemaleDeadlift, setTopFemaleDeadlift] = useState([]);
  const [topMaleSnatch, setTopMaleSnatch] = useState([]);
  const [topFemaleSnatch, setTopFemaleSnatch] = useState([]);
  const [topMaleCleanJerk, setTopMaleCleanJerk] = useState([]);
  const [topFemaleCleanJerk, setTopFemaleCleanJerk] = useState([]);

  useEffect(() => {
    async function fetchTopAthletes() {
        const maleSquatResponse = await UserApi.getTop10MaleSquat();
        console.log("Male Squat Response:", maleSquatResponse.data);
        setTopMaleSquat(maleSquatResponse.data);

        const femaleSquatResponse = await UserApi.getTop10FemaleSquat();
        console.log("Female Squat Response:", femaleSquatResponse.data);
        setTopFemaleSquat(femaleSquatResponse.data);

        const maleBenchResponse = await UserApi.getTop10MaleBench();
        console.log("Male Bench Response:", maleBenchResponse.data);
        setTopMaleBench(maleBenchResponse.data);

        const femaleBenchResponse = await UserApi.getTop10FemaleBench();
        console.log("Female Bench Response:", femaleBenchResponse.data);
        setTopFemaleBench(femaleBenchResponse.data);

        const maleDeadliftResponse = await UserApi.getTop10MaleDeadlift();
        console.log("Male Deadlift Response:", maleDeadliftResponse.data);
        setTopMaleDeadlift(maleDeadliftResponse.data);

        const femaleDeadliftResponse = await UserApi.getTop10FemaleDeadlift();
        console.log("Female Deadlift Response:", femaleDeadliftResponse.data);
        setTopFemaleDeadlift(femaleDeadliftResponse.data);

        const maleSnatchResponse = await UserApi.getTop10MaleSnatch();
        console.log("Male Snatch Response:", maleSnatchResponse.data);
        setTopMaleSnatch(maleSnatchResponse.data);

        const femaleSnatchResponse = await UserApi.getTop10FemaleSnatch();
        console.log("Female Snatch Response:", femaleSnatchResponse.data);
        setTopFemaleSnatch(femaleSnatchResponse.data);

        const maleCleanJerkResponse = await UserApi.getTop10MaleCleanJerk();
        console.log("Male Clean & Jerk Response:", maleCleanJerkResponse.data);
        setTopMaleCleanJerk(maleCleanJerkResponse.data);

        const femaleCleanJerkResponse = await UserApi.getTop10FemaleCleanJerk();
        console.log("Female Clean & Jerk Response:", femaleCleanJerkResponse.data);
        setTopFemaleCleanJerk(femaleCleanJerkResponse.data);
      }

      fetchTopAthletes();
  }, []);



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
      } else if (selectedCategory === "Squat") {
        deleteApiCall = UserApi.deleteSquatEntry(idToDelete);
      } else if (selectedCategory === "Bench") {
        deleteApiCall = UserApi.deleteBenchEntry(idToDelete);
      } else if (selectedCategory === "Deadlift") {
        deleteApiCall = UserApi.deleteDeadliftEntry(idToDelete);
      } else if (selectedCategory === "Snatch") {
        deleteApiCall = UserApi.deleteSnatchEntry(idToDelete);
      } else if (selectedCategory === "CleanJerk") {
        deleteApiCall = UserApi.deleteCleanJerkEntry(idToDelete);
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

  const handleSubmit = () => {
    const record = {
      name: name,
      gender: addGender.charAt(0), // Assuming 'W' or 'M' for gender
      weightClass: addWeightClass,
      //total: totalValue,
    };
  
    // Check if the weight class ends with '+'
    if (addWeightClass.endsWith('+')) {
      // Extract the numeric part of the weight class
      const numericWeight = parseInt(addWeightClass);
      // Add 1 to the numeric value
      record.weightClass = numericWeight + 1;
    }
  
    if (addCategory === 'Olympic') {
      record.total = parseFloat(totalValue);
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
      record.total = parseFloat(totalValue);
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
    } else if (addCategory === 'Squat') {
      record.weight = parseFloat(weight);
      UserApi.addSquatEntry(record)
        .then(response => {
          console.log('Record added successfully:', response);
          // Reset form after successful submission
          setWeight(0.0);
        })
        .catch(error => console.error('Error adding record:', error));
    } else if (addCategory === 'Bench') {
      record.weight = parseFloat(weight);
      UserApi.addBenchEntry(record)
        .then(response => {
          console.log('Record added successfully:', response);
          // Reset form after successful submission
          setWeight(0.0);
        })
        .catch(error => console.error('Error adding record:', error));
    } else if (addCategory === 'Deadlift') {
      record.weight = parseFloat(weight);
      UserApi.addDeadliftEntry(record)
        .then(response => {
          console.log('Record added successfully:', response);
          // Reset form after successful submission
          setWeight(0.0);
        })
        .catch(error => console.error('Error adding record:', error));
    } else if (addCategory === 'Snatch') {
      record.weight = parseFloat(weight);
      UserApi.addSnatchEntry(record)
        .then(response => {
          console.log('Record added successfully:', response);
          // Reset form after successful submission
          setWeight(0.0);
        })
        .catch(error => console.error('Error adding record:', error));
    } else if (addCategory === 'CleanJerk') {
      record.weight = parseFloat(weight);
      UserApi.addCleanJerkEntry(record)
        .then(response => {
          console.log('Record added successfully:', response);
          // Reset form after successful submission
          setWeight(0.0);
        })
        .catch(error => console.error('Error adding record:', error));
    }
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

  const handleWeightClassChange = (weightClass) => {
    console.log('Selected weight class:', weightClass);
  
    // Check if the weight class ends with '+'
    if (weightClass && weightClass.endsWith('+')) {
      // Extract the numeric part of the weight class
      const numericWeight = parseInt(weightClass);
      // Add 1 to the numeric value
      const incrementedWeight = numericWeight + 1;
      setSelectedWeightClass(incrementedWeight);
      // Pass the incremented value to the backend
      console.log('Selected altered weight class:', incrementedWeight);
    } else {
      setSelectedWeightClass(weightClass);
    }
  };
  
  // Use useEffect to trigger API call when selectedWeightClass changes
  useEffect(() => {
    // Fetch top athletes based on selected category, gender, and weight class
    if (selectedCategory === 'Olympic') {
      if (selectedGender === 'Men') {
        console.log('Calling API to get top Olympic males for weight class:', selectedWeightClass);
        UserApi.getTop10OlympicMalesByWeightClass(selectedWeightClass)
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
        console.log('Calling API to get top Olympic females for weight class:', selectedWeightClass);
        UserApi.getTop10OlympicFemalesByWeightClass(selectedWeightClass)
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
        console.log('Calling API to get top Powerlifting males for weight class:', selectedWeightClass);
        UserApi.getTop10MalePowerliftersByWeightClass(selectedWeightClass)
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
        console.log('Calling API to get top Powerlifting females for weight class:', selectedWeightClass);
        UserApi.getTop10FemalePowerliftersByWeightClass(selectedWeightClass)
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
    } else if (selectedCategory === 'Squat') {
      if (selectedGender === 'Men') {
        console.log('Calling API to get top male squats for weight class:', selectedWeightClass);
        UserApi.getTop10MaleSquatByWeightClass(selectedWeightClass)
          .then(response => {
            console.log('Top male squat records:', response);
            // Ensure response.data is an array before setting state
            if (Array.isArray(response.data)) {
              setTopAthletes(response.data);
            } else {
              setTopAthletes([])
            }
          })
          .catch(error => console.error('Error fetching top male squat records: ', error));
      } else if (selectedGender === 'Women') {
        console.log('Calling API to get top female squats for weight class:', selectedWeightClass);
        UserApi.getTop10FemaleSquatByWeightClass(selectedWeightClass)
          .then(response => {
            console.log('Top female squat records:', response);
            // Ensure response.data is an array before setting state
            if (Array.isArray(response.data)) {
              setTopAthletes(response.data);
            } else {
              setTopAthletes([])
            }
          })
          .catch(error => console.error('Error fetching top female squat records: ', error));
      }
    } else if (selectedCategory === 'Bench') {
      if (selectedGender === 'Men') {
        console.log('Calling API to get top male bench records for weight class:', selectedWeightClass);
        UserApi.getTop10MaleBenchByWeightClass(selectedWeightClass)
          .then(response => {
            console.log('Top male bench records:', response);
            // Ensure response.data is an array before setting state
            if (Array.isArray(response.data)) {
              setTopAthletes(response.data);
            } else {
              setTopAthletes([])
            }
          })
          .catch(error => console.error('Error fetching top male bench records: ', error));
      } else if (selectedGender === 'Women') {
        console.log('Calling API to get top female bench records for weight class:', selectedWeightClass);
        UserApi.getTop10FemaleBenchByWeightClass(selectedWeightClass)
          .then(response => {
            console.log('Top female bench records:', response);
            // Ensure response.data is an array before setting state
            if (Array.isArray(response.data)) {
              setTopAthletes(response.data);
            } else {
              setTopAthletes([])
            }
          })
          .catch(error => console.error('Error fetching top female bench records: ', error));
      }
    } else if (selectedCategory === 'Deadlift') {
      if (selectedGender === 'Men') {
        console.log('Calling API to get top male deadlift records for weight class:', selectedWeightClass);
        UserApi.getTop10MaleDeadliftByWeightClass(selectedWeightClass)
          .then(response => {
            console.log('Top male deadlift records:', response);
            // Ensure response.data is an array before setting state
            if (Array.isArray(response.data)) {
              setTopAthletes(response.data);
            } else {
              setTopAthletes([])
            }
          })
          .catch(error => console.error('Error fetching top male deadlift records: ', error));
      } else if (selectedGender === 'Women') {
        console.log('Calling API to get top female deadlift records for weight class:', selectedWeightClass);
        UserApi.getTop10FemaleDeadliftByWeightClass(selectedWeightClass)
          .then(response => {
            console.log('Top female deadlift records:', response);
            // Ensure response.data is an array before setting state
            if (Array.isArray(response.data)) {
              setTopAthletes(response.data);
            } else {
              setTopAthletes([])
            }
          })
          .catch(error => console.error('Error fetching top female deadlift records: ', error));
      }
    } else if (selectedCategory === 'Snatch') {
      if (selectedGender === 'Men') {
        console.log('Calling API to get top male snatch records for weight class:', selectedWeightClass);
        UserApi.getTop10MaleSnatchByWeightClass(selectedWeightClass)
          .then(response => {
            console.log('Top male snatch records:', response);
            // Ensure response.data is an array before setting state
            if (Array.isArray(response.data)) {
              setTopAthletes(response.data);
            } else {
              setTopAthletes([])
            }
          })
          .catch(error => console.error('Error fetching top male snatch records: ', error));
      } else if (selectedGender === 'Women') {
        console.log('Calling API to get top female snatch records for weight class:', selectedWeightClass);
        UserApi.getTop10FemaleSnatchByWeightClass(selectedWeightClass)
          .then(response => {
            console.log('Top female snatch records:', response);
            // Ensure response.data is an array before setting state
            if (Array.isArray(response.data)) {
              setTopAthletes(response.data);
            } else {
              setTopAthletes([])
            }
          })
          .catch(error => console.error('Error fetching top female snatch records: ', error));
      }
    } else if (selectedCategory === 'CleanJerk') {
      if (selectedGender === 'Men') {
        console.log('Calling API to get top male clean & jerk records for weight class:', selectedWeightClass);
        UserApi.getTop10MaleCleanJerkByWeightClass(selectedWeightClass)
          .then(response => {
            console.log('Top male clean & jerk records:', response);
            // Ensure response.data is an array before setting state
            if (Array.isArray(response.data)) {
              setTopAthletes(response.data);
            } else {
              setTopAthletes([])
            }
          })
          .catch(error => console.error('Error fetching top male clean & jerk records: ', error));
      } else if (selectedGender === 'Women') {
        console.log('Calling API to get top female clean & jerk records for weight class:', selectedWeightClass);
        UserApi.getTop10FemaleCleanJerkByWeightClass(selectedWeightClass)
          .then(response => {
            console.log('Top female clean & jerk records:', response);
            // Ensure response.data is an array before setting state
            if (Array.isArray(response.data)) {
              setTopAthletes(response.data);
            } else {
              setTopAthletes([])
            }
          })
          .catch(error => console.error('Error fetching top female clean & jerk records: ', error));
      }
    }
  }, [selectedWeightClass, selectedCategory, selectedGender]);



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
          <option value="Squat">Squat</option>
          <option value="Bench">Bench</option>
          <option value="Deadlift">Deadlift</option>
          <option value="Snatch">Snatch</option>
          <option value="CleanJerk">Clean & Jerk</option>
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
            <th style={getColumnStyle()}>Name</th>
            {selectedCategory === 'Powerlifting' ? (
              <>
                <th style={getColumnStyle()}>Squat</th>
                <th style={getColumnStyle()}>Bench</th>
                <th style={getColumnStyle()}>Deadlift</th>
                <th style={getColumnStyle()}>Total</th>
              </>
            ) : selectedCategory === 'Olympic' ? (
              <>
                <th style={getColumnStyle()}>Snatch</th>
                <th style={getColumnStyle()}>Clean & Jerk</th>
                <th style={getColumnStyle()}>Total</th>
              </>
            ) : (
              <th style={getColumnStyle()}>Weight</th>
            )}
          </tr>
        </thead>
        <tbody>
          {topAthletes.map((athlete, index) => (
            <tr key={index} style={getRowStyle(index)}>
              <td>{index + 1}</td>
              <td>{athlete.name}</td>
              {selectedCategory === 'Powerlifting' && (
                <>
                  <td>{athlete.squat}</td>
                  <td>{athlete.bench}</td>
                  <td>{athlete.deadlift}</td>
                  <td>{athlete.total}</td>
                </>
              )}
              {selectedCategory === 'Olympic' && (
                <>
                  <td>{athlete.snatch}</td>
                  <td>{athlete.cleanJerk}</td>
                  <td>{athlete.total}</td>
                </>
              )}
              {selectedCategory !== 'Powerlifting' && selectedCategory !== 'Olympic' && (
                <td>{athlete.weight}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <br></br>

    {/* Display top athletes in a table */}
    {topMaleSquat && topMaleSquat.length > 0 && (
      <div className="overflow-x-auto">
        <table className="w-full">
        <caption className="text-center font-bold mb-2">Top Male Squat</caption>
          <thead>
            <tr>
              <th style={getColumnStyle()}>Rank</th>
              <th style={getColumnStyle()}>Name</th>
              <th style={getColumnStyle()}>Weight Class</th>
              <th style={getColumnStyle()}>Weight Lifted</th>
            </tr>
          </thead>
          <tbody>
            {topMaleSquat.map((athlete, index) => (
              <tr key={index} style={getRowStyle(index)}>
                <td>{index + 1}</td>
                <td>{athlete.name}</td>
                <td>{athlete.weightClass}</td>
                <td>{athlete.weight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
    {topFemaleSquat && topFemaleSquat.length > 0 && (
      <div className="overflow-x-auto">
        <table className="w-full">
        <caption className="text-center font-bold mb-2">Top Female Squat</caption>
          <thead>
            <tr>
              <th style={getColumnStyle()}>Rank</th>
              <th style={getColumnStyle()}>Name</th>
              <th style={getColumnStyle()}>Weight Class</th>
              <th style={getColumnStyle()}>Weight Lifted</th>
            </tr>
          </thead>
          <tbody>
            {topFemaleSquat.map((athlete, index) => (
              <tr key={index} style={getRowStyle(index)}>
                <td>{index + 1}</td>
                <td>{athlete.name}</td>
                <td>{athlete.weightClass}</td>
                <td>{athlete.weight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
    {topMaleBench && topMaleBench.length > 0 && (
      <div className="overflow-x-auto">
        <table className="w-full">
        <caption className="text-center font-bold mb-2">Top Male Bench</caption>
          <thead>
            <tr>
              <th style={getColumnStyle()}>Rank</th>
              <th style={getColumnStyle()}>Name</th>
              <th style={getColumnStyle()}>Weight Class</th>
              <th style={getColumnStyle()}>Weight Lifted</th>
            </tr>
          </thead>
          <tbody>
            {topMaleBench.map((athlete, index) => (
              <tr key={index} style={getRowStyle(index)}>
                <td>{index + 1}</td>
                <td>{athlete.name}</td>
                <td>{athlete.weightClass}</td>
                <td>{athlete.weight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
    {topFemaleBench && topFemaleBench.length > 0 && (
      <div className="overflow-x-auto">
        <table className="w-full">
        <caption className="text-center font-bold mb-2">Top Female Bench</caption>
          <thead>
            <tr>
              <th style={getColumnStyle()}>Rank</th>
              <th style={getColumnStyle()}>Name</th>
              <th style={getColumnStyle()}>Weight Class</th>
              <th style={getColumnStyle()}>Weight Lifted</th>
            </tr>
          </thead>
          <tbody>
            {topFemaleBench.map((athlete, index) => (
              <tr key={index} style={getRowStyle(index)}>
                <td>{index + 1}</td>
                <td>{athlete.name}</td>
                <td>{athlete.weightClass}</td>
                <td>{athlete.weight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
    {topMaleDeadlift && topMaleDeadlift.length > 0 && (
      <div className="overflow-x-auto">
        <table className="w-full">
        <caption className="text-center font-bold mb-2">Top MaleDeadlift</caption>
          <thead>
            <tr>
              <th style={getColumnStyle()}>Rank</th>
              <th style={getColumnStyle()}>Name</th>
              <th style={getColumnStyle()}>Weight Class</th>
              <th style={getColumnStyle()}>Weight Lifted</th>
            </tr>
          </thead>
          <tbody>
            {topMaleDeadlift.map((athlete, index) => (
              <tr key={index} style={getRowStyle(index)}>
                <td>{index + 1}</td>
                <td>{athlete.name}</td>
                <td>{athlete.weightClass}</td>
                <td>{athlete.weight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
    {topFemaleDeadlift && topFemaleDeadlift.length > 0 && (
      <div className="overflow-x-auto">
        <table className="w-full">
        <caption className="text-center font-bold mb-2">Top Female Deadlift</caption>
          <thead>
            <tr>
              <th style={getColumnStyle()}>Rank</th>
              <th style={getColumnStyle()}>Name</th>
              <th style={getColumnStyle()}>Weight Class</th>
              <th style={getColumnStyle()}>Weight Lifted</th>
            </tr>
          </thead>
          <tbody>
            {topFemaleDeadlift.map((athlete, index) => (
              <tr key={index} style={getRowStyle(index)}>
                <td>{index + 1}</td>
                <td>{athlete.name}</td>
                <td>{athlete.weightClass}</td>
                <td>{athlete.weight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
    {topMaleSnatch && topMaleSnatch.length > 0 && (
      <div className="overflow-x-auto">
        <table className="w-full">
        <caption className="text-center font-bold mb-2">Top Male Snatch</caption>
          <thead>
            <tr>
              <th style={getColumnStyle()}>Rank</th>
              <th style={getColumnStyle()}>Name</th>
              <th style={getColumnStyle()}>Weight Class</th>
              <th style={getColumnStyle()}>Weight Lifted</th>
            </tr>
          </thead>
          <tbody>
            {topMaleSnatch.map((athlete, index) => (
              <tr key={index} style={getRowStyle(index)}>
                <td>{index + 1}</td>
                <td>{athlete.name}</td>
                <td>{athlete.weightClass}</td>
                <td>{athlete.weight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
    {topFemaleSnatch && topFemaleSnatch.length > 0 && (
      <div className="overflow-x-auto">
        <table className="w-full">
        <caption className="text-center font-bold mb-2">Top Female Snatch</caption>
          <thead>
            <tr>
              <th style={getColumnStyle()}>Rank</th>
              <th style={getColumnStyle()}>Name</th>
              <th style={getColumnStyle()}>Weight Class</th>
              <th style={getColumnStyle()}>Weight Lifted</th>
            </tr>
          </thead>
          <tbody>
            {topFemaleSnatch.map((athlete, index) => (
              <tr key={index} style={getRowStyle(index)}>
                <td>{index + 1}</td>
                <td>{athlete.name}</td>
                <td>{athlete.weightClass}</td>
                <td>{athlete.weight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
    {topMaleCleanJerk && topMaleCleanJerk.length > 0 && (
      <div className="overflow-x-auto">
        <table className="w-full">
        <caption className="text-center font-bold mb-2">Top Male Clean & Jerk</caption>
          <thead>
            <tr>
              <th style={getColumnStyle()}>Rank</th>
              <th style={getColumnStyle()}>Name</th>
              <th style={getColumnStyle()}>Weight Class</th>
              <th style={getColumnStyle()}>Weight Lifted</th>
            </tr>
          </thead>
          <tbody>
            {topMaleCleanJerk.map((athlete, index) => (
              <tr key={index} style={getRowStyle(index)}>
                <td>{index + 1}</td>
                <td>{athlete.name}</td>
                <td>{athlete.weightClass}</td>
                <td>{athlete.weight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
    {topFemaleCleanJerk && topFemaleCleanJerk.length > 0 && (
      <div className="overflow-x-auto">
        <table className="w-full">
        <caption className="text-center font-bold mb-2">Top Female Clean & Jerk</caption>
          <thead>
            <tr>
              <th style={getColumnStyle()}>Rank</th>
              <th style={getColumnStyle()}>Name</th>
              <th style={getColumnStyle()}>Weight Class</th>
              <th style={getColumnStyle()}>Weight Lifted</th>
            </tr>
          </thead>
          <tbody>
            {topFemaleCleanJerk.map((athlete, index) => (
              <tr key={index} style={getRowStyle(index)}>
                <td>{index + 1}</td>
                <td>{athlete.name}</td>
                <td>{athlete.weightClass}</td>
                <td>{athlete.weight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}


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
            <option value="Squat">Squat</option>
            <option value="Bench">Bench</option>
            <option value="Deadlift">Deadlift</option>
            <opiton value="Snatch">Snatch</opiton>
            <option value="CleanJerk">Clean & Jerk</option>
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

        {/* Input box for Name */}
      <div className="mb-4">
        <label htmlFor="nameInput">Name:</label>
        <input
          type="text"
          id="nameInput"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>

        {/* Input boxes for discipline based on category to ADD RECORD */}
        {addCategory === 'Olympic' && (
        <>
          <div className="mb-4">
            <label htmlFor="snatchInput">Snatch:</label>
            <input
              type="number"
              id="snatchInput"
              onChange={(e) => setSnatchValue(e.target.value)}
              value={snatchValue}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="cleanJerkInput">Clean & Jerk:</label>
            <input
              type="number"
              id="cleanJerkInput"
              onChange={(e) => setCleanJerkValue(e.target.value)}
              value={cleanJerkValue}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="totalInput">Total:</label>
            <input
              type="number"
              id="totalInput"
              onChange={(e) => setTotalValue(e.target.value)}
              value={totalValue}
            />
          </div>
        </>
      )}
      {addCategory === 'Powerlifting' && (
      <>
        <div className="mb-4">
          <label htmlFor="squatInput">Squat:</label>
          <input
            type="number"
            id="squatInput"
            onChange={(e) => setSquatValue(e.target.value)}
            value={squatValue}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="benchInput">Bench:</label>
          <input
            type="number"
            id="benchInput"
            onChange={(e) => setBenchValue(e.target.value)}
            value={benchValue}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="deadliftInput">Deadlift:</label>
          <input
            type="number"
            id="deadliftInput"
            onChange={(e) => setDeadliftValue(e.target.value)}
            value={deadliftValue}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="totalInput">Total:</label>
          <input
            type="number"
            id="totalInput"
            onChange={(e) => setTotalValue(e.target.value)}
            value={totalValue}
          />
        </div>
      </>
    )}
    {(addCategory === 'Squat' || addCategory === 'Bench' || addCategory === 'Deadlift' || addCategory === 'Snatch' || addCategory === 'CleanJerk') && (
      <div className="mb-4">
        <label htmlFor="weightInput">Weight:</label>
        <input
          type="number"
          id="weightInput"
          onChange={(e) => setWeight(e.target.value)}
          value={weight}
        />
      </div>
    )}
      </div>
    )}


    {/* Submit button for Adding Record */}
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
