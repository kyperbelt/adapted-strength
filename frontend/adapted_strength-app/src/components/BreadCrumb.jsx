import {Link} from 'react-router-dom';


export default function BreadCrumb({ first, breadCrumbs = [],...props }) {
    return (
        <nav className="justify-between px-4 py-3 text-gray-700 border border-gray-200 rounded-lg sm:flex sm:px-5 bg-gray-50 " aria-label="Breadcrumb">
            <ol className="inline-flex items-center mb-3 space-x-1 md:space-x-2 rtl:space-x-reverse sm:mb-0">
                <li>
                    <div className="flex items-center">
                        <Link to={first.to} className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 ">{first.name}</Link>
                    </div>
                </li>
                {breadCrumbs.map((crumb) => {
                    const { name, to } = crumb;
                    return (<li aria-current="page">
                        <div className="flex items-center">
                            <svg className="rtl:rotate-180 w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                            </svg>
                            <Link to={`${to}`} className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 ">{name}</Link>
                        </div>
                    </li>);
                })}
            </ol>
        </nav>
    );
}
