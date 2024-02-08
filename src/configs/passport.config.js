
const passport = require('passport')
const local = require('passport-local')

const GithubStrategy = require('passport-github2')
const Users = require('../models/user.model')
const {createHash, useValidPassword} = require('../utils/crypt-password.util')
const { ghClientId, ghClientSecret } = require('./passport-github.config')





const LocalStrategy = local.Strategy

const initializePassport = () => {
    passport.use(
        'register',
        new LocalStrategy(
            {passReqToCallback: true, usernameField: 'email'},
            async (req, username, password, done) => {
                try {
                    const { first_name, last_name, age, email } = req.body
                    
                    const user = await Users.findOne({ email: username })
                    if (user) {
                        console.log('User exists')
                        return done(null, false)
                    }

                    const newUserInfo = { 
                        first_name,
                        last_name,
                        email,
                        age,
                        password: createHash(password),
                    }

                    const newUser = await Users.create(newUserInfo)

                    return done(null, newUser)

                } catch (error) {
                    return done(error)
                }
            }
        )
    )
    passport.serializeUser((user, done) => {
        console.log('Se ha serializado al usuario '+user.email)
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = Users.findById(id)
        done(null, user)
    })
}

passport.use(
    'login', 
    new LocalStrategy(
            { usernameField: 'email' },
            async (username, password, done) => {
                try {
                    
                    
                    const user = await Users.findOne({ email: username })
                    


                    if (!user) {
                        console.log('User not found')
                        return done(null, false)
                    }
    
                    if (!useValidPassword(user, password)) {
                        console.log('Password does not match')
                        return done(null, false)
                    }

                    return done(null, user)
                } catch (error) {
                    done(error)
                }                            
            }
    )
)


passport.use(
    'github',
    new GithubStrategy(
        {
            clientID: ghClientId,
            clientSecret: ghClientSecret,
            callback: 'http://localhost:3000/auth/githubcallback',
        },
        async (accessToken, RefreshToken, profile, done) => {
            try {

                const { id, login, name, email } = profile._json

                console.log(id, login, name, email)

                const user = await Users.findOne({ email: email })

                if (!user) {
                    const newUserInfo = {
                        first_name: name,
                        email,
                        githubId: id,
                        githubUsername: login,
                    }

                    const newUser = await Users.create(newUserInfo)

                    return done(null, newUser)
                }

            return done(null, user)
            } catch (error) {
                done(error)
            }
        }
    )
)


module.exports = initializePassport
