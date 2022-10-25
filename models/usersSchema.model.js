const mongoose = require("mongoose")

const usersSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    ouDivision: [String],
    role: {
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

module.exports = mongoose.model("User", usersSchema)