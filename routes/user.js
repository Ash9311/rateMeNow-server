const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const zod = require("zod");
const { User, Account } = require("../models/model");
const { JWT_SECRET } = require('../config/config');
const { authMiddleWare } = require("../middlewares/middleware");


const signupSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
})

const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
})

router.put("/", authMiddleWare, async (req, res) => {
    const { success } = updateBody.parse(req.body);
    if (!success) {
        res.status(411).json({
            message: "Error while updating info"
        })
    }
    await User.updateOne(req.body, {
        _id: req.userId
    })

    res.json({
        message: "Updated successfully"
    })
})

router.get("/bulk", authMiddleWare, async (req, res) => {
    const filter = req.query.filter || "";
    const users = await User.find({
        $or: [
            {
                firstName: { "$regex": filter }
            },
            {
                lastName: { "$regex": filter }
            }
        ]
    })

    res.json({
        users: users.map(user => ({
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

router.post("/signup", async (req, res) => {
    try {
        signupSchema.parse(req.body);
    } catch (error) {
        return res.status(411).json({
            message: "Incorrect inputs"
        });
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Existing user"
        });
    }

    try {
        const user = await User.create({
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        });

        const userId = user._id;
        await Account.create({ userId, balance: 1 + Math.random() * 10000 })
        const token = jwt.sign({ userId }, JWT_SECRET);
        res.status(201).json({ message: "User created successfully", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post('/signin', async (req, res) => {
    try {
        signinSchema.parse(req.body);
    } catch (error) {
        return res.status(411).json({
            message: "Incorrect inputs"
        });
    }

    try {
        const user = await User.findOne({
            username: req.body.username,
            password: req.body.password
        });

        if (user) {
            const token = jwt.sign({ userId: user._id }, JWT_SECRET);
            res.json({ token });
            return;
        }

        res.status(411).json({
            message: "Error while logging in",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
