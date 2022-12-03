const express = require('express');
const res = require('express/lib/response');
const app = express();

// using app.use to serve up static CSS files in public/assets/ folder when /public link is called in ejs files
// app.use("/route", express.static("foldername"));
app.use('/public', express.static('public'))

app.set('view engine', 'ejs')
app.get('/',(req,resp)=>{
    resp.render('index')
})

app.listen(process.env.PORT || 5000);