const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'customer', 'manager'],
        default: 'customer'
    },
    firstName: {
        type: String,
        required: function() { return this.role !== 'admin'; }
    },
    lastName: {
        type: String,
        required: function() { return this.role !== 'admin'; }
    },
    address: {
        type: String,
        required: function() { return this.role !== 'admin'; }
    },
    contactNumber: {
        type: String,
        required: function() { return this.role !== 'admin'; }
    }
});

// Password hashing middleware
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        return next(error);
    }
});

// Password hashing middleware for update
userSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();
    if (update.password) {
        try {
            const salt = await bcrypt.genSalt(10);
            update.password = await bcrypt.hash(update.password, salt);
            this.setUpdate(update);
        } catch (error) {
            return next(error);
        }
    }
    next();
});

module.exports = mongoose.model('User', userSchema);
