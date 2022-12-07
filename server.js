const express = require('express');
const { redirect } = require('express/lib/response');
const res = require('express/lib/response');
const shortid = require('shortid');
const app = express();
let theDate = new Date;

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
    let length = "timeToMilliseconds(hours,minutes,seconds)"//TODO This
    let start = theDate.getTime()
    let data = [start,length]
    res.redirect('/timer'+'?data='+data);
})

app.get('/:timerUrl',(req,res)=>{
    var data = req.query.data
    console.log(data)
    res.render('timer');
})

app.listen(process.env.PORT || 5000);//defaults to port 5000