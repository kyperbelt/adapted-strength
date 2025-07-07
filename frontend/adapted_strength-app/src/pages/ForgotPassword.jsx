import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AuthApi } from '../api/AuthApi';
import { HttpStatus } from '../api/ApiUtils';
import { PrimaryButton } from '../components/Button';

function EmailField() {
    return (<div className="mb-6 w-full px-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
               id="email" type="email" placeholder="Enter your email address" name="email" 
               pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}" 
               autoComplete="email" required />
    </div>);
}

function ResetButton() {
    return (<PrimaryButton type="submit" className="border-primary border-8 rounded-full px-3 py-1">
        Send Reset Link
    </PrimaryButton>);
}

function BackToLoginText() {
    return (<p className="text-center text-gray-500 text-xs">
        Remember your password? <Link to="/login" className="text-blue-500 hover:text-blue-800">Back to Login</Link>
    </p>);
}

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        document.title = "Forgot Password - Adapted Strength";
        return () => {
            document.title = "Adapted Strength";
        };
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const email = e.target.email.value;
        
        if (!email) {
            setError('Please enter your email address');
            setIsLoading(false);
            return;
        }

        console.log(`Resetting password for email: ${email}`);
        AuthApi.forgotPassword(email)
            .then((response) => {
                if (response.status === HttpStatus.FOUND) {
                    console.log("Password reset email sent");
                    navigate('/reset-link-sent', {});
                } else {
                    console.error("Error sending password reset email");
                    setError("Unable to send reset email. Please try again.");
                }
            }).catch((error) => {
                console.error(error);
                setError("An error occurred. Please try again.");
            }).finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <div className="min-h-screen pt-16 flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8">
                <div>
                    <h1 className="text-center text-2xl font-bold text-gray-900 mb-8">Reset Password</h1>
                    <div className="text-center text-gray-600 mb-6">
                        <p>Enter your email address and we'll send you a link to reset your password.</p>
                    </div>
                    <form onSubmit={onSubmit} className="bg-white shadow-md rounded-3xl px-8 pt-8 pb-8 space-y-6">
                        <EmailField />
                        {error && (
                            <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-md">
                                {error}
                            </div>
                        )}
                        <div className="flex justify-center">
                            <ResetButton disabled={isLoading} />
                        </div>
                        <div className="text-center">
                            <BackToLoginText />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
