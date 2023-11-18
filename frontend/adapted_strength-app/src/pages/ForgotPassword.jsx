import { useNavigate } from 'react-router-dom';
import PageContainer1 from '../components/PageContainer';

function EmailField({ pattern, name, autoComplete }) {
    return (<input type="email" name={name} autoComplete={autoComplete} placeholder="Email Address" className="w-4/5 border-b-4 p-0" pattern={pattern} />);
}

function SubmitButton({ onClick }) {
    return (<button type="submit" className="border-slate-50 border-8 bg-black text-slate-200 rounded-full px-3 py-1 " onClick={onClick} >Reset</button>);
}

function resetPassword(email) {
    console.log("Resetting password for email: " + email);
}


export default function ForgotPassword() {
    const nav = useNavigate();
    const emailRegex = "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}";
    let onSubmit = (e) => {
        e.preventDefault();
        let email = e.target.email.value;
        resetPassword(email);
        nav("/reset-link-sent");
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