/*
Module: Login.jsx
Team: TeraBITE
*/
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { PrimaryButton } from '../components/Button';

function UserField() {
    return (<div className="mb-4 w-full px-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" />
    </div>);
}

function PasswordField() {
    return (<div className="mb-6 w-full px-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
    </div>);
}
function NextButton() {
    return (<PrimaryButton type="submit" className="border-primary border-8  rounded-full px-3 py-1 "  >
        Login
    </PrimaryButton>);
}

function GoogleLogo() {
    return (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.8055 8.0415H19V8H10V12H15.6515C14.827 14.3285 12.6115 16 10 16C6.6865 16 4 13.3135 4 10C4 6.6865 6.6865 4 10 4C11.5295 4 12.921 4.577 13.9805 5.5195L16.809 2.691C15.023 1.0265 12.634 0 10 0C4.4775 0 0 4.4775 0 10C0 15.5225 4.4775 20 10 20C15.5225 20 20 15.5225 20 10C20 9.3295 19.931 8.675 19.8055 8.0415Z" fill="#FFC107" />
        <path d="M1.1535 5.3455L4.438 7.797C5.3275 5.592 7.4805 4 10 4C11.5295 4 12.921 4.577 13.9805 5.5195L16.809 2.691C15.023 1.0265 12.634 0 10 0C6.159 0 2.828 2.1685 1.1535 5.3455Z" fill="#FF3D00" />
        <path d="M10 20C12.583 20 14.93 19.0115 16.7045 17.404L13.6085 14.785C12.5718 15.5742 11.3038 16.001 10 16C7.399 16 5.1910 14.3415 4.3585 12.027L1.0975 14.5395C2.7525 17.778 6.1135 20 10 20Z" fill="#4CAF50" />
        <path d="M19.8055 8.0415H19V8H10V12H15.6515C15.2571 13.1082 14.5467 14.0766 13.608 14.785L13.6085 14.784L16.7045 17.404C16.4855 17.6025 20 15 20 10C20 9.3295 19.931 8.675 19.8055 8.0415Z" fill="#1976D2" />
    </svg>);
}

function ForgotPasswordText() {
    return (<p className="text-center text-gray-500 text-xs">
        <Link to="/forgot-password" className="text-blue-500 hover:text-blue-800">Forgot Password?</Link>
    </p>);
}

export default function Login() {
    const navigate = useNavigate();
    const { login } = useUser();
    const [error, setError] = useState('');

    useEffect(() => {
        document.title = "Adapted Strength"; // Set the title when the component mounts
        return () => {
            document.title = "Adapted Strength"; // Reset the title when the component unmounts
        };
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        console.log("Logging in");
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (!email || !password) {
            setError('Please enter both email and password');
            return;
        }

        try {
            // Use the UserContext login method which will handle token and user data
            const result = await login({ username: email, password });
            
            if (result.success) {
                console.log("Logged in successfully");
                navigate("/profile");
            } else {
                setError(result.error || 'Login failed');
            }
        } catch (error) {
            console.error("Error logging in", error);
            setError('Login failed. Please try again.');
        }
    };

    return (<div className="h-full my-0 content-center w-full top-[100px]">
        <div className="flex justify-center items-center h-full">
            <div className="relative bottom-20">
                <h1 className="relative mx-0 text-center text-2xl bottom-4">Welcome!</h1>
                <div className="flex w-full justify-center" >
                    <form onSubmit={onSubmit} id="login" className="p-0 w-full flex flex-col items-center bg-slate-50 shadow-md rounded-3xl px-0 pt-8 pb-8 mb-4 max-w-xs">
                        <div className="w-full flex flex-col items-center px-0 ">
                            <UserField />
                        </div>
                        <div className="w-full flex flex-col items-center px-0 ">
                            <PasswordField />
                        </div>
                        {error && (
                            <div className="mb-4 text-red-500 text-sm text-center">
                                {error}
                            </div>
                        )}
                        <div className="flex items-center justify-between">
                            <NextButton />
                        </div>
                        <div className="mt-4">
                            <ForgotPasswordText />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>);
}
