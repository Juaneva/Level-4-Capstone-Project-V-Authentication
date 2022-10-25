const UserSchema = require("../models/usersSchema.model");
const jwt = require('jsonwebtoken');

// When the user logs in, send a login token if correct username & Password is used
class LoginUser {

    static login(req, res) {

        // Get entered params in the body
        const emailParam = (req.body.email)
        const password = (req.body.password)

        // Additional check point - only "@cooltech.com" emails are allowed to login
        const substring = "@cooltech.com";

        if (emailParam.includes(substring)) {

            UserSchema.where("email").equals(emailParam).then(result => {
                    // If result true and password is correct
                    if ((result.length > 0) && (result[0].password === password)) {
                        //Create payload and token & send
                        let payload = {
                            nickname: result[0].nickname,
                            email: result[0].email,
                            role: result[0].role,
                            ouDivision: result[0].ouDivision
                        }
                        const token = jwt.sign(JSON.stringify(payload), 'jwt-cooltech-secret', {
                            algorithm: 'HS256'
                        })
                        res.send({
                            'token': token
                        })
                    } // Else send that the login failed
                    else {
                        res.status(403).send({
                            'token': "failed"
                        })
                    }
                }),
                (error) => {
                    res.send(error.message);
                }
        } // Send login failed if email is not a company email
        else {
            res.send({
                'token': "failed"
            })
        }
    }
}

module.exports = LoginUser;