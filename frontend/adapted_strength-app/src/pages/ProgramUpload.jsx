/*
Module: ProgramUpload.jsx
Team: TeraBITE
*/
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function UserField() {
    return (<input type="username" placeholder="Client ID" id="email" name="email" required className="w-4/5 text-center border-b-4 p-0" />);
}
function DropDownMenu() {
    return (
        <div className="text-center border-b-4 p-1">
            <label htmlFor="specialty-select">Client Specialty: </label>
            <select name="specialty" id="specialty-select">
            <option value="">--Select Specialty--</option>
            <option value="general">General</option>
            <option value="bba">Bodybuilding, Aesthetic</option>
            <option value="oly">Olympic Weightlifting</option>
            <option value="power">Powerlifting</option>
            </select>
        </div>
    );
}
function FileUploadField() {
    return (<input type="file" placeholder="Upload Program" id="email" name="email" required className="text-center w-4/5" />);
}
function NextButton() {
    return (<button href="./profile" type="submit" className="text-slate-200 rounded-full px-3 py-1 "  >
        <Link className="App-Nav_link"
            to="../profile">
            SEND TO CLIENT
        </Link>
    </button>);
}

function AdaptedStrengthLogo() {
    return (<div className="h-full flex flex-col items-center mt-12">
        <img src={logo} alt="Adapted Strength Logo" className="text-slate-200 px-3 py-1" />
    </div>);
}

const ProgUp = () => {
    return (
        <div className="h-full my-0 content-center w-full top-[100px]">
            <div className="h-60 bg-header-background1">
                <AdaptedStrengthLogo />
            </div>
            <h1 className="relative mx-0 text-center text-2xl bottom-20">Hello, Coach!</h1>
            <h3 className="relative mx-0 text-center text-2xl bottom-20">Upload the programs below:</h3>
            <div className="bg-[#161A1D] h-full">
                <div className="relative bottom-10">
                    <div id="programUpload" className="items-center px-20 py-20 bg-slate-50 rounded-3xl pt-8 pb-8 ">
                        <div className="w-full items-center px-0 rounded-3xl">
                            <UserField />
                        </div>
                        <div className="w-full items-center px-0 pt-4 rounded-3x">
                            <DropDownMenu />
                        </div>
                        <div className="w-full items-center px-0 pt-4 rounded-3xl">
                            <FileUploadField />
                        </div>

                    </div>
                </div>
                <button
                    type="button"
                    className="inline-block rounded bg-red-500 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                    <NextButton />
                </button>

            </div>
        </div>)
};


/*
                            <div id="dropdown" className="hidden bg-white divide-y divide-gray-100 rounded-lg">
                                <ul className="py-2" aria-labelledby="dropDownMenu">
                                    <li>
                                        <div className="items-center text-center">
                                            <input id="checkbox-item-general" type="checkbox" value="" className="w-4 h-4 items-center" />
                                            <label for="checkbox-item-general" className="ms-2 font-medium text-black">General</label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="items-center text-center">
                                            <input id="checkbox-item-BBA" type="checkbox" value="" className="w-4 h-4 items-center" />
                                            <label for="checkbox-item-BBA" className="ms-2 font-medium text-black">Body Building, Aesthetics</label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="items-center text-center">
                                            <input id="checkbox-item-power" type="checkbox" value="" className="w-4 h-4 items-center" />
                                            <label for="checkbox-item-power" className="ms-2 font-medium text-black">Powerlifting</label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="items-center text-center">
                                            <input id="checkbox-item-oly" type="checkbox" value="" className="w-4 h-4 items-center" />
                                            <label for="checkbox-item-oly" className="ms-2 font-medium text-black">Olympic Weightlifting</label>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            */

export default ProgUp;
