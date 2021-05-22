const mongoose = require('mongoose')


async function setDbConnection() {
  if (mongoose.connections[0].readyState) {
    return
  }

  require('dotenv').config()

  await mongoose.connect(process.env.DATABASE_URI, {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true
  })
  
}

module.exports = setDbConnection