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
        result.success = true;
        req.session.user = user
        return result
      }else{
        result.message = 'The password is wrong.';
        result.success = false;
        return result
      }
    }else{
        result.message = 'The email is wrong.';
        result.success = false;
        return result
    }

  }

module.exports = checkUser