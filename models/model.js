const express = require("express");
const { default: mongoose } = require("mongoose");


mongoose.connect(process.env.CONNECTION_STRING);

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
    rating: [{
        Kindness: { type: Number, required: false, min: 1, max: 5 },
        trustWorthy: { type: Number, required: false, min: 1, max: 5 },
        ProblemSolvingSkills: { type: Number, required: false, min: 1, max: 5 },
        Professionalism: { type: Number, required: false, min: 1, max: 5 },
        Adaptability: { type: Number, required: false, min: 1, max: 5 },
        Teamwork: { type: Number, required: false, min: 1, max: 5 },
        CommunicationSkills: { type: Number, required: false, min: 1, max: 5 },
        SenseOfHumor: { type: Number, required: false, min: 1, max: 5 },
        overallRating: { type: Number, required: false, min: 1, max: 5 }

    }
    ]
})

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema)
module.exports = { User, Account }