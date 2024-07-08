import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css'; // Import the CSS file

const AdminDashboard = () => {
    const [managers, setManagers] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [pendingUsers, setPendingUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    const handleApprove = async (id, role) => {
        try {
            await axios.put(`http://localhost:3001/api/users/approve/${id}`, { role });
            fetchPendingUsers();
            fetchUsers(); // Refresh user lists
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
            <h1>Admin Dashboard</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
                    <div className="user-list-header">
                        <h2>User List</h2>
                    </div>
                    <div className="user-list-section">
                        <h2>Managers</h2>
                        <UserList users={managers} />
                    </div>
                    <div className="user-list-section">
                        <h2>Customers</h2>
                        <UserList users={customers} />
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
                </>
            )}
        </div>
    );
};

const UserList = ({ users }) => {
    return (
        <div className="user-list">
            {users.length === 0 ? (
                <p>No users found</p>
            ) : (
                <ul>
                    {users.map((user) => (
                        <li key={user._id}>
                            {user.username} ({user.role})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AdminDashboard;
