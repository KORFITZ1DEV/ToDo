// src/Components/Navbar.tsx

import React, { useState } from 'react';
import { useAuth } from '../Context/useAuth';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
    const { isLoggedIn, logout, user } = useAuth(); // Get authentication methods from the context
    const userNameAcro = user?.userName.substring(0, 2).toUpperCase();
    const navigate = useNavigate();

    return (
        <div className="p-6 navbar bg-gradient-to-b from-black to-red-950">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><a onClick={() => navigate('/todo')}>Your todos</a></li>
                        <li><a>Calendar</a></li>
                        <li><a>About</a></li>
                    </ul>
                </div>
            </div>
            <div className="navbar-center">
                <a className="text-3xl btn btn-ghost">ToDo Champ</a>
            </div>
            <div className="navbar-end">
                {/* Swap button for Login/Logout based on authentication state */}
                <label className="px-6 swap">
                    <button onClick={isLoggedIn() ? logout : () => {/* Redirect to login page */ }}>
                        {isLoggedIn() ? "Logout" : "Login"}
                    </button>
                </label>
                <div>{user ? (
                    <div className="avatar placeholder">
                        <div className="w-12 rounded-full bg-neutral text-neutral-content">
                            <span className="text-xl">{user ? (
                                <p>{userNameAcro}</p> // Display the user's username
                            ) : ""}</span>
                        </div>
                    </div>
                ) : ""}</div>
            </div>
        </div>
    );
};

export default Navbar;
