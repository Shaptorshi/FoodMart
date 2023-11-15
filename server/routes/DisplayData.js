const express = require('express')
const router = express.Router()

router.post('/foodData', async(req, res) => {
    try {
        console.log(global.food_data)
        res.send([global.food_data, global.foodCategory])
    } catch (error) {
        console.error(error.message)
        res.send("Server Error")
    }
})

module.exports = router