const UserSchema = require("../models/usersSchema.model");

class DisplayUsers {

    // Display all the users and Sort them by email address
    static display(req, res) {

        UserSchema.find().sort('email')
            .then(result => {
                res.send({
                    result
                })
            }),
            (error) => {
                res.send(error.message);
            }
    }
}

module.exports = DisplayUsers;