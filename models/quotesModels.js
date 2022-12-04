const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types
const Schema = mongoose.Schema
const User = require("../models/userModels")



const quotesSchema = mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"

    },
    name: {
        type: String,
        required: true,
    },

    title: {
        type: String,
        required: true,
    },
    like: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]

}, {
    timestamps: true,
});



const Qoutes = mongoose.model("Qoutes", quotesSchema);
module.exports = Qoutes;