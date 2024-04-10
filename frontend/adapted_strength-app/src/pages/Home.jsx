import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import logo from '../assets/logo.png';
import icon from '../assets/ladyIcon.png'

export default function Home() {
    useEffect (() => {
        document.title = "Adapted Strength"; // Set the title when the component mounts
        return () => {
            document.title = "Adapted Strength"; // Optionally reset the title when the component unmounts
        };
    }, []);
    return (
        <div className="w-full flex flex-col items-center">
            
            <header className="flex flex-col items-center justify-center xl:text-xl sm:text-sm text-xxl">
                <img src={logo} className="px-3 py-6" alt="logo" />
                <img src={icon} className="" alt="lady icon" />
                <p>
                    READY TO GET FIT?
                </p>
                <p>
                    Get started below!
                </p>
                <a className="App-link"
                    href="https://adaptedstrength.com"
                    target="_blank"
                    rel="noopener noreferrer">
                    Link to beta app
                </a>
            </header>
            <Link className="mt-5 mb-5 w-3/4 bg-primary hover:bg-red-900 focus:bg-red-800 text-xl text-white p-4 rounded-2xl"
                to="login">
                LOGIN
            </Link>
        </div>);
}


