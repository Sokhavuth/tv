const setDbConnection = require('../setDbConnection')
const mongoose = require('mongoose')



async function setSchema(){
    await setDbConnection()

    const postSchema = new mongoose.Schema({
        id: {type: String, required: true},
        title: {type: String, required: true},
        content: {type: String, required: false},
        category: {type: String, required: false},
        date: {type: Date, required: true},
        author: {type: String, required: true},
    })

    mongoose.models = {}
    const post = mongoose.model('posts', postSchema)

    return post

}



module.exports = setSchema