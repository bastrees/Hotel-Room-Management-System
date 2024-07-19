import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const { VITE_HOST } = import.meta.env;

    const handleLogout = async () => {
        try {
            const userId = localStorage.getItem('userId');
            await axios.post(`${VITE_HOST}/api/logout`, { userId });

            localStorage.removeItem('userId');
            localStorage.removeItem('userRole');
            localStorage.removeItem('firstName');
            localStorage.removeItem('lastName');

            navigate('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const userRole = localStorage.getItem('userRole');

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">pagTURUGAN</Link>
            </div>
            <div className="navbar-links">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/partners">Partners</Link> {/* Added Partners link */}
                {!userRole ? (
                    <>
                        <Link to="/login">Login</Link>
                    </>
                ) : (
                    <>
                        {userRole === 'admin' && <Link to="/admin">Admin Dashboard</Link>}
                        {userRole === 'manager' && <Link to="/manager">Manager Dashboard</Link>}
                        {userRole === 'customer' && (
                            <>
                                <Link to="/customer/room-search">Book Room</Link>
                                <Link to="/customer">Customer Dashboard</Link>
                            </>
                        )}
                        <button onClick={handleLogout}>Logout</button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
