const mongoose = require('mongoose');

const Admin = mongoose.model('admin',{
    password:{
        type:String
    },
    token:{
        type:String,
        default:null
    }
})

module.exports = Admin;