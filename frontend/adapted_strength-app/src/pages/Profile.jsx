import { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { UserApi } from "../api/UserApi";
import { HttpStatus } from "../api/ApiUtils";
import Footer from '../components/footer';
import logo from '../assets/logo.png';
import { AuthApi } from "../api/AuthApi";

function AdaptedStrengthLogo() {
    return (
      <div className="logo-container">
        <img src={logo} alt="Adapted Strength Logo" className="logo" />
      </div>
    );
}

function SubscriptionField({ tier }) {
    let subscriptionLabel;
    switch (tier) {
        case 'BASE_CLIENT':
            subscriptionLabel = 'Base Client';
            break;
        case 'GENERAL_CLIENT':
            subscriptionLabel = 'General Client';
            break;
        case 'SPECIFIC_CLIENT':
            subscriptionLabel = 'Specific Client';
            break;
        default:
            subscriptionLabel = 'Unknown';
    }
    return <div className="subscription-tier">{subscriptionLabel}</div>;
}

function formatPhoneNumber(phoneNumber) {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return null;
}

export default function Profile() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [profileInfo, setProfileInfo] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        UserApi.getProfileInformation()
            .then((response) => {
                if (response.status === HttpStatus.OK) {
                    setProfileInfo(response.data);
                    setIsLoading(false);
                    console.log(response.data)
                } else if (response.status === HttpStatus.UNAUTHORIZED) { // unauthorized
                    // TODO: same as error, redirect to login page or display error message
                    console.error(`ERROR HAPPENED: ${JSON.stringify(response.data)}`);
                    if (response.data.all.includes("ROLE_TERMS_ACCEPTED")) {
                        console.log("User has not accepted terms and conditions");
                        AuthApi.logout();
                        navigate("/login");

                    } else if (response.data.all.includes("ROLE_ACCOUNT_SETUP")) {
                        console.log("User has not setup account");
                        navigate("/logout");
                    }
                }
            }).catch((error) => {
                console.error(`ERROR HAPPENED: ${JSON.stringify(error)}`);
                setIsLoading(false);
                //TODO: User was unable to get profile information, 
                //     redirect to login page or display error message
            });
    }, []);

    if (isLoading) {
        return <div>{"Loading..."}</div>
    }
    const formattedCellPhone = formatPhoneNumber(profileInfo.cellPhone);
    const formattedHomePhone = formatPhoneNumber(profileInfo.homePhone);

    return (
        <div>
            <style>{`
                .header {
                    background-color: rgba(255, 10, 30, 0.5);
                    padding: 20px 0;
                    text-align: center;
                }
                
                .logo-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    margin-bottom: 20px;
                }
                
                .logo {
                    width: 400px;
                }
                
                .profile-container {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                }
                
                .page-title {
                    font-size: 24px;
                    font-weight: bold;
                    text-align: center;
                    margin-bottom: 20px;
                }
                
                .grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                    grid-gap: 20px;
                }
                
                .profile-item {
                    background-color: #f9f9f9;
                    padding: 10px;
                    border-radius: 5px;
                }
                
                .label {
                    font-weight: bold;
                }
                
                .value {
                    margin-top: 5px;
                }
                
            `}</style>
            <div className="header">
                <AdaptedStrengthLogo />
            </div>
            <div className="profile-container">
                <h1 className="page-title">User Profile</h1>
                <div className="grid">
                    <div className="profile-item">
                        <h2 className="label">First Name:</h2>
                        <p className="value">{profileInfo.firstName}</p>
                    </div>
                    <div className="profile-item">
                        <h2 className="label">Last Name:</h2>
                        <p className="value">{profileInfo.lastName}</p>
                    </div>
                    <div className="profile-item">
                        <h2 className="label">Subscription Tier:</h2>
                        <SubscriptionField tier={profileInfo.subscriptionTier} />
                    </div>
                    <div className="profile-item">
                        <h2 className="label">Date of Birth:</h2>
                        <p className="value">{profileInfo.dateOfBirth}</p>
                    </div>
                    <div className="profile-item">
                        <h2 className="label">Sex:</h2>
                        <p className="value">{profileInfo.sex}</p>
                    </div>
                    <div className="profile-item">
                        <h2 className="label">Shirt Size:</h2>
                        <p className="value">{profileInfo.shirtSize}</p>
                    </div>
                    <div className="profile-item">
                        <h2 className="label">Cell Phone:</h2>
                        <p className="value">{formattedCellPhone}</p>
                    </div>
                    <div className="profile-item">
                        <h2 className="label">Home Phone:</h2>
                        <p className="value">{formattedHomePhone}</p>
                    </div>
                    <div className="profile-item">
                        <h2 className="label">Email:</h2>
                        <p className="value">{profileInfo.email}</p>
                    </div>
                    <div className="profile-item">
                        <h2 className="label">How Did You Hear:</h2>
                        <p className="value">{profileInfo.howDidYouHear}</p>
                    </div>
                    {/* Add more fields as needed */}
                </div>
                <br></br>
                <div>
                    <Link to="/edit-profile" className="border-slate-50 border-8 bg-black text-slate-200 rounded-full px-3 py-1 ">
                        Edit Profile
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    );
}
