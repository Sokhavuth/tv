const mongoose = require('mongoose')
require('dotenv').config()


async function setDbConnection() {
  if (mongoose.connections[0].readyState) {
    return
  }

  await mongoose.connect(process.env.DATABASE_URI, {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true
  })
  
}

module.exports = setDbConnection