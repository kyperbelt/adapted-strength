/*
Module: Power.jsx
Team: TeraBITE
*/
import { Outlet, Link } from "react-router-dom";
import programFiller from "../../assets/blank_filler.png"

function UserField() {
    return (<input type="fname" placeholder="First Name" id="fname" name="fname" required className="w-4/5 border-b-4 p-0" />);
}
function SpecialtyField() {
    return (<input type="lname" placeholder="Last Name" id="lname" name="lname" required className="w-4/5 border-b-4 p-0" />);
}

export default function Power() {
    return (
        <div className="w-full h-full flex flex-col bottom-20">
            <p className="bg-[#161A1D] text-white bottom-3 px-0 pt-8 pb-8">
            YOUR PROGRAM: Powerlifting
            </p>
            <img src={programFiller} className="h-20 w-20 grid place-content-center flex flex-col boarder-2" alt="workout program" />
        </div>
    );
}
