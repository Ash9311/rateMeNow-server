const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { User, Account } = require("../models/model");
const { authMiddleWare } = require("../middlewares/middleware");

router.get("/balance", authMiddleWare, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });
 
})



module.exports = router;