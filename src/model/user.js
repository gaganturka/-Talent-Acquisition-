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
    media1: [
        {
          name: {
            type: String,
          },
          type: {
            type: String,
            enum: ['image', 'pdf'], // specify valid types
          },
          path: {
            type: String,
          }
        }
      ],
      media2: [
        {
          name: {
            type: String,
          },
          type: {
            type: String,
            enum: ['image', 'pdf'], // specify valid types
          },
          path: {
            type: String,
          }
        }
      ],
    
    typeOfFile1: {
        type: String,
        enum: ['image', 'pdf']
    },
    typeOfFile2: {
        type: String,
        enum: ['image', 'pdf']
    }
    // files: [{
    //     name: { type: String, required: true },
    //     type: { type: String, required: true },
    //     path: { type: String, required: true },
    //     url: { type: String, required: true }
    //   }]

}, { timestamps: true })

module.exports = mongoose.model('userSchema', userSchema)