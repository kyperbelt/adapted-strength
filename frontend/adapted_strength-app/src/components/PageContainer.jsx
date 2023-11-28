import logo from '../assets/logo.png';

function AdaptedStrengthLogo() {
    return (<div className="flex flex-col items-center mt-12">
        <img src={logo} className="w-3/4" />
    </div>);
}

export default function PageContainer1({ children }) {
    return (
        <div className="h-full my-0 content-center w-full top-[100px]">
            <div className="h-56 bg-header-background1">
                <AdaptedStrengthLogo />
            </div>
            <div className="bg-[#161A1D] h-full">
                {children}
            </div>
        </div>);
}