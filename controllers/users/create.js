const schema = require('./schema')
const bcrypt = require('bcryptjs')


module.exports = async (req, res) => {
    const userSchema = await schema()


    const id = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2)
    const hash = bcrypt.hashSync(req.body.password, 12)

    user = new userSchema({ 
        userid: id, 
        username: req.body.username,
        password: hash,
        email: req.body.email,
        role: req.body.role,
        thumb: req.body.thumb,
        info: req.body.info,
        video: req.body.entries,
        date: new Date()
    })

    return await user.save()

}