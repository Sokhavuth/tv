const mongoose = require('mongoose')
//import cheerio from 'cheerio'
var session = require('express-session')
const MongoStore = require('connect-mongo')

async function getFetch(uri) {
  try {
    let response = await fetch(uri)
    return await response.json()
  } catch(err) {
    console.log(err);
  }
}

async function postFetch(uri, data) {
  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {"Content-type": "application/json; charset=UTF-8"}
  }

  try {
    let response = await fetch(uri, options)
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

async function setDbConnection(app) {
    require('dotenv').config()
    const databaseAccess = process.env.DATABASE_URI
    process.env.TZ = "Asia/Phnom_Penh"
    //mongoose.connect(databaseAccess, {useNewUrlParser: true, useUnifiedTopology: true})

  if (mongoose.connections[0].readyState) {
    return
  }

  await mongoose.connect(databaseAccess, {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true
  })

  app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: databaseAccess })
  }))
}

function getThumbUrl(contents, type=false){
  const noPost = "/images/no-image.png"
  const noUser = "/images/userthumb.png"
  const playIcon = "/images/play.png"

  let $ = null

  var thumbUrls = []
  var thumbObjUrl = {}

  for(var v in contents){
    $ = cheerio.load(contents[v].info)
    
    if($('img').length > 0){
      if (type === "thumbObjUrl"){
        thumbObjUrl[contents[v].name] = $("img").first().attr("src")
      } else {
        thumbUrls.push($("img").first().attr("src"))
      }
    }else{
      if(type == 'author'){
        thumbUrls.push(noUser)
      } else {
        if (type === "thumbObjUrl"){
          thumbObjUrl[contents[v].name] = noPost
        } else {
          thumbUrls.push(noPost)
        }
      }
    }
  }

  if(type === "thumbObjUrl"){
    return (thumbObjUrl)
  } else {
    return (thumbUrls)
  }
  
}

module.exports = setDbConnection