const userModel = require('../Models/userModel');
const bcrypt = require('bcryptjs');

// Get all users
exports.getAllUsers = async(req, res) => {
    try {
        const users = await userModel.find({});
        return res.status(200).send({
            userCount: users.length,
            success: true,
            message: 'All users data',
            users,
        });
    } catch (error) {
        console.log("❌ Get Users Error:", error);
        return res.status(500).send({
            success: false,
            message: 'Error in getting all users',
            error: error.message
        });
    }
};

// Register user
exports.registerController = async(req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validation
        if (!username || !email || !password) {
            return res.status(400).send({
                success: false,
                message: 'Please fill all fields'
            });
        }

        // Check if user exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(401).send({
                success: false,
                message: 'User already exists'
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user
        const user = new userModel({
            username,
            email,
            password: hashedPassword
        });
        await user.save();

        return res.status(201).send({
            success: true,
            message: 'New user created successfully',
            user
        });

    } catch (error) {
        console.log("❌ Register Error:", error);
        return res.status(500).send({
            success: false,
            message: 'Error in register callback',
            error: error.message
        });
    }
};

// Login user
exports.loginController = async(req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(401).send({
                success: false,
                message: 'Please provide email and password'
            });
        }

        // Find user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Email is not registered'
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: 'Invalid email or password'
            });
        }

        return res.status(200).send({
            success: true,
            message: 'Login successful',
            user
        });

    } catch (error) {
        console.log("❌ Login Error:", error);
        return res.status(500).send({
            success: false,
            message: 'Error in login callback',
            error: error.message
        });
    }
};