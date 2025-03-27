const { User, UserProfile } = require('../modal/user');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const signUp = async (req, res) => {
    const { userId, userName, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Email already exist." });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = uuidv4();

        user = new User({
            userId,
            userName,
            email,
            password: hashedPassword
        });

        await user.save();

        const token = await jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: "1h" })
        return res.status(201).json({ message: "User created.", userId, token: token });

    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }

}

const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials", email: "User email not found. Please create an account." });
        }

        const isPassMatch = await bcrypt.compare(password, user.password);
        if (!isPassMatch) {
            return res.status(400).json({ message: "Invalid Credentials", error: "Email or passwords are incorrect" })
        }

        const token = await jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: "1h" })
        return res.json({ userId: user.userId, message: "Login successful", token });

    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}

const updateProfile = async (req, res) => {

}

const changePassword = async (req, res) => {

    const { email, password, confirmPassword } = req.body;
    // const byEmail = req.params.email;

    try {
        let user = await User.findOne({ email });

        if (!user){
            return res.status(400).json({ message: "Invalid Credential", error: "email is invalid" })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match." });
        }

        // Hash the new password before updating it
        const hashedPassword = await bcrypt.hash(password, 10);

        const updatePasswords = await User.findOneAndUpdate(
           { email},
            {$set: {password: hashedPassword}},
            { new: true }
        )

        console.log(updatePasswords);
        const token = await jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: "1h" })
        return res.status(200).json({  message: "Password has been updated successfully", token })
        
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
        
    }

}


module.exports = { signUp, signIn, updateProfile, changePassword }