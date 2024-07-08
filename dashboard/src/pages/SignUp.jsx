import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './css/SignUp.css';

const API_URL = import.meta.env.VITE_HOST;

export default function Signup() {
    const [values, setValues] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        address: '',
        contactNumber: ''
    });
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.post(`${API_URL}/api/createuser`, values);

            if (res?.data?.success) {
                alert('Signup successful! Your account is pending approval.');
                navigate('/login');
            } else {
                alert(res?.data?.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setValues((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="signup">
            <form onSubmit={handleSignup} className="signup-form">
                <input
                    onChange={handleOnChange}
                    type="text"
                    value={values.username}
                    name="username"
                    placeholder="Enter username"
                />
                <input
                    onChange={handleOnChange}
                    type="password"
                    value={values.password}
                    name="password"
                    placeholder="Enter password"
                />
                <input
                    onChange={handleOnChange}
                    type="text"
                    value={values.firstName}
                    name="firstName"
                    placeholder="Enter first name"
                />
                <input
                    onChange={handleOnChange}
                    type="text"
                    value={values.lastName}
                    name="lastName"
                    placeholder="Enter last name"
                />
                <input
                    onChange={handleOnChange}
                    type="text"
                    value={values.address}
                    name="address"
                    placeholder="Enter address"
                />
                <input
                    onChange={handleOnChange}
                    type="text"
                    value={values.contactNumber}
                    name="contactNumber"
                    placeholder="Enter contact number"
                />
                <button type="submit">Sign Up</button>
                <p>
                    Already have an account? <Link to="/login">Log In</Link>
                </p>
            </form>
        </div>
    );
}
