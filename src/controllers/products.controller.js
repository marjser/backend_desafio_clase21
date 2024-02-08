const { Router } = require('express')
const Products = require('../models/product.model')
const HTTP_RESPONSES = require('../constants/http-responses.constant')

const router = Router()

// ENDPOINT DE LA VISTA PRODUCTS

router.get('/', async (req, res) => {

    let user = {}
    let role 

    if (req.session.user) {
        const { first_name, last_name, email, role } = req.session.user
        user.first_name = first_name
        user.last_name = last_name
        user.email = email
        user.role = role
    } else {
        user = false
    }

    if (user.role === 'admin') {role = 'admin'}
    
    const products = await Products.find({status: true})


	const productsDocs = []

    products.forEach(doc => {
        const { _id, title, description, code, price , stock, category } = doc
        const prodId = _id.toString()
        productsDocs.push({ prodId, title, description, code, price , stock, category  })
        
    });


    res.status(200).render('products', {productsDocs, user, role})
})

// ENDPOINT PARA LOGOUT

router.post('/', async (req, res) => {

    try {

        req.session.destroy()

        const url = `/login`

        res.json({status: 'Success', message: 'LogOut Succesfull', url })
    } catch (err) {
        console.error('Error logging out:', err);
    }
    
})

module.exports = router