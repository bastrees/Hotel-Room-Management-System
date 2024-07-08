import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './css/Login.css';
import axios from 'axios';

export default function Login() {
    const [values, setValues] = useState({
        username: '',
        password: ''
    });
    const navigate = useNavigate();
    const { VITE_HOST } = import.meta.env;

    const handleLogin = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.post(`${VITE_HOST}/api/loginuser`, values);

            if (res?.data?.success) {
                localStorage.setItem('userRole', res.data.role);
                localStorage.setItem('userId', res.data.userId);
                localStorage.setItem('firstName', res.data.firstName);
                localStorage.setItem('lastName', res.data.lastName);

                if (res.data.role === 'admin') {
                    navigate('/admin');
                } else if (res.data.role === 'manager') {
                    navigate('/manager');
                } else if (res.data.role === 'customer') {
                    navigate('/customer');
                } else {
                    navigate('/login');
                }
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
        <div className="login">
            <form onSubmit={handleLogin} className="login-form">
                <input
                    onChange={handleOnChange}
                    type="text"
                    value={values?.username}
                    name="username"
                    placeholder="Enter username"
                />
                <input
                    onChange={handleOnChange}
                    type="password"
                    value={values?.password}
                    name="password"
                    placeholder="Enter password"
                />
                <button type="submit">Login</button>
                <p>
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
            </form>
        </div>
    );
}
