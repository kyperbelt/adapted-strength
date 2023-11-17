import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import google from '../assets/google_icon.webp';

function UserField() {
    return (<input type="username" placeholder="Username" id="email" name="email" required className="w-4/5 border-b-4 p-0" />);
}

function PasswordField() {
    return (<input type="password" placeholder="Password" id="password" name="password" className="w-4/5 border-b-4 p-0" />);
}
function NextButton() {
    return (<button href="./profile" type="submit" className="border-slate-50 border-8 bg-black text-slate-200 rounded-full px-3 py-1 "  >
            <Link className="App-Nav_link"
                to="../profile">
                GO
            </Link>
          </button>);
}

function LoggingIn(email) {

}

function AdaptedStrengthLogo() {
    return (<div className="flex flex-col items-center mt-12">
        <img src={logo} className="w-3/4" />
    </div>);
}

function GoogleLogo() {
    return (<p className="rounded-full">
        <img src={google} className="w-5" />
    </p>);
}

export default function Login() {
    return (<div className="h-full my-0 content-center w-full top-[100px]">

        <div className="h-56 bg-header-background1">
            <AdaptedStrengthLogo />
        </div>
        <div className="bg-[#161A1D] h-full">
            <div className="relative bottom-20">
                <h1 className="relative mx-0 text-center text-2xl bottom-4">Welcome!</h1>
                <div className="flex w-full justify-center" >
                    <form id="login" className="p-0 w-full flex flex-col items-center bg-slate-50 shadow-md rounded-3xl px-0 pt-8 pb-8 mb-4 max-w-xs">
                        <div className="w-full flex flex-col items-center px-0 ">
                            <UserField />
                        </div>
                        <div className="w-full flex flex-col items-center px-0 pt-4">
                            <PasswordField />
                        </div>
                        <div className="flex justify-center w-full relative top-24">
                            <NextButton />
                        </div>
                        <div>
                            <input
                                className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                                type="checkbox"
                                role="switch"
                                id="flexSwitchCheckDefault" />
                            <label
                                className="inline-block pl-[0.15em] hover:cursor-pointer"
                                htmlFor="flexSwitchCheckDefault"
                            >Remember me</label>
                            <p
                                href="./forgot-password"
                                className="text-red-500 text-color-white transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                            >Forgot Password</p>
                        </div>
                    </form>
                </div>
            </div>
            <button
                type="button"
                className="inline-block rounded bg-red-500 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
                <a href="../profile">Login with Google</a>
            </button>
            <p className="relative mx-0 text-white top-4 px-8 text-center bottom-4">
                Dont have an account?
                <a
                    href="./sign-up"
                    className="text-red-500 text-color-white transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                > Sign up here</a>  
            </p>

        </div>
    </div>)
};