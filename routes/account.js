const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { User, Account } = require("../models/model");
const { authMiddleWare } = require("../middlewares/middleware");

router.post('/submitRating', async (req, res) => {
    const { userId, ratings } = req.body;
    try {
        const account = await Account.findOne({ userId });

        if (!account) {
            return res.status(404).json({ message: 'Account not found' })
        }
        //update account rating

        const isAlreadyRatedByUser = account.rating.find(rating => rating.RatedBy?.toString() === ratings.RatedBy?.toString());

        //if isalreadyRatedByuser then replace the past rating with new one
        if (isAlreadyRatedByUser) {
            const index = account.rating.findIndex(rating => rating.RatedBy?.toString() === ratings.RatedBy?.toString());
            account.rating.splice(index, 1, ratings); //replace old rating by new rating of the same user
        }
        else {
            account.rating.push(ratings);
        }
        await account.save();
        return res.status(200).json({ message: 'Rating submitted successfully' })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
})

router.get("/userDetails", async (req, res) => {
    const { userId } = req.query;
    try {
        const account = await Account.findOne({ userId });
        if (!account) {
            return res.status(404).json({ message: 'Account not found' })
        }
        return res.status(200).json({ account })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
})


module.exports = router;