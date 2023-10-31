import logo from '../assets/logo.png';

function EmailField() {
    return (<input type="email" placeholder="Email Address" className="w-4/5 border-b-4 p-0" />);
}

function SubmitButton() {
    return (<button type="submit" className="border-slate-50 border-8 bg-black text-slate-200 rounded-full px-3 py-1 "  >Reset</button>);
}

function ResetPassword(email) {
}

function AdaptedStrengthLogo() {
    return (<div className="flex flex-col items-center mt-12">
        <img src={logo} className="w-3/4" />
    </div>);
}

export default function ForgotPassword() {



    return (<div className="h-full my-0 content-center w-full top-[100px]">

        <div className="h-56 bg-header-background1">
            <AdaptedStrengthLogo />
        </div>
        <div className="bg-[#161A1D] h-full">
            <div className="relative bottom-20">
                <h1 className="relative mx-0 text-center text-2xl bottom-4">Forgot Password</h1>
                <div className="flex w-full justify-center" >
                    <form className="p-0 w-full flex flex-col items-center bg-slate-50 shadow-md rounded-3xl px-0 pt-8 pb-8 mb-4 max-w-xs">
                        <div className="w-full flex flex-col items-center px-0">
                            <EmailField />
                        </div>
                        <div className="flex justify-center w-full relative top-14">
                            <SubmitButton />
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </div>);
};