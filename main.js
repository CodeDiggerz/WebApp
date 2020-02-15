const api = {
  key: "14a785cecb277136e9727514a1ee0188",
  base: "https://api.openweathermap.org/data/2.5/",
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults (query) {
  fetch(`${api.base}weather?q=${query}&appid=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
  fetch(`${api.base}forecast?q=${query}&appid=${api.key}`)
  .then(future => {
    return future.json();
  }).then(displayFuture);
}

function displayResults (weather) {
    console.log(weather);
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)-273}<span>°c</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)-273}°c / ${Math.round(weather.main.temp_max)-273}°c`;
}

function displayFuture(future) {
  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  console.log(future);
  let avg = document.querySelector('.current .avg');
  avg.innerHTML = `${Math.round(future.list[0].main.temp)-273}<span>°c</span>`;

  let low = document.querySelector('.current .low');
  low.innerHTML = `${Math.round(future.list[0].main.temp_min)-273}<span>°c</span>`;

  let high = document.querySelector('.current .high');
  high.innerHTML = `${Math.round(future.list[0].main.temp_max)-273}<span>°c</span>`;

  let speed = document.querySelector('.current .speed');
  speed.innerHTML = `${Math.round(future.list[0].wind.speed)}<span>km/h</span>`;
}

function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}