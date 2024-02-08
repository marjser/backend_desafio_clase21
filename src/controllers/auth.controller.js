const {Router} = require('express')
const Users = require('../models/user.model')
const adminUsers = require('../configs/admin-users')
const passport = require('passport')



const router = Router()



const url = `/products`

// ENDPOINT PARA EL LOGIN

router.post(
    '/login',
    passport.authenticate('login', { failureRedirect: '/auth/fail-login'}), //aca le indicamos que use la estrategia de passport que se llama 'login'
    async (req, res) => {
    try {
        
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            role: req.user.role,
        }

        res.json({status: 'Success', message: 'Login Succesfull', url})

    } catch (error) {
        console.log(error)
        res.status(500).json({status: 'Error', message: 'Internal Server Error'})
    }

})

router.get('/fail-login', (req, res) => {
    res.json({status:'error', message: 'Login Failed' })
})


// Endpoint que redirecciona a github para autenticar el usuario

router.get(
    '/github',
    passport.authenticate('github', { scope: ['user: email']}, (req, res) => {})
)


// Endpoint que nos retorna github con el usuario autenticado y sus datos

router.get(
    '/githubcallback',
    passport.authenticate('github', { failureRedirect: '/auth/fail-login' }),
    (req, res) => {
        req.session.user = req.user
        res.redirect('/products') // una vez que creamos el req.session lo redirigimos al endpoint '/'
    }
)




module.exports = router