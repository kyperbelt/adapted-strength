//import { useEffect, useState } from 'react';
//import logo from '../assets/logo.png';
//import Footer from '../components/footer';
//import { UserApi } from '../api/UserApi';

// Olympic Male:
// 55 61 67 73 81 89 96 102 109 109+

// Olympic Female:
// 45 49 55 59 64 71 76 81 87 87+

// Powerlifting Male:
// 52 56 60 67.5 75 82.5 90 100 110 125 140 140+

// Powerlifting Female:
// 44 48 52 56 60 67.5 75 82.5 90 100 100+

/*
<p className='font-bold text-lg'>Adapted Strength (A.S.) All Time Records</p>
<h3>Search records here:</h3>   
</div>
*/

import { useState } from 'react';
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

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedGender(null); // Reset gender when category changes
    setSelectedWeightClass(null); // Reset weight class when category changes
  };

  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
    setSelectedWeightClass(null); // Reset weight class when gender changes
  };

  return (
    <div className="h-full my-0 content-center w-full top-[100px]">
      <br />
      <div className="h-56 bg-header-background1">
        <AdaptedStrengthLogo />
      </div>
      <br />
      <div>
        <p className='font-bold text-lg'>Adapted Strength (A.S.) All Time Records</p> 
        <br></br>
      </div>
      {/* Dropdown menus */}
      <div>
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
        <div>
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
        <div>
          <label htmlFor="weightClass">Weight Class:</label>
          <select
            id="weightClass"
            onChange={(e) => setSelectedWeightClass(e.target.value)}
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
      {/* Display leaderboard based on selectedCategory, selectedGender, and selectedWeightClass */}
      {/* Further implementation can go here */}
      <Footer />
    </div>
  );
}


