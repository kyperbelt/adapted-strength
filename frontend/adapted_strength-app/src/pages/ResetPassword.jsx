import React, { useState } from "react";
import { AuthApi } from "../api/AuthApi";
import PasswordField from "../components/forms/PasswordField";
import SubmitButton from "../components/forms/SubmitButton";
import PageContainer1 from "../components/PageContainer"
import { useLocation, useNavigate } from "react-router-dom";
import { HttpStatus } from "../api/ApiUtils";

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

export default function ResetPassword() {
    const [error, setError] = useState(ErrorType.NoError);
    const navigate = useNavigate();
    const location = useLocation();
    const search = location.search;
    const params = new URLSearchParams(search);
    const token = params.get('token');


    let onSubmit = (e) => {
        e.preventDefault();
        let password = e.target.pwd1.value;
        let error = validatePassword(password);
        if (error !== ErrorType.NoError) {
            setError(error);
            return;
        }
        let password2 = e.target.pwd2.value;
        if (password !== password2) {
            setError(ErrorType.PasswordsMustMatch);
            return;
        }

        setError(ErrorType.NoError);

        console.log(`Resetting password for token: ${token}`);
        AuthApi.resetPassword(password, token).then((response) => {
            if (response.status === HttpStatus.OK) {
                console.log("Password reset successful");
                navigate("/login");
            } else {
                console.error("Error resetting password: ", response);
            }
        }).catch((error) => {
            console.error("ERROR_HAPPENED:",error);
        });
    };



    return (
        <PageContainer1>
            <div className="relative bottom-20">
                <h1 className="relative mx-0 text-center text-2xl bottom-4">Reset Password</h1>
                <div className="flex w-full justify-center" >
                    <form onSubmit={onSubmit} className="p-0 w-full flex flex-col items-center bg-slate-50 shadow-md rounded-3xl px-0 pt-8 pb-8 mb-4 max-w-xs">

                        <div className="w-3/5 flex flex-col items-center px-0 ">
                            <ErrorMessage msg={error} show={error !== ErrorType.NoError} />
                        </div>
                        <div className="w-full flex flex-col items-center px-0 mt-6">
                            <PasswordField id="pwd1" placeholder="Password" title="" pattern=".*" />
                        </div>
                        <div className="w-full flex flex-col items-center px-0 mt-6">
                            <PasswordField id="pwd2" placeholder="Repeat Password" pattern=".*" />
                        </div>
                        <div className="flex justify-center w-full relative top-14">
                            <SubmitButton text="Reset" onClick={console.log("clicked")} />
                        </div>
                    </form>
                </div>
            </div>
        </PageContainer1>
    );
}
