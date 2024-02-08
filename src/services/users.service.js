const Users = require('../models/user.model')

const getUser = async (emailUser) => {
    try {

        const userDB = await Users.findOne({ email: emailUser })

        if (userDB) {
            const {first_name, last_name, age, email, role } = userDB
            const user = {
                first_name,
                last_name,
                age,
                email,
                role,
            }
            return user

        } else {
            return null
        }

    } catch (error) {
        throw error
    }

}

module.exports = {getUser}