const mongoose = require('mongoose')

const productCollection = 'product'


const productSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },
    
    code: {
        type: String,
        required: true
    },
    
    price: {
        type: Number,
        required: true
    },
    
    stock: {
        type: Number,
        required: true
    },
    
    category: {
        type: String,
        required: true
    },
    thumbnail: String,
    
    status: {
        type: Boolean,
        default: true
    }
})




const products = mongoose.model(productCollection, productSchema)



module.exports = products