const mongoose = require('mongoose');

const Files = mongoose.model('Files',{
    fileName:{
        type:String,
        required:true
    },
    own_folder:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Folders'
    },
    data:{
        type:Buffer,
        required:true
    }
})

module.exports = Files;