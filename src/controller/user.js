const { showError, showSucess } = require('../config/helper')
const userModel = require('../model/user')
const Joi = require('joi')

const register = async (req, res) => {
    try {
        const requestBody = req.body;
        console.log('requestBody', req.files);


        const userSchemaValidation = Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().required(),
            dateOfBirth: Joi.date()
                .required()
                .custom((value, helpers) => {
                    const age = new Date().getFullYear() - new Date(value).getFullYear()
                    const minimumAge = 18
                    if (age < minimumAge) {
                        return helpers.message(`Date of birth must be at least ${minimumAge} years ago`)
                    }
                    return value
                }),
            street1Resident: Joi.string().required(),
            street2Resident: Joi.string().required(),
            adressSame: Joi.boolean().required(),
            street1Permanent: Joi.when('adressSame', {
                is: false,
                then: Joi.string().required(),
                otherwise: Joi.optional()
            }),
            street2Permanent: Joi.when('adressSame', {
                is: false,
                then: Joi.string().required(),
                otherwise: Joi.optional()
            }),
            typeOfFile1: Joi.string().valid('image', 'pdf').required(),
            typeOfFile2: Joi.string().valid('image', 'pdf').required()
        })

        const result = userSchemaValidation.validate(requestBody)
        if (result.error == null) {

            if (req.files?.file1) {
                if (requestBody.typeOfFile1 == 'image') {
                    if (/jpeg|jpg|png|gif/.test(req.files?.file1[0].mimetype.split('/')[1])) {
                        requestBody["file1"] = `static/${req.files?.file1[0]?.filename}`
                    } else {
                        return showError({ message: "Please Upload Valid Image According To Its Type" }, res)
                    }
                }
                else if (requestBody.typeOfFile1 == 'pdf') {

                    if (/pdf/.test(req.files?.file1[0].mimetype.split('/')[1])) {
                        requestBody["file1"] = `static/${req.files?.file1[0]?.filename}`
                    } else {
                        return showError({ message: "Please Upload Valid file According To Its Type" }, res)
                    }
                }

            } else {
                return showError({ message: "Please Upload Document It Is Required Field" }, res)
            }

            if (req.files?.file2) {
                if (requestBody.typeOfFile2 == 'image') {
                    if (/jpeg|jpg|png|gif/.test(req.files?.file2[0].mimetype.split('/')[1])) {
                        requestBody["file2"] = `static/${req.files?.file2[0]?.filename}`
                    } else {
                        return showError({ message: "Please Upload Valid Image According To Its Type" }, res)
                    }
                }
                else if (requestBody.typeOfFile2 == 'pdf') {

                    if (/pdf/.test(req.files?.file2[0].mimetype.split('/')[1])) {
                        requestBody["file2"] = `static/${req.files?.file2[0]?.filename}`
                    } else {
                        return showError({ message: "Please Upload Valid file According To Its Type" }, res)
                    }
                }

            } else {
                return showError({ message: "Please Upload Document It Is Required Field" }, res)
            }
            if (req.files?.file2) {
                requestBody["file2"] = `static/${req.files?.file2[0]?.filename}`
            }

            ////For dublicate email
            // const isDublicateEmail = await userModel.findOne({email : requestBody.email})
            // if(isDublicateEmail){
            //     return showError({ message: "e-mail Already Exist" }, res)

            // }

            const createUser = await userModel.create(requestBody)
            if (createUser) {
                return showSucess({ message: 'User Created Successfully', data: createUser }, res)
            } else {
                return showError({}, res)

            }
        } else {

            return showError({ message: result.error.details[0].message }, res)
        }

    } catch (err) {
        console.log('error', err);
    }
}

module.exports = { register }