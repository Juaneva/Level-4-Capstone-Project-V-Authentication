const UserSchema = require("../models/usersSchema.model");

class UserEdit {

    // Update information about a specific user by its ID
    static update(req, res) {

        // Get entered params in the body
        const id = (req.body.id)
        const email = (req.body.email)
        const nickname = (req.body.nickname)
        const password = (req.body.password)
        const ouDivision = (req.body.ouDivision)
        const role = (req.body.role)

        UserSchema.findByIdAndUpdate(id, {
            $set: {
                nickname: nickname,
                email: email,
                password: password,
                ouDivision: ouDivision,
                role: role
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

module.exports = UserEdit;