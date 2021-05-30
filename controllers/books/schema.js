const setDbConnection = require('../setDbConnection')
const mongoose = require('mongoose')



async function setSchema(){
    await setDbConnection()

    const bookSchema = new mongoose.Schema({
        id: {type: String, required: true},
        title: {type: String, required: true},
        content: {type: String, required: false},
        thumb: {type: String, required: true},
        video: {type: String, required: false},
        chapter: {type: String, required: false},
        date: {type: Date, required: true},
        author: {type: String, required: true},
    })

    mongoose.models = {}
    const book = mongoose.model('books', bookSchema)

    return book
}



module.exports = setSchema