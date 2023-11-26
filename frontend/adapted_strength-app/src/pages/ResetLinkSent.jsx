import PageContainer1 from "../components/PageContainer"

export default function ResetLinkSent() {
    return (
        <PageContainer1>
            <div className="relative bottom-20">
                <h1 className="relative mx-0 text-center text-2xl bottom-4">Reset Link Sent</h1>
                <div className="flex w-full justify-center" >
                    <form className="p-0 w-full flex flex-col items-center bg-slate-50 shadow-md rounded-3xl px-0 pt-8 pb-8 mb-4 max-w-xs">
                        <div className="w-full flex flex-col items-center px-0">
                            <p className="text-center">Please check your email for a link to reset your password.</p>
                        </div>
                    </form>
                </div>
            </div>
        </PageContainer1>
    );
}