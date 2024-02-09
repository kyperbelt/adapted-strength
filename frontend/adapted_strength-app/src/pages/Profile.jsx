import { Outlet, Link } from "react-router-dom";

import icon from '../assets/ladyIcon.png'

function FNameField() {
    return (<input type="fname" value="First Name" id="fname" name="fname" required className="w-4/5 border-b-4 p-0" />);
}
function LNameField() {
    return (<input type="lname" value="Last Name" id="lname" name="lname" required className="w-4/5 border-b-4 p-0" />);
}
function SxField() {
    return (<input type="sex" value="Sex" id="sex" name="sex" required className="w-4/5 border-b-4 p-0" />);
}


export default function Profile() {
    


    return (
        <div className="w-full h-full flex flex-col bottom-20">
            <p className="bg-[#161A1D] text-white bottom-3 px-0 pt-8 pb-8">
                PROFILE
            </p>

            <div className="bg-[#161A1D] grid place-content-center boarder-2">
                <img src={icon} className="h-20 w-20 " alt="lady icon" />
            </div>
            <p className="bg-[#161A1D] text-white bottom-20">
                Hugh Jabott
            </p>
            <p className="bg-[#161A1D] text-white bottom-20  px-0 pb-8 mb-4">
                hugh.jazz@gmail.com
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
                <SxField />
            </div>

        </div >

    );
}
