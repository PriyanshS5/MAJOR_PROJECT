const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
            type: String,   //schema m mongoose username apne aap add krdeta h
            required: true
    },
});

userSchema.plugin(passportLocalMongoose);  //sare kaam krdega username, password, hashing and salting of it

module.exports = mongoose.model("User", userSchema);
