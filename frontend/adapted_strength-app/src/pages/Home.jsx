import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import icon from '../assets/ladyIcon.png'
import navBar from '../components/navBar';
// import footer from '../footer'
//
function login(){
    // post request to localhost:8080/v1/user/login
    // with body {username: "username", password: "password"}
    // solve for CORS issue
    return fetch('http://localhost:8080/v1/auth/login', {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username: "jonathancamarenacamacho@gmail.com", password: "Password#123"}),
    }).then(response => response.json());
};

const data = login();

export default function Home() {
    return (<div>
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
        <button className="w-3/4 App-login-button">
            <Link className="App-Nav_link"
                to="login">
                LOGIN
            </Link>
        </button>
    </div>);
}


