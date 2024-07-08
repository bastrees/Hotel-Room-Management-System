import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
        localStorage.removeItem('firstName');
        localStorage.removeItem('lastName');
        navigate('/login');
    };

    const userRole = localStorage.getItem('userRole');

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">HRMS</Link>
            </div>
            <div className="navbar-links">
                {!userRole ? (
                    <>
                        <Link to="/login">Login</Link>
                    </>
                ) : (
                    <>
                        {userRole === 'admin' && <Link to="/admin">Admin Dashboard</Link>}
                        {userRole === 'manager' && <Link to="/manager">Manager Dashboard</Link>}
                        {userRole === 'customer' && <Link to="/customer">Customer Dashboard</Link>}
                        <button onClick={handleLogout}>Logout</button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
