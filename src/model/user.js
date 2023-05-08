const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    dateOfBirth: {
        type: Date
    },
    street1Resident: {
        type: String
    },
    adressSame: {
        type: Boolean
    },
    street2Resident: {
        type: String
    },
    street1Permanent: {
        type: String
    },
    street2Permanent: {
        type: String
    },
    file1: {
        type: String
    },
    typeOfFile1: {
        type: String
    },
    file2: {
        type: String
    },
    typeOfFile2: {
        type: String
    }


}, { timestamps: true })

module.exports = mongoose.model('userSchema', userSchema)