const express = require('express')
const fileUpload = require('express-fileupload')
var router = express.Router()



router.use(fileUpload())

router.get('/', async function(req, res){
    var settings = await require('../../settings')

    settings.dLogo = 'ទំព័រ​ Upload'
    settings.message = ''

    if(req.session.user){
        res.render('users/upload', settings)
    }else{
        res.redirect('/users')
    }
})

router.post('/', async function(req, res) {
    var settings = await require('../../settings')
    
    if(req.session.user){

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.')
        }

        const uploadedFile = req.files.uploadFile
        const fileName = req.files.uploadFile.name
        const id = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2)
        const moveTo = `public/upload/${id+'_'+fileName}`
        const fileUrl = `/upload/${id+'_'+fileName}`

        uploadedFile.mv(moveTo, function(err) {
            if (err)
                return console.log(err)

            settings.dLogo = 'ទំព័រ​ Upload'
            settings.message = fileUrl

            res.render('users/upload', settings)
        })

    }else{
        res.redirect('/users')
    }
})



module.exports = router