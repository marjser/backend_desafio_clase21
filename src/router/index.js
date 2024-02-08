const viewsTemplateController = require('../controllers/views-template.controller')
const authController = require('../controllers/auth.controller')
const usersController = require('../controllers/users.controller')
const productsController = require('../controllers/products.controller')

 

const router = app => {
    app.use('/', viewsTemplateController)
    app.use('/auth', authController)
    app.use('/users', usersController)
    app.use('/products', productsController)

}


 module.exports = router