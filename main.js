const api = {
  key: "1f492b6c4e7e062e1f21fc6c2b6966d4",
  base: "https://api.openweathermap.org/data/2.5/",
};

document.body.style.backgroundImage = "url('sunnyday.jpg')";

const searchBox = document.querySelector(".search-box");
searchBox.addEventListener("keypress", setQuery);

function setQuery(e) {
  if (e.keyCode == 13) {
    getResults(searchBox.value.toLowerCase());
    localStorage.setItem("location", searchBox.value);
    searchBox.value = "";
  }
}

function getResults(query) {
  let qry = query == undefined ? localStorage.getItem("location") : query;
  console.log(qry);
  fetch(`${api.base}weather?q=${qry}&units=imperial&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
};

document.addEventListener('DOMContentLoaded', getResults())


function clear() {
  let x = document.querySelector(".x");
  x.addEventListener("click", () => {
    searchBox.value = "";
  });
}
clear();

function displayResults(weather) {
  console.log(weather)
  let main = document.querySelector("main");
  main.classList.add("show");
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;
  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);
  console.log(weather);

  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°F</span>`;

  let weather_el = document.querySelector(".current .weather");
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector(".hi-low");
  hilow.innerText = `H: ${Math.round(
    weather.main.temp_max
  )}°F / L: ${Math.round(weather.main.temp_min)}°F`;

  let desc = document.querySelector(".desc");
  desc.innerText = ` - ${weather.weather[0].description}`;

  let icon = document.querySelector(".icon");
  let h2 = document.querySelector(".h2");
  let p = document.querySelector(".p");

  if (weather.weather[0].main == "Snow") {
    document.body.style.backgroundImage = "url('snow.jpg')";
    icon.innerHTML = "<i class='fas fa-snowflake'></i>";
    h2.innerText = "It's cold!";
    p.innerText = "Don't forget to bundle up if you're going out!";
  } else if (weather.weather[0].main == "Clouds") {
    document.body.style.backgroundImage = "url('cloudy.jpg')";
    icon.innerHTML = "<i class='fas fa-cloud'></i>";
    h2.innerText = "It's looking cloudy out!";
    if (weather.main.temp <= 30) {
      p.innerText = "It's cold out bundle up!";
    } else {
      p.innerText = "it's cloudy but warm!";
    }
  } else if (weather.weather[0].main == "Rain") {
    document.body.style.backgroundImage = "url('rain.jpg')";
    icon.innerHTML = "<i class='fas fa-cloud-rain'></i>";
    h2.innerText = "It's raining out!";
    p.innerText = "Don't forget an Umbrella!";
  } else if (weather.weather[0].main == "Clear") {
    document.body.style.backgroundImage = "url('sunnyday.jpg')";
    icon.innerHTML = "<i class='fas fa-sun'>";
  } else {
    icon.innerHTML = "<i class='fas fa-sun'>";
  }
}

function dateBuilder(d) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "Novermber",
    "December",
  ];
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${month} - ${date} - ${year}`;
}
