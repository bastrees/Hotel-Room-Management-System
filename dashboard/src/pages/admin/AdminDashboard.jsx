import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css'; // Import the CSS file
import UserForm from './UserForm'; // Import the UserForm component

const AdminDashboard = () => {
    const [managers, setManagers] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchUsers();
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

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/api/users/${id}`);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user', error);
        }
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setShowForm(true);
    };

    const handleAddUser = () => {
        setEditingUser(null);
        setShowForm(true);
    };

    const handleSave = async (user) => {
        try {
            if (editingUser && editingUser._id) {
                await axios.put(`http://localhost:3001/api/users/${editingUser._id}`, user);
            } else {
                await axios.post('http://localhost:3001/api/createuser', user);
            }
            fetchUsers();
            setEditingUser(null);
            setShowForm(false);
        } catch (error) {
            console.error('Error saving user', error);
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
                        <button className="add-user-button" onClick={handleAddUser}>Add User</button>
                    </div>
                    <div className="user-list-section">
                        <h2>Managers</h2>
                        <UserList users={managers} onDelete={handleDelete} onEdit={handleEdit} />
                    </div>
                    <div className="user-list-section">
                        <h2>Customers</h2>
                        <UserList users={customers} onDelete={handleDelete} onEdit={handleEdit} />
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

export default AdminDashboard;
