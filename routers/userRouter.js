const express = require('express');
const {signUp, signIn, updateProfile, changePassword} = require('../controller/user')
const router = express.Router();


router.post('/sign-up', signUp);
router.post('/sign-in', signIn);
router.patch('/change-password', changePassword);
router.patch('/update-profile', updateProfile);


module.exports = router;