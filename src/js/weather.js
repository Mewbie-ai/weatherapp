const apikey = '46148b5252cb781b97ed3026b2cc9135';
const celsius = document.getElementById('celsius');
const fahrenheit = document.getElementById('fahrenheit');
const city = document.getElementById('city');
const weather = document.getElementById('weather');
const time = document.getElementById('time');
const findcity = document.getElementById('search');

findcity.onsearch = () => getData();
document.getElementById('searchicon').onclick = () => getData();
const getData = function() {
  fetch('https://api.openweathermap.org/data/2.5/weather?q='+findcity.value+'&appid=' + apikey, {mode: 'cors'})
  .then(function(response){
    return(response.json())
  })
  .then(function(response){
    if(response.cod === '404'){
      alert(response.message)
    }
    city.textContent = response.name
    weather.innerHTML = response.weather[0].description + "<img src='http://openweathermap.org/img/wn/" + response.weather[0].icon + ".png' alt=''>"
    celsius.textContent = parseInt(response.main.temp - 273) + "°C"
    fahrenheit.textContent = parseInt(((response.main.temp - 273) * 9/5) + 32) + "°F"
    let timezoneoffsethour = response.timezone / 3600
    clearInterval(timeid)
    worldClockZone(timezoneoffsethour)
    console.log(response)
  })
}
function worldClock(zone){
  var dst = 0
  var time = new Date()
  var gmtMS = time.getTime() + (time.getTimezoneOffset() * 60000)
  var gmtTime = new Date(gmtMS)
  
  var hr = gmtTime.getHours() + zone
  var min = gmtTime.getMinutes()
  
  if (hr >= 24){
  hr = hr-24
  }
  if (hr < 0){
  hr -= -24
  }
  if (hr < 10){
  hr = " " + hr
  }
  if (min < 10){
  min = "0" + min
  }

  return hr + ":" + min
  }
  var timeid
  function worldClockZone(timezone){
  document.getElementById("time").innerHTML = worldClock(timezone)

  
  timeid = setTimeout("worldClockZone("+timezone+")", 1000)
  }
  window.onload=getData();
  