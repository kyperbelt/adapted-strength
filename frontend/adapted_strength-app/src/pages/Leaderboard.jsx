import { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import Footer from '../components/footer';
import { UserApi } from '../api/UserApi';

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
  const [topAthletes, setTopAthletes] = useState([]);

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
    <br />
    <Footer />
  </div>
);
}






