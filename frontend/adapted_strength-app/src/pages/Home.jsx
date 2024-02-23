import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import icon from '../assets/ladyIcon.png'

export default function Home() {
    return (<div className="flex flex-col items-center">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <img src={icon} className="App-icon" alt="lady icon" />
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
        <Link className="w-3/4 bg-red-600 hover:bg-red-900 focus:bg-red-800 text-xl text-white p-4 rounded-2xl"
            to="login">
            LOGIN
        </Link>
    </div>);
}


