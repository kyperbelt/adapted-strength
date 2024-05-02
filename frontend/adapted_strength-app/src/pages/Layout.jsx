/*
Module: Layout.jsx
Team: TeraBITE
*/
import { Outlet, Link } from "react-router-dom";
import NavBar from "../components/navBar";
import { useLocation } from "react-router-dom";
import StateGuard from "../util/StateGuard";
import { AuthApi } from "../api/AuthApi";
import Footer from "../components/footer";

function ChatButton({ ...props }) {
  const messageNotification = props.messageNotification;
  return (
    <div className="fixed bottom-10 right-10">
      <Link
        to="chat"
        className="border-4 border-black bg-blue-400 rounded-lg p-2 hover:bg-blue-300"
      >
        Chat
      </Link>
      {messageNotification && (
        <span className="relative flex h-4 w-4 bottom-10 left-11">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
        </span>
      )}
    </div>
  );
}

export default function Layout() {
  const location = useLocation();
  return (
    <div id="layout" className="grow flex flex-col">
      <NavBar currentPage="" />
      <Outlet className="" />
      <StateGuard state={() =>!AuthApi.hasRole("ROLE_ADMIN")}>
        <ChatButton messageNotification={false} />
      </StateGuard>
      <Footer />
    </div>
  );
}
// <footer className="bg-primary text-secondary p-4">
//     <p>Footer</p>
// </footer>
