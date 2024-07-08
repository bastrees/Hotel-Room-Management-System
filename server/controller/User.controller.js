const bcrypt = require('bcrypt');
const UserModel = require('../models/User.model');

const UserController = {
    CreateUser: async (req, res) => {
        try {
            const { username, password, role, firstName, lastName, address, contactNumber } = req.body;

            // Check if user already exists
            const existingUser = await UserModel.findOne({ username });
            if (existingUser) {
                return res.json({ success: false, message: 'Username already exists' });
            }

            // Create a new user instance
            const newUser = new UserModel({
                username,
                password,
                role,
                firstName,
                lastName,
                address,
                contactNumber
            });

            // Save the new user
            const savedUser = await newUser.save();
            res.json({ success: true, message: 'User created successfully!', user: savedUser });
        } catch (error) {
            res.json({ error: `CreateUser in user controller error ${error}` });
        }
    },
    LoginUser: async (req, res) => {
        try {
            const { username, password } = req.body;

            const user = await UserModel.findOne({ username });

            if (user) {
                const isMatch = await bcrypt.compare(password, user.password);

                if (isMatch) {
                    res.json({ success: true, message: 'User exists, login successfully', role: user.role });
                } else {
                    res.json({ success: false, message: 'Password is not correct' });
                }
            } else {
                res.json({ success: false, message: 'Username is incorrect' });
            }
        } catch (error) {
            res.json({ error: `LoginUser in user controller error ${error}` });
        }
    },
    EditUser: async (req, res) => {
        try {
            const { id } = req.params;
            const { password, ...updates } = req.body;

            if (password) {
                updates.password = password; // Password hashing will be handled by the pre 'findOneAndUpdate' hook
            }

            const user = await UserModel.findByIdAndUpdate(id, updates, { new: true });
            res.json({ success: true, message: 'User updated successfully!', user });
        } catch (error) {
            res.json({ error: `EditUser in user controller error ${error}` });
        }
    },
    DeleteUser: async (req, res) => {
        try {
            const { id } = req.params;
            await UserModel.findByIdAndDelete(id);
            res.json({ success: true, message: 'User deleted successfully!' });
        } catch (error) {
            res.json({ error: `DeleteUser in user controller error ${error}` });
        }
    },
    ListUsers: async (req, res) => {
        try {
            const users = await UserModel.find();
            res.json({ success: true, users });
        } catch (error) {
            res.json({ error: `ListUsers in user controller error ${error}` });
        }
    },

    ListManagers: async (req, res) => {
        try {
            const managers = await UserModel.find({ role: 'manager' });
            res.json({ success: true, users: managers });
        } catch (error) {
            res.json({ error: `ListManagers in user controller error ${error}` });
        }
    },

    ListCustomers: async (req, res) => {
        try {
            const customers = await UserModel.find({ role: 'customer' });
            res.json({ success: true, users: customers });
        } catch (error) {
            res.json({ error: `ListCustomers in user controller error ${error}` });
        }
    }
};

module.exports = UserController;
