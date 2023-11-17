import { Outlet, Link } from "react-router-dom";

export default function Profile() {
    return (
        <div className="w-full h-full flex flex-col my-0">
            <p className="bg-[#161A1D] text-white">
                PROFILE PAGE
            </p>
            <Outlet className="" />
        </div>
    );
}
