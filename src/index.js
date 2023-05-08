const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const path = require("path");
const dirname = path.resolve();
const bodyParser = require('body-parser')
const {user} = require('./router/index')
const multer = require('multer')

// app.use(express())
app.use(bodyParser.urlencoded({extended : false}))
app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use(cors())

app.use('/static', express.static(path.join(dirname, './public')))

app.use('/', user)
mongoose.connect("mongodb+srv://group13:UEEqzwKeluhyT2uM@cluster0.hkvjs.mongodb.net/xicomAssignment?retryWrites=true&w=majority")
.then(() => {console.log('DataBase is connected')})
.catch((error) => {console.log('"error', error)})


app.listen(3000 || process.env.port, () => {
    console.log('App is runnig on 3000 port');
})
