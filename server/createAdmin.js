const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const connectDb = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/hrms', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to the database!');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

const createAdminUser = async () => {
    const username = 'admin';
    const plainPassword = 'your_admin_password'; // Change this to your desired admin password

    try {
        // Check if admin already exists
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            console.log('Admin user already exists.');
            process.exit(1);
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(plainPassword, salt);

        // Create admin user
        const adminUser = new UserModel({
            username,
            password: hashedPassword,
            role: 'admin',
            isActive: true
        });

        await adminUser.save();
        console.log('Admin user created successfully!');
    } catch (error) {
        console.error('Error creating admin user:', error.message);
    } finally {
        mongoose.connection.close();
    }
};

const UserModel = mongoose.model('User', new mongoose.Schema({
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
    },
    lastName: {
        type: String,
    },
    address: {
        type: String,
    },
    contactNumber: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: false
    }
}));

const run = async () => {
    await connectDb();
    await createAdminUser();
};

run();
