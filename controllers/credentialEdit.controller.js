const PasswordSchema = require("../models/passwordSchema.model");

class EditPassword {

    // Update information about a specific username & password by its id
    static update(req, res) {

        // Get entered params in the body
        const id = (req.body.id)
        const title = (req.body.title)
        const website = (req.body.website)
        const email = (req.body.email)
        const username = (req.body.username)
        const password = (req.body.password)

        PasswordSchema.findByIdAndUpdate(id, {
            $set: {
                title: title,
                website: website,
                createdBy: email,
                username: username,
                password: password,
            }
        }).then(result => {
                res.send(result);
            },
            (error) => {
                res.send(error.message);
            }
        )
    }
}

module.exports = EditPassword;