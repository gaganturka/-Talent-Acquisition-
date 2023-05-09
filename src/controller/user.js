const { showError, showSucess } = require('../config/helper')
const userModel = require('../model/user')
const Joi = require('joi')

const register = async (req, res) => {
    try {
        const requestBody = req.body;
      


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
            const files1 = [];

            if (req.files?.file1) {
              for (let i = 0; i < req.files.file1.length; i++) {
                const file = req.files.file1[i];
                if (requestBody.typeOfFile1 == 'image') {
                  if (/jpeg|jpg|png|gif/.test(file.mimetype.split('/')[1])) {
                    files1.push({
                      name: file.originalname,
                      type: 'image',
                      path: `static/${file.filename}`,
                      
                    });
                  } else {
                    return showError({ message: "Please Upload Valid Image According To Its Type" }, res);
                  }
                } else if (requestBody.typeOfFile1 == 'pdf') {
                  if (/pdf/.test(file.mimetype.split('/')[1])) {
                    files1.push({
                      name: file.originalname,
                      type: 'pdf',
                      path: `static/${file.filename}`,
            
                    });
                  } else {
                    return showError({ message: "Please Upload Valid file According To Its Type" }, res);
                  }
                }
              }
            } else {
              return showError({ message: "Please Upload Document It Is Required Field" }, res);
            }

            const files2 = [];

            if (req.files?.file2) {
              for (let i = 0; i < req.files.file2.length; i++) {
                const file = req.files.file2[i];
                if (requestBody.typeOfFile2 == 'image') {
                  if (/jpeg|jpg|png|gif/.test(file.mimetype.split('/')[1])) {
                    files2.push({
                      name: file.originalname,
                      type: 'image',
                      path: `static/${file.filename}`,
                      
                    });
                  } else {
                    return showError({ message: "Please Upload Valid Image According To Its Type" }, res);
                  }
                } else if (requestBody.typeOfFile2 == 'pdf') {
                  if (/pdf/.test(file.mimetype.split('/')[1])) {
                    files2.push({
                      name: file.originalname,
                      type: 'pdf',
                      path: `static/${file.filename}`,
            
                    });
                  } else {
                    return showError({ message: "Please Upload Valid file According To Its Type" }, res);
                  }
                }
              }
            } else {
              return showError({ message: "Please Upload Document It Is Required Field" }, res);
            }


            requestBody['media1'] = files1
            requestBody['media2'] = files2

            console.log('requestBody', requestBody);

          

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