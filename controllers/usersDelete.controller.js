const UserSchema = require("../models/usersSchema.model");

class DeleteUser {

    // Delete a user by its ID
    static delete(req, res) {

        // Get entered params in the body
        const id = (req.body.id)

        UserSchema.findByIdAndDelete(id)
            .then(result => {
                    res.send(result);
                },
                (error) => {
                    res.send(error.message);
                }
            )
    }
}

module.exports = DeleteUser;