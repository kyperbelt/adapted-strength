import React from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-custom-dark text-white p-6 w-full">
            <div className="max-w-screen-lg mx-auto flex flex-col items-center justify-between h-full md:flex-row">
                <div className="mb-8 md:mb-0 md:mr-12">
                    <img src={logo} alt="Adapted Strength Logo" className="h-12 mb-4 md:mb-0" />
                </div>

                <div className="flex flex-col md:flex-row justify-around items-start md:items-center w-full">
                    <div className="mb-8 md:mb-0">
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/about" className="text-sm hover:text-custom-red transition-colors">About Us</Link>
                            </li>
                            <li><a href="/contact" className="text-sm hover:text-custom-red transition-colors">Contact Us</a></li>
                            <li><a href="/terms" className="text-sm hover:text-custom-red transition-colors">Terms of Service</a></li>
                            <li><a href="/privacy" className="text-sm hover:text-custom-red transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                        <p className="text-sm mb-2">Address: 186 Bella Vista Rd. Ste D. Vacaville, CA</p>
                        <p className="text-sm mb-2">Email: Contact@adaptedstrength.com</p>
                        <p className="text-sm">Phone: (707) 685-9471</p>
                    </div>
                </div>
            </div>
            <p className="text-sm text-center mt-8 border-t border-gray-600 pt-4 w-full">© 2023 Adapted Strength. All rights reserved.</p>
        </footer>
    );
};

export default Footer;

