function EmailField() {
    return (<input type="email" placeholder="Email" />);
}

function SubmitButton() {
    return (<button type="submit">Submit</button>);
}

export default function ForgotPassword() {
    return (<div className="content-center w-full max-w-xs">
        <h1 className="mx-0 text-center">Forgot Password</h1>
        <div className="w-full max-w-xs">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div>
                    <EmailField />
                </div>
                <div>
                    <SubmitButton />
                </div>
            </form>
        </div>
    </div>);
};