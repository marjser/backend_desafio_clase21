const express = require('express')
const handlebars = require('express-handlebars')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const router = require('./router')
const mongoConnect = require('./db')
const initializePassport = require('./configs/passport.config')
const passport = require('passport')

const { dbUser, dbPassword, dbHost, dbSession } = require('./configs/db.config')



const app = express()

app.engine('handlebars', handlebars.engine())
app.set('views', process.cwd() + '/src/views') 
app.set('view engine', 'handlebars') 


const port = 3000

app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))
app.use(express.static(process.cwd() + '/src/public')) 

app.use(
    session({
        secret: 'coderSecret',
        store: MongoStore.create({
            mongoUrl: `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbSession}?retryWrites=true&w=majority`,
			ttl: 60000
        }),
        resave: false,
        saveUninitialized: false,		
    })
)

initializePassport()



app.use(passport.initialize())
app.use(passport.session())

mongoConnect()

router(app)

app.listen(port, ()=> {
    console.log(`Server is running at port ${port}`)
})


/*


Consigna

	Ajustar nuestro servidor principal para trabajar con un sistema de login.


Aspectos a incluir

	Deberá contar con todas las vistas realizadas en el hands on lab, así también como las rutas de
 	router para procesar el registro y el login. 

	Una vez completado el login, realizar la redirección directamente a la vista de productos.


	Agregar a la vista de productos un mensaje de bienvenida con los datos del usuario

	Agregar un sistema de roles, de manera que si colocamos en el login como correo
 	adminCoder@coder.com, y la contraseña adminCod3r123, el usuario de la sesión además tenga un
 	campo 
	
	Todos los usuarios que no sean admin deberán contar con un rol “usuario”.
	Implementar botón de “logout” para destruir la sesión y redirigir a la vista de login


Formato

	Link al repositorio de Github sin node_modules


Sugerencias

	Recuerda que las vistas son importantes, más no el diseño, concéntrate en la funcionalidad de
 	las sesiones antes que en la presentación.
	
	Cuida las redirecciones a las múltiples vistas.
*/

