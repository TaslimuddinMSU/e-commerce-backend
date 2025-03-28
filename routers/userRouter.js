const express = require('express');
const {signUp, signIn, updateProfile, addAddress, changePassword} = require('../controller/user')
const { authentication } = require("../middleware/authMiddleware")
const router = express.Router();


router.post('/sign-up', signUp);
router.post('/sign-in', signIn);
router.patch('/change-password', authentication, changePassword);
router.get('/update-profile', authentication, updateProfile);
router.post('/add-address', authentication, addAddress);



module.exports = router;