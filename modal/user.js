const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: { type: String, unique: true },
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true });


const userAddress = new mongoose.Schema({
    email: { type: String, ref: 'User', required: true, unique: true },
    address: [{ type: String }],
}, { timestamps: true });



const User = mongoose.model('User', userSchema);
const UserAddress = mongoose.model('UserAddress', userAddress);


module.exports = { User, UserAddress };

