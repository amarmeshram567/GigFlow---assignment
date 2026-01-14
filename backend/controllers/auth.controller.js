const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const User = require("../models/User");



// const cookieOptions = {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: 'none'
// }


const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const emailExist = await User.findOne({ email });
        if (emailExist) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await User.create({
            name, email, password: hashedPassword
        });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // cookie expiration time
        })

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                email: user.email,
                name: user.name,
                role: user.role
            },
            token
        })

    } catch (error) {
        console.log("Error in register controller: ", error),
            res.status(500).json({
                success: false,
                message: "Server error"
            })
    }
}


const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide email and password"
            })
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: {
                email: user.email,
                name: user.name,
                role: user.role
            },
            token
        })

    } catch (error) {
        console.log("Error in login controller: ", error),
            res.status(500).json({
                success: false,
                message: "Server error"
            })
    }
}


const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
        })

        res.json({
            success: true,
            message: "Logout successfully"
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            success: false,
            message: error.message || "Server error"
        })
    }
}


module.exports = {
    register,
    login,
    logout
}