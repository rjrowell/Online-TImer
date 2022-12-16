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

  function counting(data){
      timeLeft = data -  new Date().getTime();
      timeLeft = msToTime(timeLeft);
      return timeLeft;
  }

  module.exports = {timeToMilliseconds,msToTime,counting};