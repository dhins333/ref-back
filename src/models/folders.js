const mongoose = require('mongoose');

const FoldersSchema = new mongoose.Schema({
    folderName:{
        type:String,
        required:true
    },
    logo:{
        type:String
    }
})
const Folders = mongoose.model('Folders',FoldersSchema);

FoldersSchema.virtual('files',{
    ref:'Files',
    localField:'_id',
    foreignField:'own_folder'
})

module.exports = Folders;