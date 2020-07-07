const express = require('express');
const path = require('path');
const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../auth/auth');
const multer = require('multer');
const upload = multer({dest:path.join(__dirname,'..','..','public','img')})
const storage = multer.memoryStorage();
const upload2 = multer({storage:storage})
const sharp = require('sharp');
const router = new express.Router();
const Folder = require('../models/folders');
const Files = require('../models/files');
const fs = require('fs');

router.post('/admin',async (req,res) => {
    try{
        const admin = await Admin.find({});
        const passHash = admin[0].password;
        bcrypt.compare(req.body.password,passHash,async (err,result) => {
            if(err){
                res.status(500).send(err);
            }
            else if(!result){
                res.status(401).send('Invalid Password');
            }
            else{
                const token = jwt.sign({_id:admin[0]._id},process.env.PASSWORD);
                console.log(admin);
                admin[0].token = token;
                await admin[0].save();
                res.send(token);
            }
        })
    }catch(e){
        console.log(e);
        res.status(500).send(e);
    }
})

router.post('/admin/folder',auth,upload.single('logo'),async (req,res) => {
    try{
        const newLogoName = path.join(__dirname,'..','..','public','img',`resized${req.file.filename}.png`);
        await sharp(req.file.path)
        .resize(800,600,{fit:'fill'})
        .toFile(newLogoName);

        const folder = new Folder({
            folderName:req.body.folderName,
            logo:`resized${req.file.filename}.png`
        });

        await folder.save();

        fs.unlink(req.file.path,(err) => {
            console.log('File Deleted')
        });
        res.send('Folder Created');
    }catch(e){
        console.log(e);
        res.status(500).send(e);
    }

})

router.get('/admin/folders',auth,async(req,res) => {

    try{
        const data = await Folder.find({});
        res.send(JSON.stringify(data));
    }catch(e){
        res.status(500).send(e)
    }

})

router.post('/createfile',auth,upload2.single('data'),async(req,res) => {
    try{
        const file = new Files({
            fileName:req.file.originalname,
            data:req.file.buffer,
            own_folder:req.body.own_folder
        })
        await file.save();
        res.send('File Saved');
    }catch(e){
        console.log(e);
        res.status(500).send(e)
    }
})


module.exports = router;