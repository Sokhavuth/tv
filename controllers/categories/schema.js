const setDbConnection = require('../setDbConnection')
const mongoose = require('mongoose')

module.exports = async () => {
    await setDbConnection()

    const categorySchema = new mongoose.Schema({
        id: {type: String, required: true},
        label: {type: String, required: true},
        thumb: {type: String, required: true},
        date: {type: Date, required: true}
    })

    mongoose.models = {}
    const categories = mongoose.model('categories', categorySchema)

    return categories
}