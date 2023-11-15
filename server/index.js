const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin")
//     res.header(
//         "Origin, X-Requested-With, Content-Type, Accept"
//     )
//     next()
// })
app.use(cors(
    origin = "http://localhost:3000"
))
app.use(express.json())
app.use(bodyParser.json())
const createUsers = require('./routes/createUser')
const DisplayData = require('./routes/DisplayData')
const OrderData = require('./routes/Order_data')
const port = process.env.PORT || 5000

mongoose.connect('mongodb+srv://GoFood:tito5491@cluster0.eg2sk0l.mongodb.net/gofood?retryWrites=true&w=majority', async(err) => {
    if (err) console.log(err)
    else {
        console.log("Successfully connected");
        const fetched_data = await mongoose.connection.db.collection('food_data')
        fetched_data.find().toArray(function(err, data) {
            const foodCategory = mongoose.connection.db.collection('foodCategory')
            foodCategory.find().toArray(function(err, catData) {
                if (err) console.log(err)
                else {
                    global.food_data = data
                    global.foodCategory = catData
                    console.log(global.foodCategory)
                }
            })
        })
    }
})
app.use('/api', createUsers)
app.use('/api', DisplayData)
app.use('/api', OrderData)
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})