import { Outlet, Link } from "react-router-dom";

import icon from '../assets/ladyIcon.png'

function NameField() {
    return (<input type="name" placeholder="Team TeraBITE" id="name" name="name" required className="w-4/5 border-b-4 p-0" />);
}
function EmailField() {
    return (<input type="email" placeholder="terabite@gmail.com" id="email" name="email" required className="w-4/5 border-b-4 p-0" />);
}
function SxField() {
    return (<input type="sex" placeholder="Male" id="sex" name="sex" required className="w-4/5 border-b-4 p-0" />);
}


export default function Profile() {
    return (
        <div className="w-full h-full flex flex-col bottom-20">
            <p className="bg-[#161A1D] text-white bottom-3 px-0 pt-8 pb-8">
                PROFILE
            </p>
            <div className="bg-[#161A1D] grid place-content-center flex flex-col boarder-2">
                <img src={icon} className="h-20 w-20 " alt="lady icon" />
            </div>
            <p className="bg-[#161A1D] text-white bottom-20">
                Team TeraBITE
            </p>
            <p className="bg-[#161A1D] text-white bottom-20  px-0 pb-8 mb-4">
                terabite@gmail.com
            </p>
            <Outlet className="" />
            <div className="container place-content-center">
                <div className="w-full p-4 text-left place-content-center">
                    <a> Full Name: </a>
                    <div>
                    <NameField />
                    </div>
                </div>
            </div>
            <div className="container place-content-center">
                <div className="w-full p-4 text-left">
                    <a> Email: </a>
                    <div>
                    <EmailField />
                    </div>
                    
                </div>
            </div>
            <div className="container place-content-center">
                <div className="w-full p-4 text-left">
                    <a> Sex: </a>
                    <div>
                    <SxField />
                    </div>
                </div>
            </div>
        </div >

    );
}
import { Outlet, Link } from "react-router-dom";

import icon from '../assets/ladyIcon.png'

function NameField() {
    return (<input type="name" placeholder="Team TeraBITE" id="name" name="name" required className="w-4/5 border-b-4 p-0" />);
}
function EmailField() {
    return (<input type="email" placeholder="terabite@gmail.com" id="email" name="email" required className="w-4/5 border-b-4 p-0" />);
}
function SxField() {
    return (<input type="sex" placeholder="Male" id="sex" name="sex" required className="w-4/5 border-b-4 p-0" />);
function FNameField() {
    return (<input type="fname" placeholder="First Name" id="fname" name="fname" required className="w-4/5 border-b-4 p-0" />);
}
function LNameField() {
    return (<input type="lname" placeholder="Last Name" id="lname" name="lname" required className="w-4/5 border-b-4 p-0" />);
}
function SxField() {
    return (<input type="sex" placeholder="Sex" id="sex" name="sex" required className="w-4/5 border-b-4 p-0" />);
}


export default function Profile() {
    return (
        <div className="w-full h-full flex flex-col bottom-20">
            <p className="bg-[#161A1D] text-white bottom-3 px-0 pt-8 pb-8">
                PROFILE
            </p>
            <div className="bg-[#161A1D] grid place-content-center flex flex-col boarder-2">
                <img src={icon} className="h-20 w-20 " alt="lady icon" />
            </div>
            <p className="bg-[#161A1D] text-white bottom-20">
                Team TeraBITE
            </p>
            <p className="bg-[#161A1D] text-white bottom-20  px-0 pb-8 mb-4">
                terabite@gmail.com
            </p>
            <Outlet className="" />
            <div className="container place-content-center">
                <div className="w-full p-4 text-left">
                    <a> Full Name: </a>
                    <div>
                    <NameField />
                    </div>
                </div>
            </div>
            <div className="container place-content-center">
                <div className="w-full p-4 text-left">
                    <a> Email: </a>
                    <div>
                    <EmailField />
                    </div>
                    
                </div>
            </div>
            <div className="container place-content-center">
                <div className="w-full p-4 text-left">
                    <a> Sex: </a>
                    <div>
                    <SxField />
                    </div>
                </div>
                Hugh Jabott
            </p>
            <p className="bg-[#161A1D] text-white bottom-20  px-0 pb-8 mb-4">
                hugh.jazz@gmail.com
            </p>
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
