//import { BrowserRouter as Router, Switch} from 'react-router-dom';
//import { Login_Page } from './pages/Login_page';
//import { Forgot_Pass } from './pages/Forgot_Pass';
//import { Not_Found } from './pages/Not_Found';
export default function NavBar(){
    return (
      <button>
        <a className="App-Nav_link"
          href="C:\Users\casey\Documents\CSC 190\adapted-strength\frontend\adapted_strength-app\src\Login.js"
          target="_blank"
          rel="noopener noreferrer">LOGIN
        </a>
        
      </button> 
    );

    /*
    <Router>
          <Switch>
            <Route path="/">
              <Landing_Page />
            </Route>
            <Route path="/forgot_pass/:forgPass">
              <ForgotPass />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Router>
    */
}