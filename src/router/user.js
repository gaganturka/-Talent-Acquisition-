const express = require('express')
const router = express.Router()
const userController = require('../controller/user')
const {upload} = require('../config/upload')

router.post('/',  upload ,  userController.register)


module.exports = router