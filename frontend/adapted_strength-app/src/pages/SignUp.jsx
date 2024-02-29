import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import PageContainer1 from '../components/PageContainer';
import { AuthApi } from '../api/AuthApi';

const ErrorType = {
    PasswordsMustMatch: "Passwords must match.",
    PasswordNotLongEnough: "Password must be at least 8 characters long.",
    PasswordMissingSpecialCharacter: "Password must contain at least one special character.",
    PasswordMissingCapitalLetter: "Password must contain at least one capital letter.",
    PasswordMissingDigit: "Password must contain at least one digit.",
    NoError: "NoError Found"
}

function ErrorMessage({ msg, show }) {
    if (!show) {
        return null;
    }
    return (<p className="text-red-500 text-center">{msg}</p>);
}

function validatePassword(password) {
    if (password.length < 8) {
        return ErrorType.PasswordNotLongEnough;
    }
    if (!password.match(/[\d]/)) {
        return ErrorType.PasswordMissingDigit;
    }
    if (!password.match(/[\W]/)) {
        return ErrorType.PasswordMissingSpecialCharacter;
    }
    if (!password.match(/[A-Z]/)) {
        return ErrorType.PasswordMissingCapitalLetter;
    }
    return ErrorType.NoError;
}


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


export default function SignUp() {
    const [error, setError] = useState(ErrorType.NoError);
    const navigate = useNavigate();
    let onSubmit = (e) => {
        e.preventDefault();
        // user registration logic here
        // ...
        let password = e.target.password.value;
        let error = validatePassword(password);
        if (error !== ErrorType.NoError) {
            setError(error);
            return;
        }
        let password2 = e.target.password_conf.value;
        if (password !== password2) {
            setError(ErrorType.PasswordsMustMatch);
            return;
        }


        const email = e.target.email.value;
        AuthApi.signup(email, password)
            .then((response) => {
                if (response.status === 200) {
                    console.log("Signed up!");
                    console.log(response.data);
                } else {
                    console.error("Error logging in", response);
                }
            }).catch((error) => {
                console.error("Error logging in", error);
            });

        setError(ErrorType.NoError);

        // After successful registration, redirect to the Terms of Service page
        // navigate("/health-questionnaire");

        //if (validatePasswordMatch()){ // TODO: ADAPTEDS-89 
        // window.location.href = "/sign-up-additional";
        //store info // TODO: ADAPTEDS-89 
        // this.reset();
        //}
    };
    return (
        <PageContainer1>
            <div className="relative bottom-20">
                <h1 className="relative mx-0 text-center text-2xl bottom-4">Sign Up</h1>
                <div className="flex w-full justify-center" >
                    <form onSubmit={onSubmit} id="sign-up" className="p-0 w-full flex flex-col items-center bg-slate-50 shadow-md rounded-3xl px-0 pt-8 pb-8 mb-4 max-w-xs">
                        <div className="w-3/5 flex flex-col items-center px-0 ">
                            <ErrorMessage msg={error} show={error !== ErrorType.NoError} />
                        </div>
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
        </PageContainer1>
    );
}
