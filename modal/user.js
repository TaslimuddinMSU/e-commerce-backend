const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: { type: String, unique: true },
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true });


const userProfile = new mongoose.Schema({
    address: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Linking userProfile to User profile

}, { timestamps: true });



const User = mongoose.model('User', userSchema);
const UserProfile = mongoose.model('UserProfile', userProfile);


module.exports = { User, UserProfile };

