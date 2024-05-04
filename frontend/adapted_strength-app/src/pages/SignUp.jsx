import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import PageContainer1, {PageContainer2} from '../components/PageContainer';
import { AuthApi } from '../api/AuthApi';
import { HttpStatus } from '../api/ApiUtils';
import LabeledInputField from '../components/forms/LabeledInputField';
import { PrimaryButton } from '../components/Button';

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
    return (<LabeledInputField type="email" placeholder="Email Address" id="email" name="email" required />);
}
function PasswordField() {
    return (<LabeledInputField type="text" placeholder="Password" id="password" name="password" pattern={"^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$#!%*?&])[A-Za-z\\d@$!#%*?&]{8,255}$"}
        title="Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character. It should be between 8 and 255 characters long."
    /*onchange="validatePasswordMatch()" // TODO: ADAPTEDS-89*/ required />);
}
function PasswordConfirmationField() {
    return (<LabeledInputField type="text" placeholder="Re-Enter Password" id="password_conf" name="password_confirmation" /*onchange="validatePasswordMatch()" // TODO: ADAPTEDS-89*/ required />);
}
function SubmitButton() {
    return (<PrimaryButton type="submit" className="border-primary border-8 rounded-full px-3 py-1 "  >Next</PrimaryButton>);
}


export default function SignUp() {
    const [error, setError] = useState(ErrorType.NoError);
    const navigate = useNavigate();
    let onSubmit = (e) => {
        e.preventDefault();
        // user registration logic here
        // ...
        let password = e.target.password.value;
        // validate credentials locally, but also validate on the server
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

        // TODO: Display a processing message while the request is being made
        AuthApi.validateCredentials(email, password)
            .then((response) => {
                console.log(response);
                if (response.status === HttpStatus.OK) {
                    console.log("User is valid and can proceed to the next page.");
                    // user is valid 
                    navigate("/terms-of-service", { state: { email: email, password: password } });
                    // TODO: save state to local storage so that in the event that the user 
                    //      navigates away from the page, the state is not lost and the user 
                    //      can continue where they left off
                } else if (response.status === HttpStatus.CONFLICT) { // conflict means email is already in use
                    // TODO: display error message
                    setError("Email is already in use.");
                }
            }).catch((error) => {
                console.error(`ERROR HAPPENED: ${error}`);
                // TODO: same as error, redirect to login page or display error message

            });

        setError(ErrorType.NoError);
    };
    return (
        <PageContainer2>
            <div className="relative bottom-20">
                <h1 className="relative mx-0 text-center text-2xl bottom-4">Sign Up</h1>
                <div className="flex w-full justify-center" >
                    <form onSubmit={onSubmit} id="sign-up" className="p-0 w-full flex flex-col items-center bg-primary shadow-md rounded-3xl px-0 pt-8 pb-8 mb-4 max-w-xs">
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
        </PageContainer2>
    );
}
