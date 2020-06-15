const express = require('express');
const app = express();
const path = require('path');
const api = require('./routes/api');
require('./db/db');

app.use(express.static(path.join(__dirname,'..','public')));
app.use(api);
app.listen(process.env.PORT);