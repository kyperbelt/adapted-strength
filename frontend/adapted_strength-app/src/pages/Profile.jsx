import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserApi } from "../api/UserApi";
import { HttpStatus } from "../api/ApiUtils";
import { AuthApi } from "../api/AuthApi";
import { PrimaryButton } from "../components/Button";
import { startTransition } from "react";
import { PencilIcon } from "../components/Icons";

function SubscriptionField({ tier }) {
  let subscriptionLabel;
  let badgeColor;
  
  switch (tier) {
    case "ACTIVE":
      subscriptionLabel = "Active";
      badgeColor = "bg-green-100 text-green-800";
      break;
    case "INACTIVE":
    default:
      subscriptionLabel = "Inactive";
      badgeColor = "bg-gray-100 text-gray-800";
  }
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeColor}`}>
      {subscriptionLabel}
    </span>
  );
}

function formatPhoneNumber(phoneNumber) {
  if (!phoneNumber) return "Not provided";
  const cleaned = ("" + phoneNumber).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return "(" + match[1] + ") " + match[2] + "-" + match[3];
  }
  return phoneNumber;
}

function ProfileField({ label, value, action }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-500 mb-1">{label}</h3>
          <div className="text-gray-900">
            {value || "Not provided"}
          </div>
        </div>
        {action && (
          <div className="ml-4">
            {action}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Profile() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [profileInfo, setProfileInfo] = useState({});

  useEffect(() => {
    document.title = "Profile - Adapted Strength";
    setIsLoading(true);
    
    UserApi.getProfileInformation()
      .then((response) => {
        if (response.status === HttpStatus.OK) {
          setProfileInfo(response.data);
          setIsLoading(false);
          console.log(response.data);
        } else {
          AuthApi.logout();
          throw new Error("Error getting profile information");
        }
      }).catch((error) => {
        console.error(`ERROR HAPPENED: ${JSON.stringify(error)}`);
        setIsLoading(false);
        navigate("/login");
        AuthApi.logout();
      });
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  const formattedCellPhone = formatPhoneNumber(profileInfo.cellPhone);
  const formattedHomePhone = formatPhoneNumber(profileInfo.homePhone);

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {profileInfo.firstName}!
          </h1>
          <p className="text-gray-600">Manage your profile information and subscription</p>
        </div>

        {/* Profile Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <ProfileField 
            label="First Name" 
            value={profileInfo.firstName} 
          />
          
          <ProfileField 
            label="Last Name" 
            value={profileInfo.lastName} 
          />
          
          <ProfileField 
            label="Subscription Status" 
            value={<SubscriptionField tier={profileInfo.subscriptionTier} />}
            action={
              <button 
                className="text-blue-600 hover:text-blue-800 transition-colors"
                onClick={() => navigate("/memberships")}
                title="Manage Subscription"
              >
                <PencilIcon className="w-5 h-5" />
              </button>
            }
          />
          
          <ProfileField 
            label="Email Address" 
            value={profileInfo.email} 
          />
          
          <ProfileField 
            label="Cell Phone" 
            value={formattedCellPhone} 
          />
          
          <ProfileField 
            label="Home Phone" 
            value={formattedHomePhone} 
          />
          
          <ProfileField 
            label="Date of Birth" 
            value={profileInfo.dateOfBirth} 
          />
          
          <ProfileField 
            label="Sex" 
            value={profileInfo.sex} 
          />
          
          <ProfileField 
            label="Shirt Size" 
            value={profileInfo.shirtSize} 
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <PrimaryButton
            onClick={() => {
              startTransition(() => {
                navigate("/edit-profile");
              });
            }}
            className="px-6 py-3"
          >
            Edit Profile
          </PrimaryButton>
          
          <button
            onClick={() => navigate("/memberships")}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Manage Subscription
          </button>
        </div>
      </div>
    </div>
  );
}
