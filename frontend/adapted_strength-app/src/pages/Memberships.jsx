import { HttpStatus } from "../api/ApiUtils";
import logo from "../assets/logo.png";
import { useEffect, useState, useRef } from "react";
import { AuthApi } from "../api/AuthApi";
import { UserApi } from "../api/UserApi";
import { useNavigate } from "react-router-dom";
import PageContainer1 from "../components/PageContainer";

function AdaptedStrengthLogo() {
  return (
    <div className="flex flex-col items-center mt-12">
      <img src={logo} alt="Adapted Strength Logo" className="w-3/4" />
    </div>
  );
}

export default function Memberships() {
  const nav = useNavigate();
  const [tier, setTier] = useState(null);
  const isLoggedIn = useRef(AuthApi.isLoggedIn());

  useEffect(() => {
    if (AuthApi.isLoggedIn()) {
      UserApi.getProfileInformation()
        .then((r) => {
          if (r.status === HttpStatus.OK) {
            console.log(r.data);
            setTier(r.data.subscriptionTier);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);

  if (!isLoggedIn.current) {
    nav("/login");
    return null;
  }

  return <MembershipStatus tier={tier} nav={nav} />;
}

function MembershipStatus({ tier, nav }) {
  const getStatusDisplay = (tier) => {
    switch (tier) {
      case "BASE_CLIENT":
      case "GENERAL_CLIENT":
      case "SPECIFIC_CLIENT":
        return "Active";
      case "NO_SUBSCRIPTION":
      default:
        return "Inactive";
    }
  };

  const getStatusMessage = (tier) => {
    const status = getStatusDisplay(tier);
    if (status === "Active") {
      return "Your membership is currently active. You have access to all gym services and programming.";
    } else {
      return "Your membership is currently inactive. Please contact Alex to activate your membership.";
    }
  };

  return (
    <PageContainer1>
      <AdaptedStrengthLogo />
      <div className="flex flex-col items-center mt-8 px-6">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Membership Status
          </h2>
          
          <div className="text-center mb-6">
            <div className={`inline-block px-4 py-2 rounded-full text-lg font-semibold ${
              getStatusDisplay(tier) === "Active" 
                ? "bg-green-100 text-green-800" 
                : "bg-red-100 text-red-800"
            }`}>
              {getStatusDisplay(tier)}
            </div>
          </div>

          <p className="text-gray-600 text-center mb-6">
            {getStatusMessage(tier)}
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  <strong>Need help with your membership?</strong>
                  <br />
                  Contact Alex directly to discuss membership options, 
                  activation, or any questions about your account.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => nav("/profile")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Back to Profile
            </button>
          </div>
        </div>
      </div>
    </PageContainer1>
  );
}
