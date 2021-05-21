const schema = require('./schema')


module.exports = async (req, res) => {
    const userChema = schemas()


    id = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2)
/*
    user = new userChema({ 
        userid: id, 
        username: "Sokhavuth",
        password: "Tin2021",
        email: 'xxx',
        role: 'xxx',
        info: 'xxx',
        date: new Date()
    })
*/
    //const _user = await user.save()

  //res.json({ user: _user })
}