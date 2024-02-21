const express = require("express");
const { default: mongoose } = require("mongoose");
const { CONNECTION_STRING } = require('../config/config');

mongoose.connect(CONNECTION_STRING);

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String
})

const accountSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema)
module.exports = { User, Account }