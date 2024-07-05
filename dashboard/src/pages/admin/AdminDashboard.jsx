import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css'; // Import the CSS file

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
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
            const res = await axios.get('http://localhost:3001/api/users'); // Ensure the correct URL
            console.log('Full API response:', res.data); // Log the full response
            if (res.data.success && Array.isArray(res.data.users)) {
                setUsers(res.data.users);
            } else {
                setError('Failed to fetch users: Invalid response structure');
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
            await axios.delete(`http://localhost:3001/api/users/${id}`); // Ensure the correct URL
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
                await axios.put(`http://localhost:3001/api/users/${editingUser._id}`, user); // Ensure the correct URL
            } else {
                await axios.post('http://localhost:3001/api/createuser', user); // Ensure the correct URL
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
                    <UserList users={users} onDelete={handleDelete} onEdit={handleEdit} />
                    {showForm && <UserForm user={editingUser} onSave={handleSave} />}
                </>
            )}
        </div>
    );
};

const UserList = ({ users, onDelete, onEdit }) => {
    console.log('Rendering UserList with users:', users); // Debug: Log users passed to UserList
    return (
        <div className="user-list">
            {users && users.length === 0 ? (
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
        password: '',
        role: user?.role || 'customer',
    });

    useEffect(() => {
        if (user) {
            setValues({
                username: user.username,
                password: '',
                role: user.role,
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

export default AdminDashboard;
