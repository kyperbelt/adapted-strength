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

    return (
        <div className="min-h-screen pt-16 flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8">
                <div>
                    <h1 className="text-center text-2xl font-bold text-gray-900 mb-8">Welcome!</h1>
                    <form onSubmit={onSubmit} className="bg-white shadow-md rounded-3xl px-8 pt-8 pb-8 space-y-6">
                        <UserField />
                        <PasswordField />
                        {error && (
                            <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-md">
                                {error}
                            </div>
                        )}
                        <div className="flex justify-center">
                            <NextButton />
                        </div>
                        <div className="text-center">
                            <ForgotPasswordText />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
