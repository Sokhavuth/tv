const mongoose = require('mongoose')


async function setDbConnection() {
    require('dotenv').config()
    const databaseAccess = process.env.DATABASE_URI
    process.env.TZ = "Asia/Phnom_Penh"

  if (mongoose.connections[0].readyState) {
    return
  }

  await mongoose.connect(databaseAccess, {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true
  })
  
}

module.exports = setDbConnection