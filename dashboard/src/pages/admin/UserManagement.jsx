import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css'; // Reuse the same CSS file

const UserManagement = () => {
    const [managers, setManagers] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [pendingUsers, setPendingUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchUsers();
        fetchPendingUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const [managersRes, customersRes] = await Promise.all([
                axios.get('http://localhost:3001/api/users/managers'),
                axios.get('http://localhost:3001/api/users/customers')
            ]);

            if (managersRes.data.success && customersRes.data.success) {
                setManagers(managersRes.data.users);
                setCustomers(customersRes.data.users);
            } else {
                setError('Failed to fetch users');
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching users:', error);
            setError(`Error fetching users: ${error.message}`);
            setLoading(false);
        }
    };

    const fetchPendingUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get('http://localhost:3001/api/users/pending');
            if (res.data.success) {
                setPendingUsers(res.data.users);
            } else {
                setError('Failed to fetch pending users');
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching pending users:', error);
            setError(`Error fetching pending users: ${error.message}`);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/api/users/${id}`);
            fetchUsers();
            fetchPendingUsers();
        } catch (error) {
            console.error('Error deleting user', error);
        }
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setShowForm(true);
    };

    const handleSave = async (user) => {
        try {
            await axios.put(`http://localhost:3001/api/users/${user._id}`, user);
            fetchUsers();
            fetchPendingUsers();
            setEditingUser(null);
            setShowForm(false);
        } catch (error) {
            console.error('Error saving user', error);
        }
    };

    const handleApprove = async (id, role) => {
        try {
            await axios.put(`http://localhost:3001/api/users/approve/${id}`, { role });
            fetchPendingUsers();
            fetchUsers();
        } catch (error) {
            console.error('Error approving user', error);
        }
    };

    const handleReject = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/api/users/${id}`);
            fetchPendingUsers();
        } catch (error) {
            console.error('Error rejecting user', error);
        }
    };

    return (
        <div className="admin-dashboard">
            <h1>User Management</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
                    <div className="user-list-section">
                        <h2>Managers</h2>
                        <UserList users={managers} onDelete={handleDelete} onEdit={handleEdit} />
                    </div>
                    <div className="user-list-section">
                        <h2>Customers</h2>
                        <UserList users={customers} onDelete={handleDelete} onEdit={handleEdit} />
                    </div>
                    <div className="user-list-section">
                        <h2>Pending Users</h2>
                        <ul>
                            {pendingUsers.map((user) => (
                                <li key={user._id}>
                                    {user.username} ({user.firstName} {user.lastName})
                                    <button onClick={() => handleApprove(user._id, 'customer')}>Approve as Customer</button>
                                    <button onClick={() => handleApprove(user._id, 'manager')}>Approve as Manager</button>
                                    <button onClick={() => handleReject(user._id)}>Reject</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {showForm && <UserForm user={editingUser} onSave={handleSave} />}
                </>
            )}
        </div>
    );
};

const UserList = ({ users, onDelete, onEdit }) => {
    return (
        <div className="user-list">
            {users.length === 0 ? (
                <p>No users found</p>
            ) : (
                <ul>
                    {users.map((user) => (
                        <li key={user._id}>
                            {user.username} ({user.role})
                            <div>
                                <button onClick={() => onEdit(user)}>Edit</button>
                                <button onClick={() => onDelete(user._id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const UserForm = ({ user, onSave }) => {
    const [values, setValues] = useState({
        username: user?.username || '',
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        address: user?.address || '',
        contactNumber: user?.contactNumber || '',
        role: user?.role || 'customer',
        isActive: user?.isActive || false
    });

    useEffect(() => {
        if (user) {
            setValues({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                contactNumber: user.contactNumber,
                role: user.role,
                isActive: user.isActive
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setValues((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...user, ...values });
    };

    return (
        <div className="admin-form">
            <h2>Edit User</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    placeholder="Username"
                    readOnly
                />
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
                <select name="role" value={values.role} onChange={handleChange}>
                    <option value="customer">Customer</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                </select>
                <label>
                    <input
                        type="checkbox"
                        name="isActive"
                        checked={values.isActive}
                        onChange={handleChange}
                    />
                    Active
                </label>
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default UserManagement;
