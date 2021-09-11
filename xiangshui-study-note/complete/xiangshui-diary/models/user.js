var mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/users", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => { console.log("connect..."); })
var Schema = mongoose.Schema
var userSchema = new Schema({
    Email: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    psd: {
        type: String,
        required: true
    },
    psdconfirm: {
        type: String,
        required: true
    },
    create_time: {
        type: Date,
        default: Date.now
    },
    gender: {
        type: Number,
        enum: [0, 1],
        default: 0
    },
    diary: [{ date: String, article: String }],
    pay: [{ date: String, money: Number, remark: String }],
})

module.exports = mongoose.model("User", userSchema)