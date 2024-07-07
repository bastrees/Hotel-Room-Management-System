import React, { useState, useEffect } from 'react';

const UserForm = ({ user, onSave }) => {
    const [values, setValues] = useState({
        username: user?.username || '',
        password: '',
        role: user?.role || 'customer',
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        address: user?.address || '',
        contactNumber: user?.contactNumber || ''
    });

    useEffect(() => {
        if (user) {
            setValues({
                username: user.username || '',
                password: '',
                role: user.role || 'customer',
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                address: user.address || '',
                contactNumber: user.contactNumber || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(values);
    };

    return (
        <div className="admin-form">
            <h2>{user ? 'Edit User' : 'Add User'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    placeholder="Username"
                />
                <input
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    placeholder="Password"
                />
                {values.role !== 'admin' && (
                    <>
                        <input
                            type="text"
                            name="firstName"
                            value={values.firstName}
                            onChange={handleChange}
                            placeholder="First Name"
                        />
                        <input
                            type="text"
                            name="lastName"
                            value={values.lastName}
                            onChange={handleChange}
                            placeholder="Last Name"
                        />
                        <input
                            type="text"
                            name="address"
                            value={values.address}
                            onChange={handleChange}
                            placeholder="Address"
                        />
                        <input
                            type="text"
                            name="contactNumber"
                            value={values.contactNumber}
                            onChange={handleChange}
                            placeholder="Contact Number"
                        />
                    </>
                )}
                <select name="role" value={values.role} onChange={handleChange}>
                    <option value="customer">Customer</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default UserForm;
