const express = require('express');
const { userComment, offerNotification } = require('../controller/userPost');
const route = express.Router();

route.post('/comments', userComment);
route.post('/offer-notification', offerNotification);

module.exports = route
