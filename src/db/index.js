const mongoose = require('mongoose')
const { dbPassword, dbHost, dbName, dbUser } = require('../configs/db.config')


const uri = `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`

const mongoConnect = async () =>{
    try {
        await mongoose.connect(uri)
        console.log('DB is connnected')
    } catch (error) {
        console.log(error)
    }
    
}

module.exports = mongoConnect

