// imports mongoose and extracts Schema into it's own variable
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// creates a new mongoose schema with two properties
const UserSchema = new Schema({
    firstName: { type: String, required: true }, // firstName property is a string and required
    lastName: { type: String, required: true },
    social: {
        facebook: { type: String, required: false },
        twitter: { type: String, required: false },
        linkedIn: { type: String, required: false } 
    },
    email: { type: String, required: true },
    socialSecurity: { type: Number, required: false },
    blogs: [{ type: Schema.Types.ObjectId, ref: 'Blog' }] // property added to create relationship with Blog model
})

module.exports = mongoose.model('User', UserSchema) 