const express = require('express')
const router = express.Router()
const Orders = require('../models/Order')
    // const { findOneAndUpdate } = require('../models/database')
router.post('/orderData', async(req, res) => {
    let data = req.body.order_data
    await data.splice(0, 0, { order_date: req.body.order_date })

    let eId = await Orders.findOne({ 'email': req.body.email })

    console.log(eId)
    if (eId === null) {
        try {
            await Orders.create({
                email: req.body.email,
                order_data: [data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.json({ error: error.message })
        }
    } else {
        try {
            await Orders.findOneAndUpdate({ email: req.body.email }, { $push: { order_data: data } }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
})

router.post('/myorderData', async(req, res) => {
    try {
        let myData = await Orders.findOne({ email: req.body.email })
        res.json({ order_data: myData })
    } catch (error) {
        res.send("Server error", error.message)
    }
})
module.exports = router