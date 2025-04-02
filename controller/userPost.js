const { OfferNotification } = require('../modal/offerNotification');
const { Comments } = require('../modal/comment');


const userComment = async (req, res) => {
    const { name, comment, email, website } = req.body;

    try {
        if (!name || !comment || !email || !website) {
            return res.status(400).json({ message: 'Name, comment, and email are required.' });
        }

        const newComment = new Comments({
            name,
            comment,
            email,
            website: website || ""  
        });

        await newComment.save();

        return res.status(201).json({ message: 'Your comment has been saved. We will consider it on high priority.' });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error.", error: error.message });
    }
};

const offerNotification = async (req, res) => {
    const { name, email} = req.body;

    try {

        if (!name || !email) {
            return res.status(400).json({ message: 'Name or email are required.' });
        }

        const newOfferNotification = new OfferNotification({
            name,
            email
        });
        
        await newOfferNotification.save();
        return res.status(201).json({ message: 'Saved offer notification.' });
        
    } catch (error) {
        return res.status(500).json({ message: "Internal server error.", error: error.message });
    }

}

module.exports = { userComment, offerNotification }; 