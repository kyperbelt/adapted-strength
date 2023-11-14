import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import icon from '../assets/ladyIcon.png'
import NavBar from '../components/navBar';

export default function Home() {
    return (<div>
        <header className="App-header">
            <p>
                THIS IS THE HOME PAGE
            </p>
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
        <button class="w-3/4 App-login-button">
            <Link className="App-Nav_link"
                to="login">
                LOGIN
            </Link>
        </button>
    </div>);
}

