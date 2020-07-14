const express = require('express');
const router = new express.Router();
const mongoose = require('mongoose');
const Folders = require('../models/folders');
const Files = require('../models/files');

router.get('/api/folders',async (req,res) => {
    try{
    const skipVal = parseInt(req.query.skipVal);
    const folders = await Folders.find({}).limit(8).skip(8*skipVal);
    res.send(JSON.stringify(folders));
    }catch(e){
        console.log(e);
        res.status(500).send(e);
    }
    
})

router.get('/api/folders/count',async(req,res) => {
    try{
        const count = await Folders.find({}).countDocuments();
        const resData = {count};
        res.send(JSON.stringify(resData));
    }catch(e){
        console.log(e);
        res.status(500).send(e);
    }
})

router.get('/api/folders/:id',async (req,res) => {
    try{   
        const files = await Files.find({own_folder:req.params.id}).select({fileName:1});        
        res.send(JSON.stringify(files));
    }catch(e){
        console.log(e);
        res.status(500).send(e);
    }
})

router.get('/api/files/:id/data' , async (req,res) => {
    try{
        const fileData = await Files.findById(req.params.id).select({data:1,language:1});
        const data = {data:fileData.data.toString(),lang:fileData.hasOwnProperty('language') ? fileData.language : 'javascript'};
        res.send(JSON.stringify(data));
    }catch(e){
        console.log(e);
        res.status(500).send(e);
    }
})

module.exports = router;