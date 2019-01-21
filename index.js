const API_KEY = "&APPID=ca4165ce88227d7dbac7d7a64ea3f2ef"

// Convert UNIX timestamp to hours
  // function convertTime(timestamp) {
  //   const time = Date(timestamp * 1000);
  //   return `${time.getHours()}:${time.getMinutes()}`;
  // }

//Convert Kelvin to Celsius
function convertTemp(temp) {
  return temp - 273.15;
}

function handleFormSubmit(event) {
  //handle submit event
  const city = document.getElementById('city').value.replace(/\s/g, "+");
  console.log(city);
  fetchCurrentWeather(city);
  fetchFiveDayForecast(city);
}

function fetchCurrentWeather(city) {
  //fetch current weather based on city
  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + API_KEY)
  .then(resp => resp.json())
  .then(json => displayCurrentWeather(json));
}

function displayCurrentWeather(json) {
  //render current weather data to the DOM using provided IDs and json from API
  console.log(json.main.temp);
  document.getElementById('temp').innerText = `${convertTemp(json.main.temp).toFixed(2)}`;
  document.getElementById('low').innerText = `${convertTemp(json.main.temp_min).toFixed(2)}`;
  document.getElementById('high').innerText = `${convertTemp(json.main.temp_max).toFixed(2)}`;
  document.getElementById('humidity').innerText = `${json.main.humidity}%`;
  document.getElementById('cloudCover').innerText = `${json.clouds['all']}%`;
  // document.getElementById('sunrise').innerText = `${json.sys.sunrise}`;
  // document.getElementById('sunset').innerText = `${json.sys.sunset}`;
}


function fetchFiveDayForecast(city) {
  //fetch five day forecast data based on city
  fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city + API_KEY)
  .then(resp => resp.json())
  .then(json => displayFiveDayForecast(json));
}



function displayFiveDayForecast(json) {
  //render five day forecast data to the DOM using provided IDs and json from API
  document.querySelector('aside').innerHTML = "";
    for (i = 0; i < json.list.length; i++) {
      const obj = json.list[i];
      const date = obj.dt_txt;
      const temp = convertTemp(obj.main.temp).toFixed(2);
      const humid = `${obj.main.humidity}%`;
      const all = [date, temp, humid];
      const newDiv = document.createElement('div');


      for (const i of all) {
        const node = document.createElement('p');
        const write = document.createTextNode(`${i}`);
        node.appendChild(write);
        newDiv.appendChild(node);
      }
      // const writeDate = document.createTextNode(`${date}`)
      // const writeTemp = document.createTextNode(`${temp}`)
      // const writeHumid = document.createTextNode(`${humidity}`)
      
      // newDiv.setAttribute("class", "threeHour");
    
      document.querySelector('aside').appendChild(newDiv);
      
  }
}


function createChart(json) {
  //Bonus: render temperature chart using five day forecast data and ChartJS
}

document.addEventListener('DOMContentLoaded', function() {
  //add event listener here for form submission
  document.addEventListener('submit', function() {
    event.preventDefault();
    handleFormSubmit();
  })
})
