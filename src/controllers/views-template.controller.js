
const {Router} = require('express')
const Users = require('../models/user.model')
const { publicAccess, privateAccess } = require('../middlewares')
const adminUsers = require('../configs/admin-users')
const { getUser } = require('../services/users.service')

const router = Router()

// ENDPOINT PARA LOGIN

router.get('/login', publicAccess, (req, res) => {
    res.render('login.handlebars')    
})

// ENDPOINT PARA CREAR CUENTA

router.get('/signup', publicAccess, (req, res) => {
    res.render('signup.handlebars')    
})

// ENDPOINT PARA ENTRAR EL PERFIL. 

// Solo se puede ingresar si hay un session iniciada.

router.get('/profile', privateAccess, async (req, res) => {
    const { email } = req.session.user

    res.redirect(`/profile/${email}`)
})



// ENPOINT PARA ENTRAR AL PERFIL

router.get('/profile/:emailUser', privateAccess, async (req, res) => {
    try {

        const { emailUser } = req.params

        const user = await getUser(emailUser)

        const emailSession = req.session.user.email

        if (emailSession !== emailUser ) {
            res.status(400).json({status: 'Error', message: 'Bad request'})
        }

        if (emailUser === adminUsers.email) {
            const user = adminUsers
            return res.render('profile.handlebars', {user})    

        }
    
        res.render('profile.handlebars', {user})    
    } catch (error) {
        res.status(500).json({status: 'error', message: 'Internal Server Error'})
    }
})


module.exports = router