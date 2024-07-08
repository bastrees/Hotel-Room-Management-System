const bcrypt = require('bcrypt');
const UserModel = require('../models/User.model');

const UserController = {
    CreateUser: async (req, res) => {
        try {
            const { username, password, firstName, lastName, address, contactNumber } = req.body;

            // Check if user already exists
            const existingUser = await UserModel.findOne({ username });
            if (existingUser) {
                return res.json({ success: false, message: 'Username already exists' });
            }

            // Set default role to 'customer'
            const role = 'customer';

            // Create a new user instance
            const newUser = new UserModel({
                username,
                password,
                role,
                firstName,
                lastName,
                address,
                contactNumber,
                isActive: false // New users are inactive by default
            });

            // Save the new user
            const savedUser = await newUser.save();
            res.json({ success: true, message: 'User created successfully! Pending admin approval.', user: savedUser });
        } catch (error) {
            res.json({ error: `CreateUser in user controller error ${error}` });
        }
    },

    LoginUser: async (req, res) => {
        try {
            const { username, password } = req.body;

            const user = await UserModel.findOne({ username });

            console.log('Retrieved user:', user); // Log the user object

            if (user) {
                const isPasswordCorrect = await bcrypt.compare(password, user.password);
                console.log('isPasswordCorrect:', isPasswordCorrect); // Log password comparison result
                console.log('user.isActive:', user.isActive); // Log isActive field

                if (isPasswordCorrect) {
                    if (user.isActive) {
                        res.json({ success: true, message: 'User exists, login successfully', role: user.role });
                    } else {
                        res.json({ success: false, message: 'Account is not active. Please contact the administrator.' });
                    }
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

    ListUsers: async (req, res) => {
        try {
            const users = await UserModel.find();
            res.json({ success: true, users });
        } catch (error) {
            res.json({ error: `ListUsers in user controller error ${error}` });
        }
    },

    EditUser: async (req, res) => {
        try {
            const { id } = req.params;
            const { password, ...updates } = req.body;

            if (password) {
                updates.password = await bcrypt.hash(password, 10);
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

    ListManagers: async (req, res) => {
        try {
            const users = await UserModel.find({ role: 'manager' });
            res.json({ success: true, users });
        } catch (error) {
            res.json({ error: `ListManagers in user controller error ${error}` });
        }
    },

    ListCustomers: async (req, res) => {
        try {
            const users = await UserModel.find({ role: 'customer' });
            res.json({ success: true, users });
        } catch (error) {
            res.json({ error: `ListCustomers in user controller error ${error}` });
        }
    },

    ListPendingUsers: async (req, res) => {
        try {
            const users = await UserModel.find({ isActive: false });
            res.json({ success: true, users });
        } catch (error) {
            res.json({ error: `ListPendingUsers in user controller error ${error}` });
        }
    },

    ApproveUser: async (req, res) => {
        try {
            const { id } = req.params;
            const { role } = req.body;

            const user = await UserModel.findByIdAndUpdate(id, { isActive: true, role }, { new: true });
            res.json({ success: true, message: 'User approved successfully!', user });
        } catch (error) {
            res.json({ error: `ApproveUser in user controller error ${error}` });
        }
    },
};

module.exports = UserController;
