import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { AuthApi } from '../api/AuthApi';
import { HttpStatus } from '../api/ApiUtils';
import { PrimaryButton } from '../components/Button';

const ErrorType = {
    PasswordsMustMatch: "Passwords must match.",
    PasswordNotLongEnough: "Password must be at least 8 characters long.",
    PasswordMissingSpecialCharacter: "Password must contain at least one special character.",
    PasswordMissingCapitalLetter: "Password must contain at least one capital letter.",
    PasswordMissingDigit: "Password must contain at least one digit.",
    NoError: "NoError Found"
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
    return (<div className="mb-4 w-full px-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
               id="email" type="email" placeholder="Email Address" name="email" required />
    </div>);
}

function PasswordField() {
    return (<div className="mb-4 w-full px-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
               id="password" type="password" placeholder="Password" name="password" 
               pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$#!%*?&])[A-Za-z\\d@$!#%*?&]{8,255}$"
               title="Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character. It should be between 8 and 255 characters long."
               required />
    </div>);
}

function PasswordConfirmationField() {
    return (<div className="mb-6 w-full px-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password_conf">
            Confirm Password
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
               id="password_conf" type="password" placeholder="Re-Enter Password" name="password_confirmation" required />
    </div>);
}

function NextButton() {
    return (<PrimaryButton type="submit" className="border-primary border-8 rounded-full px-3 py-1">
        Next
    </PrimaryButton>);
}

function LoginLinkText() {
    return (<p className="text-center text-gray-500 text-xs">
        Already have an account? <Link to="/login" className="text-blue-500 hover:text-blue-800">Sign In</Link>
    </p>);
}


export default function SignUp() {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Sign Up - Adapted Strength";
        return () => {
            document.title = "Adapted Strength";
        };
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        setError('');

        const password = e.target.password.value;
        const password2 = e.target.password_conf.value;
        const email = e.target.email.value;

        // Validate passwords locally
        const passwordError = validatePassword(password);
        if (passwordError !== ErrorType.NoError) {
            setError(passwordError);
            return;
        }

        if (password !== password2) {
            setError(ErrorType.PasswordsMustMatch);
            return;
        }

        // Validate credentials with server
        AuthApi.validateCredentials(email, password)
            .then((response) => {
                console.log(response);
                if (response.status === HttpStatus.OK) {
                    console.log("User is valid and can proceed to the next page.");
                    navigate("/terms-of-service", { state: { email: email, password: password } });
                } else if (response.status === HttpStatus.CONFLICT) {
                    setError("Email is already in use.");
                }
            }).catch((error) => {
                console.error(`ERROR HAPPENED: ${error}`);
                setError("An error occurred. Please try again.");
            });
    };

    return (
        <div className="min-h-screen pt-16 flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8">
                <div>
                    <h1 className="text-center text-2xl font-bold text-gray-900 mb-8">Create Account</h1>
                    <form onSubmit={onSubmit} className="bg-white shadow-md rounded-3xl px-8 pt-8 pb-8 space-y-6">
                        <EmailField />
                        <PasswordField />
                        <PasswordConfirmationField />
                        {error && (
                            <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-md">
                                {error}
                            </div>
                        )}
                        <div className="flex justify-center">
                            <NextButton />
                        </div>
                        <div className="text-center">
                            <LoginLinkText />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
