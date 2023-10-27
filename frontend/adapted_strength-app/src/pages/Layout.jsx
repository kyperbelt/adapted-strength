import { Outlet, Link } from "react-router-dom";

export default function Layout() {
    return (
        <div>
            <header>
                <nav>
                    {/* We want to use Link instead of anchor tags when we link internally */}
                    <Link to="/">Home</Link>
                    <span> | </span>
                    <Link to="forgot-password">Forgot Password</Link>
                </nav>
            </header>
            <Outlet />
        </div>
    );
}
