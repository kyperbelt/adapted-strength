import { useNavigate } from 'react-router-dom';
import PageContainer1 from '../components/PageContainer';
import EmailField from '../components/forms/EmailField';
import SubmitButton from '../components/forms/SubmitButton';
import {AuthApi} from '../api/AuthApi';
import {HttpStatus} from '../api/ApiUtils';


export default function ForgotPassword() {
    const nav = useNavigate();
    const emailRegex = "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}";
    const onSubmit = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        console.log(`Resetting password for email: ${email}`);
        AuthApi.forgotPassword(email)
            .then((response) => {
                if (response.status === HttpStatus.FOUND) {
                    console.log("Password reset email sent");
                    nav('/reset-link-sent', {});
                }else{
                    console.error("Error sending password reset email");
                }
            }).catch((error) => {
                console.error(error);
            });
    };

    return (
        <PageContainer1>
            <div className="relative bottom-20">
                <h1 className="relative mx-0 text-center text-2xl bottom-4">Forgot Password</h1>
                <div className="flex w-full justify-center" >
                    <form onSubmit={onSubmit} className="p-0 w-full flex flex-col items-center bg-slate-50 shadow-md rounded-3xl px-0 pt-8 pb-8 mb-4 max-w-xs">
                        <div className="w-full flex flex-col items-center px-0">
                            <EmailField name="email" autoComplete="email" pattern={emailRegex} />
                        </div>
                        <div className="flex justify-center w-full relative top-14">
                            <SubmitButton onClick={console.log("clicked")} />
                        </div>
                    </form>
                </div>

            </div>
        </PageContainer1>
    );
};
