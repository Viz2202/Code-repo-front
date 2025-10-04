import React from 'react';
import "./Navbar.css";
const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-black w-full fixed top-0 left-0 z-50">
      <div className="nav-brand">
        <a 
          href="/" 
          className="text-xl font-bold text-white no-underline hover:underline"
        >
          Your App
        </a>
      </div>
      <ul className="flex list-none m-0 p-0 space-x-8">
        <li>
          <a 
            href="/" 
            className="text-white no-underline font-normal py-2 hover:underline"
          >
            Home
          </a>
        </li>
        <li>
          <a 
            href="/about" 
            className="text-white no-underline font-normal py-2 hover:underline"
          >
            About
          </a>
        </li>
        <li>
          <a 
            href="/services" 
            className="text-white no-underline font-normal py-2 hover:underline"
          >
            Services
          </a>
        </li>
        <li>
          <a 
            href="/contact" 
            className="text-white no-underline font-normal py-2 hover:underline"
          >
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;