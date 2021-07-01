const setDbConnection = require('../setDbConnection')
const mongoose = require('mongoose')

module.exports = async () => {
    await setDbConnection()

    const categorySchema = new mongoose.Schema({
        id: {type: String, required: true},
        title: {type: String, required: true},
        thumb: {type: String, required: true},
        date: {type: Date, required: true}
    })

    categorySchema.index({ title: 'text' })

    mongoose.models = {}
    const categories = mongoose.model('categories', categorySchema)

    return categories
}