const setDbConnection = require('../setDbConnection')
const mongoose = require('mongoose')



async function setSchema(){
    await setDbConnection()

    const pageSchema = new mongoose.Schema({
        id: {type: String, required: true},
        title: {type: String, required: true},
        content: {type: String, required: false},
        thumb: {type: String, required: true},
        video: {type: String, required: false},
        date: {type: Date, required: true},
        author: {type: String, required: true}
    })

    mongoose.models = {}
    const page = mongoose.model('pages', pageSchema)

    return page
}



module.exports = setSchema