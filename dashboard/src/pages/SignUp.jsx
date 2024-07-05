import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/SignUp.css';
import axios from 'axios';
const { VITE_HOST } = import.meta.env;

export default function SignUp() {
    const [values, setValues] = useState({
        username: '',
        password: '',
        role: 'customer' // default role
    });
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${VITE_HOST}/api/createuser`, values);

            if (res.data.success) {
                navigate('/login');
            } else {
                alert(res.data.message);
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
            <form onSubmit={handleSignUp} className="signup-form">
                <input
                    type="text"
                    name="username"
                    placeholder="Enter username"
                    value={values.username}
                    onChange={handleOnChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={values.password}
                    onChange={handleOnChange}
                />
                <select name="role" value={values.role} onChange={handleOnChange}>
                    <option value="customer">Customer</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}
