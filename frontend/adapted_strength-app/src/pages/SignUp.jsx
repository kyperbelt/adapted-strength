import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

// TODO: ADAPTEDS-89 
/*function validatePasswordMatch() {   
    var password = document.getElementById("password").value;
    var password_conf = document.getElementById("password_conf").value;

    if (password !== password_conf) {
        return false;
    } else {
        return true;
    }
}
*/


function EmailField() {
    return (<input type="email" placeholder="Email Address" id="email" name="email" required />);
}
function PasswordField() {
    return (<input type="text" placeholder="Password" id="password" name="password" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,255}$"
        title="Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character. It should be between 8 and 255 characters long."
    /*onchange="validatePasswordMatch()" // TODO: ADAPTEDS-89*/ required />);
}
function PasswordConfirmationField() {
    return (<input type="text" placeholder="Re-Enter Password" id="password_conf" name="password_confirmation" /*onchange="validatePasswordMatch()" // TODO: ADAPTEDS-89*/ required />);
}
function SubmitButton() {
    return (<button type="submit" className="border-slate-50 border-8 bg-black text-slate-200 rounded-full px-3 py-1 "  >Next</button>);
}

function AdaptedStrengthLogo() {
    return (<div className="flex flex-col items-center mt-12">
        <img src={logo} alt="Adapted Strength Logo" className="w-3/4" />
    </div>);
}

export default function SignUp() {
    const navigate = useNavigate();
    let HandleSubmit = (event) => {
        event.preventDefault();
        // user registration logic here
        // ...

        // After successful registration, redirect to the Terms of Service page
        navigate("/terms-of-service");

        //if (validatePasswordMatch()){ // TODO: ADAPTEDS-89 
        // window.location.href = "/sign-up-additional";
        //store info // TODO: ADAPTEDS-89 
        // this.reset();
        //}
    };
    return (
        <div className="h-full my-0 content-center w-full top-[100px]">
            <div className="h-56 bg-header-background1">
                <AdaptedStrengthLogo />
            </div>
            <div className="bg-[#161A1D] h-full">
                <div className="relative bottom-20">
                    <h1 className="relative mx-0 text-center text-2xl bottom-4">Sign Up</h1>
                    <div className="flex w-full justify-center" >
                        <form onSubmit={HandleSubmit} id="sign-up" className="p-0 w-full flex flex-col items-center bg-slate-50 shadow-md rounded-3xl px-0 pt-8 pb-8 mb-4 max-w-xs">
                            <div className="w-full flex flex-col items-center px-0 pt-8">
                                <EmailField />
                            </div>
                            <div className="w-full flex flex-col items-center px-0 pt-8">
                                <PasswordField />
                            </div>
                            <div className="w-full flex flex-col items-center px-0 pt-8">
                                <PasswordConfirmationField />
                            </div>
                            <div className="flex justify-center w-full relative top-14">
                                <SubmitButton />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
