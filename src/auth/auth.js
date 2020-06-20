const Admin = require('../models/admin');
const auth = async (req,res,next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ', '');
        const admin = await Admin.find({token});
        console.log(admin);
        if(!admin || admin.length === 0){
            throw new Error();
        }
        next();
    }catch(e){
        console.log(e);
        res.status(401).send('Not Authenticated');
    }
}

module.exports  = auth;