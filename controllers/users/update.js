const schema = require('./schema')
const bcrypt = require('bcryptjs')



async function updateUser(req){
    const userSchema = await schema()

    const user = await userSchema.findOne({userid: req.params.id})

    user.username = req.body.username

    if(user.password !== req.body.password){
      const hash = bcrypt.hashSync(req.body.password, 12)
      user.password = hash
    }
    
    user.email = req.body.email
    user.thumb = req.body.thumb
    user.info = req.body.info
    user.video = req.body.entries
    user.date = new Date(req.body.datetime)

    if(req.session.user.role === 'Admin'){
        user.role = req.body.role
    }
  
    return await user.save()
  }



module.exports = updateUser