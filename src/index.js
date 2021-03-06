const express = require('express');
const app = express();
const path = require('path');
const api = require('./routes/api');
const admin = require('./routes/admin');
require('./db/db');

app.use(express.static(path.join(__dirname,'..','public')));
app.use(express.json());
app.use(api);
app.use(admin);

app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname,'..','public','index.html'));
})

app.listen(process.env.PORT);