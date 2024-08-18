const HttpError = require('../models/errorModel');
const User = require('../models/UserModels'); 
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const fs = require('fs'); 
const path = require('path'); 
const { v4: uuidv4 } = require('uuid');

const registerUser = async (req, res, next) => {
    try {
        const { name, email, password, confirmPassword } = req.body;  // Use 'confirmPassword'

        if (!name || !email || !password || !confirmPassword) {
            return next(new HttpError("Fill in all details", 422));
        }

        if (password !== confirmPassword) {
            return next(new HttpError("Passwords do not match", 422));
        }

        const newEmail = email.toLowerCase();

        const emailExists = await User.findOne({ email: newEmail });
        if (emailExists) {
            return next(new HttpError("Email already registered", 422));
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await User.create({
            name,
            email: newEmail,
            password: hashedPassword
        });

        res.status(201).json({ message: "User registered successfully", userId: newUser._id });
    } catch (error) {
        return next(new HttpError("User registration failed", 500));
    }
};


const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new HttpError("Please provide both email and password", 422));
        }

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return next(new HttpError("User not found", 404));
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return next(new HttpError("Invalid credentials", 401));
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },  // Payload
            process.env.JWT_SECRET,                  // Secret key from .env
            { expiresIn: '1h' }                      // Token expiration
        );

        res.status(200).json({
            message: "Login successful",
            userId: user._id,
            name: user.name,
            email: user.email,
            token: token
        });
    } catch (error) {
        return next(new HttpError("Login failed, please try again", 500));
    }
};

const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;  // Extract the user ID from the request params

        const user = await User.findById(id);
        if (!user) {
            return next(new HttpError("User not found", 404));
        }

        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            posts: user.posts
        });
    } catch (error) {
        return next(new HttpError("Fetching user failed", 500));
    }
};

const changeAvatar = async (req, res, next) => {
    try {
        if (!req.files || !req.files.avatar) {
            return next(new HttpError("No file uploaded", 400));
        }

        const avatar = req.files.avatar;


        if (avatar.size > 2 * 1024 * 1024) {
            return next(new HttpError("File size too big", 400));
        }

        const userId = req.user.userId;


        const user = await User.findById(userId);
        if (!user) {
            return next(new HttpError("User not found", 404));
        }

        if (user.avatar) {
            const oldAvatarPath = path.join(__dirname, '..', 'uploads', user.avatar);
            if (fs.existsSync(oldAvatarPath)) {
                fs.unlinkSync(oldAvatarPath);
            }
        }

        const filename = `${uuidv4()}-${avatar.name}`;
        const uploadPath = path.join(__dirname, '..', 'uploads', filename);

        avatar.mv(uploadPath, async (err) => {
            if (err) {
                return next(new HttpError("Failed to upload file", 500));
            }
            user.avatar = filename;
            await user.save();

            res.status(200).json({
                message: "Avatar updated successfully",
                avatarUrl: `/uploads/${filename}`
            });
        });
    } catch (error) {
        return next(new HttpError("Failed to change avatar", 500));
    }
};

const editUser = async (req, res, next) => {
    try {
        const { name, email, currentPassword, newPassword, newConfirmPassword } = req.body;

        // Check if all fields are provided
        if (!name || !email || !currentPassword || !newPassword || !newConfirmPassword) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Find the user by ID (assuming user ID is in req.user.id)
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Check if new email already exists
        if (email !== user.email) {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "Email already in use." });
            }
        }

        // Compare current password with the password in the database
        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) {
            return res.status(400).json({ message: "Current password is incorrect." });
        }

        // Compare new password and confirm password
        if (newPassword !== newConfirmPassword) {
            return res.status(400).json({ message: "New passwords do not match." });
        }

        // Update user details
        user.name = name;
        user.email = email;
        if (newPassword) {
            user.password = await user.hashPassword(newPassword);
        }

        await user.save();
        res.status(200).json({ message: "User details updated successfully." });

    } catch (error) {
        return next(new HttpError("Failed to update user details", 500));
    }
};

const getAuthors = async (req, res, next) => {
    try {
        const authors = await User.find({}, '-password'); // '-password' excludes the field

        res.status(200).json(authors);
    } catch (error) {
        return next(new HttpError("Failed to retrieve authors", 500));
    }
};


module.exports = {
    registerUser,
    loginUser,
    getUser,
    changeAvatar,
    editUser,
    getAuthors
};
