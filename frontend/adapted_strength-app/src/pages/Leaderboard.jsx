import { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import Footer from '../components/footer';
import { UserApi } from '../api/UserApi';

// Olympic Male:
// 55 61 67 73 81 89 96 102 109 109+

// Olympic Female:
// 45 49 55 59 64 71 76 81 87 87+

// Powerlifting Male:
// 52 56 60 67.5 75 82.5 90 100 110 125 140 140+

// Powerlifting Female:
// 44 48 52 56 60 67.5 75 82.5 90 100 100+

function AdaptedStrengthLogo() {
  return (
    <div className="flex flex-col items-center mt-12">
      <img src={logo} alt="Adapted Strength Logo" className="w-3/4" />
    </div>
  );
}

export default function Leaderboard() {
  const [olympicMaleData, setOlympicMaleData] = useState([]);
  const [olympicFemaleData, setOlympicFemaleData] = useState([]);
  const [powerliftingMaleData, setPowerliftingMaleData] = useState([]);
  const [powerliftingFemaleData, setPowerliftingFemaleData] = useState([]);

  useEffect(() => {
    // Fetch data for each weight class from the backend API
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    try {
      const olympicMaleResponse = await UserApi.getTop10MaleAthletesByWeightClass('80');
      const olympicFemaleResponse = await UserApi.getTop10FemaleAthletesByWeightClass('45');
      const powerliftingMaleResponse = await UserApi.getTop10MalePowerliftersByWeightClass('60');
      const powerliftingFemaleResponse = await UserApi.getTop10FemalePowerliftersByWeightClass('90');

      setOlympicMaleData(olympicMaleResponse.data);
      setOlympicFemaleData(olympicFemaleResponse.data);
      setPowerliftingMaleData(powerliftingMaleResponse.data);
      setPowerliftingFemaleData(powerliftingFemaleResponse.data);
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
    }
  };

  return (
    <div className="h-full my-0 content-center w-full top-[100px]">
      <br />
      <div className="h-56 bg-header-background1">
        <AdaptedStrengthLogo />
      </div>
      <br />
      {/* Display tables for each discipline and gender */}
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-bold">Olympic Weightlifting</h2>
        <h3 className="text-lg font-semibold">Male</h3>
        <table>
          {/* Table for top 10 male Olympic lifters */}
          {/* Iterate over olympicMaleData to display the rows */}
        </table>
        <h3 className="text-lg font-semibold">Female</h3>
        <table>
          {/* Table for top 10 female Olympic lifters */}
          {/* Iterate over olympicFemaleData to display the rows */}
        </table>
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-bold">Powerlifting</h2>
        <h3 className="text-lg font-semibold">Male</h3>
        <table>
          {/* Table for top 10 male powerlifters */}
          {/* Iterate over powerliftingMaleData to display the rows */}
        </table>
        <h3 className="text-lg font-semibold">Female</h3>
        <table>
          {/* Table for top 10 female powerlifters */}
          {/* Iterate over powerliftingFemaleData to display the rows */}
        </table>
      </div>
      <Footer />
    </div>
  );
}
