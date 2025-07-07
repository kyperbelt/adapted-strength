import { HttpStatus } from "../api/ApiUtils";
import { useEffect, useState, useRef } from "react";
import { AuthApi } from "../api/AuthApi";
import { UserApi } from "../api/UserApi";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../components/Button";

function MembershipStatusBadge({ tier }) {
  const getStatusDisplay = (tier) => {
    switch (tier) {
      case "ACTIVE":
        return { label: "Active", color: "bg-green-100 text-green-800 border-green-200" };
      case "INACTIVE":
      default:
        return { label: "Inactive", color: "bg-red-100 text-red-800 border-red-200" };
    }
  };

  const status = getStatusDisplay(tier);
  
  return (
    <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${status.color}`}>
      <div className={`w-2 h-2 rounded-full mr-2 ${tier === "ACTIVE" ? "bg-green-500" : "bg-red-500"}`}></div>
      {status.label}
    </span>
  );
}

function MembershipCard({ tier, onBackToProfile }) {
  const getStatusMessage = (tier) => {
    if (tier === "ACTIVE") {
      return {
        title: "Membership Active",
        message: "Your membership is currently active. You have full access to all gym services, personalized programming, and coaching support.",
        benefits: [
          "Access to personalized training programs",
          "Movement library and exercise videos", 
          "Direct coaching support and feedback",
          "Progress tracking and program updates"
        ]
      };
    } else {
      return {
        title: "Membership Inactive", 
        message: "Your membership is currently inactive. Contact Coach Alex to activate your membership and start your fitness journey.",
        benefits: [
          "Personalized training program design",
          "Access to comprehensive movement library",
          "One-on-one coaching and support",
          "Flexible training schedules"
        ]
      };
    }
  };

  const statusInfo = getStatusMessage(tier);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">{statusInfo.title}</h2>
          <MembershipStatusBadge tier={tier} />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-gray-600 mb-6">
          {statusInfo.message}
        </p>

        {/* Benefits */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            {tier === "ACTIVE" ? "Your Active Benefits" : "Available Benefits"}
          </h3>
          <ul className="space-y-2">
            {statusInfo.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className={`rounded-lg p-4 mb-6 ${tier === "ACTIVE" ? "bg-blue-50 border border-blue-200" : "bg-orange-50 border border-orange-200"}`}>
          <div className="flex items-start">
            <svg className={`w-5 h-5 mt-0.5 mr-3 ${tier === "ACTIVE" ? "text-blue-600" : "text-orange-600"}`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <p className={`text-sm font-medium ${tier === "ACTIVE" ? "text-blue-800" : "text-orange-800"}`}>
                {tier === "ACTIVE" ? "Questions about your membership?" : "Ready to get started?"}
              </p>
              <p className={`text-sm ${tier === "ACTIVE" ? "text-blue-700" : "text-orange-700"}`}>
                Contact Coach Alex directly to {tier === "ACTIVE" ? "discuss your training goals or make changes to your membership" : "activate your membership and begin your personalized training program"}.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <PrimaryButton
            onClick={onBackToProfile}
            className="flex-1"
          >
            Back to Profile
          </PrimaryButton>
          
          {tier === "ACTIVE" && (
            <button
              onClick={() => window.location.href = "/user-programs"}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              View My Programs
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Memberships() {
  const navigate = useNavigate();
  const [tier, setTier] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const isLoggedIn = useRef(AuthApi.isLoggedIn());

  useEffect(() => {
    document.title = "Memberships - Adapted Strength";
    
    if (!isLoggedIn.current) {
      navigate("/login");
      return;
    }

    setIsLoading(true);
    UserApi.getProfileInformation()
      .then((r) => {
        if (r.status === HttpStatus.OK) {
          console.log(r.data);
          setTier(r.data.subscriptionTier);
        } else {
          console.error("Failed to get profile information");
        }
      })
      .catch((e) => {
        console.error("Error fetching profile:", e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [navigate]);

  if (!isLoggedIn.current) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your membership information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Membership</h1>
          <p className="text-gray-600">Manage your Adapted Strength membership</p>
        </div>

        {/* Membership Card */}
        <MembershipCard 
          tier={tier} 
          onBackToProfile={() => navigate("/profile")}
        />
      </div>
    </div>
  );
}
