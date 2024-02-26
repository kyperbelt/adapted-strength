/*
Module: Profile.jsx
Team: TeraBITE
*/
import { Outlet, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserApi } from "../api/UserApi";


import icon from '../assets/ladyIcon.png'

function FNameField() {
    return (<input type="fname" defaultValue="First Name" id="fname" name="fname" required className="w-4/5 border-b-4 p-0" />);
}
function LNameField() {
    return (<input type="lname" defaultValue="Last Name" id="lname" name="lname" required className="w-4/5 border-b-4 p-0" />);
}

function AddrField() {
    return (<input type="address" placeholder="Address" id="address" name="address" required className="w-4/5 border-b-4 p-0" />);
}
function CityField() {
    return (<input type="city" placeholder="City" id="city" name="city" required className="w-4/5 border-b-4 p-0" />);
}
function StateField() {
    return (<input type="state" placeholder="State" id="state" name="state" required className="w-4/5 border-b-4 p-0" />);
}
function ZipField() {
    return (<input type="zip" placeholder="Zip Code" id="zip" name="zip" required className="w-4/5 border-b-4 p-0" />);
}
function PhoneField() {
    return (<input type="phoneNum" placeholder="Phone Number" id="phoneNum" name="phoneNum" required className="w-4/5 border-b-4 p-0" />);
}

function SxField() {
    return (<input type="sex" defaultValue="Sex" id="sex" name="sex" required className="w-4/5 border-b-4 p-0" />);

}
function SubscriptionField({... props}) {
    return (<div> Subscription Tier : {props.tier}</div>)

}

export default function Profile() {

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
        return <div>{"Loading..."}</div>
    }

    return (
        <div className="w-full h-full flex flex-col bottom-20">
            <p className="bg-[#161A1D] text-white bottom-3 px-0 pt-8 pb-8">
                Your Profile:
            </p>

            <div className="bg-[#161A1D] grid place-content-center boarder-2">
                <img src={icon} className="h-20 w-20 " alt="lady icon" />
            </div>
            <p className="bg-[#161A1D] text-white bottom-20">
                Hugh Jay
            </p>
            <p className="bg-[#161A1D] text-white bottom-20  px-0 pb-8 mb-4">
                hugh.jay@gmail.com
            </p>
            <Link to="/edit-profile" className="bg-[#161A1D] text-white bottom-20  px-0 pb-8 mb-4">
                Edit Profile
            </Link>
            <Outlet className="" />
            <div className="w-full flex flex-col items-center px-0 ">
                <FNameField />
            </div>
            <div className="w-full flex flex-col items-center px-0 pt-4">
                <LNameField />
            </div>
            <div className="w-full flex flex-col items-center px-0 pt-4">
                <AddrField />
            </div>
            <div className="w-full flex flex-col items-center px-0 pt-4">
                <CityField />
            </div>
            <div className="w-full flex flex-col items-center px-0 pt-4">
                <StateField />
            </div>
            <div className="w-full flex flex-col items-center px-0 pt-4">
                <ZipField />
            </div>
            <div className="w-full flex flex-col items-center px-0 pt-4">
                <PhoneField />
            </div>
            <div className="w-full flex flex-col items-center px-0 pt-4">
                
            </div>

        </div >

    );
    // <SubscriptionField tier={profileInfo.subscriptionTier}/>
}
