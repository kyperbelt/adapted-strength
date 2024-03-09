import logo from '../assets/logo.png';
import Footer from '../components/footer';
//import { Outlet, Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { UserApi } from '../api/UserApi';


function AdaptedStrengthLogo() {
    return (<div className="flex flex-col items-center mt-12">
        <img src={logo} alt="Adapted Strength Logo" className="w-3/4" />
    </div>);
}

function SubscriptionField({... props}) {
    return (<div> {props.tier}</div>)

}

function ExpirationField({... props}) {
    return (<div> {props.expiration_date}</div>)

}

export default function SubscriptionManagement() {

    const [isLoading, setIsLoading] = useState(true);
    const [profileInfo, setProfileInfo] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        UserApi.getProfileInformation()
            .then((response) => {
                if (response.status === 200) {
                    setProfileInfo(response.data);
                    setIsLoading(false);
                    console.log(response.data)
                } else {
                    // TODO: same as error, redirect to login page or display error message
                }
            }).catch((error) => {
                console.error(`ERROR HAPPENED: ${error}`);
                setIsLoading(false);
                //TODO: User was unable to get profile information, 
                //     redirect to login page or display error message
            });
    }, []);

  if (isLoading) {
    return <div>{"Loading..."}</div>;
  }

  return (
    <div className="h-full my-0 content-center w-full top-[100px]">
        <div className="h-56 bg-header-background1">
            <AdaptedStrengthLogo />
            <div>
                <h2 className='font-bold'>Your Subscription Tier:</h2>
                <p><SubscriptionField tier={profileInfo.subscriptionTier}/></p>
                <h2 className='font-bold'>Next Payment Due:</h2>
                <p><ExpirationField exp={profileInfo.expiration_date}/></p>
            </div>
        </div>
    </div>
  );
}
