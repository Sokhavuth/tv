const setDbConnection = require('../setDbConnection')
const mongoose = require('mongoose')



async function setSchema(){
    await setDbConnection()

    const settingSchema = new mongoose.Schema({
        siteTitle: {type: String, required: true},
        dItemLimit: {type: Number, required: true},
        indexPostLimit: {type: Number, required: true},
        categoryPostLimit: {type: Number, required: true}
    })

    mongoose.models = {}
    const setting = mongoose.model('settings', settingSchema)

    return setting
}



module.exports = setSchema