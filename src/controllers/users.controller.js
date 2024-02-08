const {Router} = require('express')
const Users = require('../models/user.model')
const adminUsers = require('../configs/admin-users')
const {createHash} = require('../utils/crypt-password.util')


const passport = require('passport')




const router = Router()

// ENDPOINT PARA CREAR USUARIO

const url = '/products'

router.post(
    '/', 
    passport.authenticate('register', {
        failureRedirect: '/users/fail-register', 
    }),
    async (req, res) => { 
    try {
        
        res
            .status(201)
            .json({status: 'Success', message: 'User has been register', url})

    } catch (error) {
        console.log(error)
        res.status(500).json({status: 'Error', message: 'Internal Server Error'})
    }

})

router.get('/fail-register', (req, res) => {
    console.log('Falló registro')
    res.status(400).json({ status: 'error', error: 'Bad request' })
})





module.exports = router