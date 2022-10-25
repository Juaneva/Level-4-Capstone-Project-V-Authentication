const mongoose = require("mongoose")

const passwordSchema = new mongoose.Schema({

    ouDivision: String,
    title: {
        type: String,
        required: true,
        uppercase: true
    },
    website: {
        type: String,
        required: true,
    },
    createdBy: String,
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },

    archive: Boolean

})

module.exports = mongoose.model("Passwords", passwordSchema)