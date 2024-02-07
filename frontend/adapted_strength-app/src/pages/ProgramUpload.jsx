/*
Module: ProgramUpload.jsx
Team: TeraBITE
*/
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function UserField() {
    return (<input type="username" placeholder="Client ID" id="email" name="email" required className="w-4/5 border-b-4 p-0" />);
}

function PasswordField() {
    return (<button id="dropdown-button" data-dropdown-toggle="dropdown" placeholder="Password" name="password" className="w-4/5 border-b-4 p-0" />);
}
function NextButton() {
    return (<button href="./profile" type="submit" className="border-slate-50 border-8 bg-black text-slate-200 rounded-full px-3 py-1 "  >
        <Link className="App-Nav_link"
            to="../profile">
            GO
        </Link>
    </button>);
}

function LoggingIn(email) {

}

function AdaptedStrengthLogo() {
    return (<div className="flex flex-col items-center mt-12">
        <img src={logo} className="w-3/4" />
    </div>);
}

const ProgUp = () => {
    return (<div className="h-full my-0 content-center w-full top-[100px]">

        <div className="h-56 bg-header-background1">
            <AdaptedStrengthLogo />
        </div>
        <div className="bg-[#161A1D] h-full">
            <div className="relative bottom-20">
                <h1 className="relative mx-0 text-center text-2xl bottom-4">Hello, Coach!</h1>
                <h3 className="relative mx-0 text-center text-2xl bottom-4">Upload the programs below:</h3>
                <div id="programUpload" className="flex flex-col items-center px-0 bg-slate-50 shadow-md rounded-3xl pt-8 pb-8 ">
                    <div className="w-full flex flex-col items-center px-0 ">
                        <UserField />
                    </div>
                    <div className="w-full flex flex-col items-center px-0 pt-4">
                        <PasswordField />
                    </div>
                    <div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                            <li>
                                <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Powerlifting</button>
                            </li>
                            <li>
                                <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Body Building</button>
                            </li>
                            <li>
                                <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Olympic Weightlifting</button>
                            </li>
                            <li>
                                <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">General Strength</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <button
                type="button"
                className="inline-block rounded bg-red-500 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
                <a href="../profile">Submit</a>
            </button>

        </div>
    </div>)
};

export default ProgUp;
