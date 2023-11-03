/*
Module: App.js
Team: TeraBITE
*/
import logo from './logo.png';
import icon from './ladyIcon.png'
import './App.css';
import NavBar from './components/navBar';

function App() {
  return (
    <div className="App">
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
      <nav class = "App-nav">
        <NavBar></NavBar>
      </nav>
    </div>
  );
}

export default App;
