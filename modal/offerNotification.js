const mongoose = require('mongoose');

const offerNotification = new mongoose.Schema({
    name: {type: String, require: true},
    email: {type: String, require: true}
});

const OfferNotification = mongoose.model('Offers', offerNotification);

module.exports = { OfferNotification };