const express = require('express')
const cors = require('cors')
const router = require('./routes/routes')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// mongoose.connect()
// .then(()=> console.log('mongodb is connected'))
// .catch(err => console.log(err))

app.use('/', router)

app.listen(process.env.Port || 3001, function () {
    console.log('App is runnig on 3001 port');
})