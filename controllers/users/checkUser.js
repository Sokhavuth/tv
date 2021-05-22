const schema = require('./schema')
const bcrypt = require('bcryptjs')

async function checkUser(req){
    const users = await schema()
    const result = {}
    
    try{
        var user = await users.findOne({email:req.body.email})
    }catch (err){
        console.log(err)
    }
      
    if(user){
      if(bcrypt.compareSync(req.body.password, user.password)){
        result.success = true
        req.session.user = user
        result.message = ''
        return result
      }else{
        result.message = 'ពាក្យ​សំងាត់​មិន​ត្រឹមត្រូវ​ទេ'
        result.success = false;
        return result
      }
    }else{
        result.message = 'Email មិន​ត្រឹមត្រូវទេ'
        result.success = false
        return result
    }

  }

module.exports = checkUser