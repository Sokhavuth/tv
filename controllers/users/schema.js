const setDbConnection = require('../setDbConnection')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

module.exports = async () => {
  await setDbConnection()

  const usersSchema = new mongoose.Schema({
    username: {type: String, required: true},
    userid: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    role: {type: String, required: true},
    info: {type: String, required: false},
    date: {type: Date, required: true}
  })

  mongoose.models = {}
  const users = mongoose.model('users', usersSchema)

  await users.findOne(function (err, user){
    if (err) return console.error(err)
    if(!user){
      const hash = bcrypt.hashSync('password', 12)
      const id = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2)
      const root = new users({userid:id, username:'root', password:hash, email:'root@tv.com', role:'Admin', info:'test', date: new Date()})
      root.save(function (err, root){
        if (err) return console.error(err)
      })
    }
  })

  return users
  
}