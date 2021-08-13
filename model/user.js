const mongoose = require("mongoose");
const schema = require("@service/validate");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
        maxLength: 100
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

userSchema.static.userValidation = function (body) {
    return schema.validate(body);
}

module.exports =  mongoose.model("user", userSchema);

