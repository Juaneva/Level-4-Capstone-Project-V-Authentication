const UserSchema = require("../models/usersSchema.model");
const jwt = require('jsonwebtoken');

class RegisterNewUser {

    // Create a new user with the entered parameters
    static create(req, res) {

        // Get entered params in the body
        const email = (req.body.email)
        const nickname = (req.body.nickname)
        const password = (req.body.password)
        const ouDivision = (req.body.ouDivision)

        // Additional check point - only "@cooltech.com" emails are allowed to register

        const substring = "@cooltech.com";

        if (email.includes(substring)) {

            UserSchema.where("email").equals(email)
                .then(result => {
                    // If the user is not already on the database, add the user
                    if (result.length === 0) {

                        // Create and save a new user - when registering the user automatically have "normal" role rights
                        const newRegisteredUser = new UserSchema({
                            email: email,
                            nickname: nickname,
                            password: password,
                            role: "normal",
                            ouDivision: ouDivision,
                            archive: false
                        })

                        newRegisteredUser.save(function (err, data) {
                            if (err) {
                                res.status(500).send({
                                    message: "Some error occurred while creating the new User."
                                });
                            } else {
                                let payload = {
                                    nickname: nickname,
                                    email: email,
                                    role: "normal",
                                    ouDivision: [ouDivision]
                                }
                                const token = jwt.sign(JSON.stringify(payload), 'jwt-cooltech-secret', {
                                    algorithm: 'HS256'
                                })
                                res.send({
                                    'token': token
                                })

                            }
                        })

                    } // Else send token failed because the email already exists 
                    else {
                        res.send({
                            'token': "already registered"
                        })
                    }
                }),
                (error) => {
                    res.send(error.message);
                }
        } else {
            res.send({
                'token': "failed"
            })
        }
    }
}

module.exports = RegisterNewUser;