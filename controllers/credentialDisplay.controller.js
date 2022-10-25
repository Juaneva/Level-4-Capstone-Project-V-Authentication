const PasswordSchema = require("../models/passwordSchema.model");

class DisplayPasswords {

    // Display results according to the entered Operating Unit - Division
    // Sort result by website name
    static display(req, res) {

        // Get entered params in the body
        const ouDivisionParam = (req.params.data);

        PasswordSchema.where("ouDivision").equals(ouDivisionParam).sort('website').then(result => {
                res.send({
                    result
                })
            }),
            (error) => {
                res.send(error.message);
            }
    }
}

module.exports = DisplayPasswords;