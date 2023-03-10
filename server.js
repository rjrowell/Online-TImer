const express = require('express');
const { redirect } = require('express/lib/response');
const res = require('express/lib/response');
const utilities = require('./public/assets/utils');
const app = express();

// using app.use to serve up static CSS files in public/assets/ folder when /public link is called in ejs files
// app.use("/route", express.static("foldername"));
app.use('/public', express.static('public'));
app.use(express.urlencoded({extended: false}));

app.set('view engine', 'ejs')

app.get('/',(req,res)=>{
    res.render('index');
})

app.post('/GetTimer',async(req,res)=>{
    let hours = await req.body.Hours; 
    let minutes = await req.body.Minutes;
    let seconds = await req.body.Seconds;
    let length = utilities.timeToMilliseconds(hours,minutes,seconds);
    let data = new Date().getTime() + length;
    res.redirect('/timer'+'?data='+data);//passes the data on as a query string
})

app.get('/:timerUrl',(req,res)=>{
    var data = req.query.data;
    console.log(data + " " +  new Date().getTime())
    res.render('timer',{data:data});
})

app.listen(process.env.PORT || 5000);//defaults to port 5000