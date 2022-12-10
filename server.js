const express = require('express');
const { redirect } = require('express/lib/response');
const res = require('express/lib/response');
const shortid = require('shortid');
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
    let length = timeToMilliseconds(hours,minutes,seconds);
    let start =  new Date().getTime();
    let data = start + length;
    res.redirect('/timer'+'?data='+data);//passes the data on as a query string
})

app.get('/:timerUrl',(req,res)=>{
    var timeLeft;
    var data = req.query.data;
    console.log(data + " " +  new Date().getTime())
    res.render('timer',{timeLeft:timeLeft});
    setInterval(function counter(){
        timeLeft = data -  new Date().getTime();//TODO display time left on page 
        timeLeft = msToTime(timeLeft);
    }, 1000);
    
})

app.listen(process.env.PORT || 5000);//defaults to port 5000

//utilities below
function timeToMilliseconds(hours,minutes,seconds){
    return hours * 3600000 + minutes * 60000 + seconds * 1000;
}

function msToTime(duration) {
    var seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
  
    return hours + ":" + minutes + ":" + seconds;
  }