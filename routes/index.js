const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')
// @desc  Login/Landing page
// @route GET /
router.get('/',  ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login',
    })
})

// @desc  Dashboard
// @route GET /dashboard
router.get('/dashboard',  ensureAuth, async (req,res) => {
    try {
        res.render('dashboards', {
            name: req.user.firstName,
        }) 
    } catch (err) {
        console.error(err)
    }
})

module.exports = router