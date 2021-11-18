const express = require("express");
const router = express.Router();
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const { UniqueConstraintError } = require("sequelize/lib/errors");

const jwt = require("jsonwebtoken");


router.post('/register', async (req, res) => {
    //let { username, password } = req.body.user;
    const { username, password } = req.body.user;
    console.log(req.body)
    try {
        const newUser = await User.create({
            username,
            password: bcrypt.hashSync(password, 12),

        });

        let token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
        console.log(token)
        res.status(200).json({
            message: "user created!",
            user: newUser,
            sessionToken: token
        });
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "email not available"
            })
        } else {
            console.log(err)
            res.status(500).json({
                // message: " Failed to create user",
                message: `Error Message: ${err}`,
            })
        }
    }


});

router.post("/login", async (req, res) => {
    let { username, password } = req.body.user;

    try {
        console.log(username, password)
        const loginUser = await User.findOne({
            where: {
                username: username,
                // password: password
            },
        });

        if (loginUser) {

            let passwordComparison = await bcrypt.compare(password, loginUser.password)

            if (passwordComparison) {

                let token = jwt.sign({ id: loginUser.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
                res.status(200).json({
                    user: loginUser,
                    message: "user login success!",
                    sessionToken: token
                });
            } else {
                res.status(401).json({
                    message: "Incorrect username or password"
                });
            }
        } else {
            res.status(401).json({
                message: "Incorrect username or password"
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "Failure",
        });
    }
});




module.exports = router