const PasswordSchema = require("../models/passwordSchema.model");

class DeletePassword {

    // Delete information by its ID
    static delete(req, res) {

        // Get entered params in the body
        const id = (req.body.id)

        PasswordSchema.findByIdAndDelete(id)
            .then(result => {
                    res.send(result);
                },
                (error) => {
                    res.send(error.message);
                }
            )
    }
}

module.exports = DeletePassword;