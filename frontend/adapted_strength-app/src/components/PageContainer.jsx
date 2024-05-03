import logo from '../assets/logo.png';

function AdaptedStrengthLogo() {
    return (
        <div className="flex flex-col items-center mt-3">
            <img src={logo} alt="Adapted Strength Logo" className="w-3/4 md:w-96" />
        </div>);
}

export default function PageContainer1({ children }) {
    return (
        <div className="grow content-center flex flex-col w-full overflow-x-hidden">
            <div className="h-44 md:h-56 bg-header-background1 flex-none">
                <AdaptedStrengthLogo />
            </div>
            <div className="bg-secondary flex grow flex-row content-center justify-center">
                <div className="flex-1 flex flex-col max-w-screen-xl">
                    {children}
                </div>
            </div>
        </div>);
}

/**
 * Page container 1 but with no background color added
*/
export function BlankPageContainer1({ children }) {
    return (
        <div className="relative grow content-center flex flex-col w-full">
            <div className="h-44 relative -top-5 md:h-56 bg-header-background1 flex-none pt-5">
                <AdaptedStrengthLogo />
            </div>
            <div className="flex grow flex-row content-center justify-center">
                <div className="flex-1 flex flex-col max-w-screen-xl">
                    {children}
                </div>
            </div>
        </div>);
}

export function PageContainer2({className,...props }) {
    return (
        <div className="mt-48 grow content-center flex flex-col w-full">
            <div className="bg-secondary flex grow flex-row content-center justify-center">
                <div className={`${className} flex-1 flex flex-col max-w-screen-xl`}>
                    {props.children}
                </div>
            </div>
        </div>);
}

export function BlankPageContainer({ children, ...props }) {
    return (
        <div className="grow content-center flex flex-col w-full" {...props}>
            <div className="flex grow flex-row content-center justify-center">
                <div className="flex-1 flex flex-col max-w-screen-xl">
                    {children}
                </div>
            </div>
        </div>);
}

