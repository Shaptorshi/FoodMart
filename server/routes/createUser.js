const express = require('express')
const { body, validationResult } = require('express-validator')
const router = express.Router();
const db = require('../models/database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwtSecretKey = 'MyFullStackWebsiteFullResponsive'

router.get('/', async(req, res) => {
    try {
        const show = await db.find()
        res.send(show)
    } catch (error) {
        res.status(400).send(error)
    }
})
router.post('/createUsers', [
    body('email').isEmail(),
    body('userid').isLength({ min: 5 }),
    body('password').isLength({ min: 5 })
], async(req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() })
    }
    const inputPassword = req.body.password
    const salt = await bcrypt.genSalt(10)
    let securedPassword = await bcrypt.hash(inputPassword, salt)
    try {
        await db.create({
            userid: req.body.userid,
            password: securedPassword,
            email: req.body.email,
            location: req.body.location
        })
        res.json({ success: true })
    } catch (error) {
        console.log(error)
        res.json({ success: false })
    }
})

router.post('/loginUsers', [
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
], async(req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() })
    }
    const email = req.body.email
    try {
        const userData = await db.findOne({ email })
        if (!userData) {
            return res.status(400).send({ errors: "Try logging in with valid credentials" })
        }
        const passwordCompare = bcrypt.compare(req.body.password.toString(), userData.password.toString())
        if (!passwordCompare) {
            return res.status(400).send({ errors: "Try logging in with valid credentials" })
        }


        const data = {
            user: {
                id: userData.id
            }
        }
        const authToken = jwt.sign(data, jwtSecretKey)
        return res.json({ success: true, authToken: authToken })
    } catch (error) {
        console.log(error)
        res.json({ success: false })
    }
})

module.exports = router