const PasswordSchema = require("../models/passwordSchema.model");

class AddPassword {

    // Create a username & password document
    static create(req, res) {

        // Get entered params in the body
        const email = (req.body.email)
        const ouDivision = (req.body.ouDivision)
        const title = (req.body.title)
        const website = (req.body.website)
        const username = (req.body.username)
        const password = (req.body.password)


        // Create and save a new username & password 
        const newUsernamePasswordDetail = new PasswordSchema({
            ouDivision: ouDivision,
            title: title,
            website: website,
            createdBy: email,
            username: username,
            password: password,
            archive: false
        })
        newUsernamePasswordDetail.save(function (err, data) {
            if (err) {
                res.status(500).send({
                    message: "Some error occurred while creating the new Password."
                });
            } else {
                res.send(data)
            }
        })
    }
}

module.exports = AddPassword;