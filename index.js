// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}



const weatherApi = {
    key:'62f1e21262889a3711ec0afe91683ee5',
    baseUrl: 'https://api.openweathermap.org/data/2.5/weather'
};


const submitEl = document.querySelector('.btn-sub');
const inputEl = document.getElementById('input-el');

submitEl.addEventListener('click',function(){
    
    // e.preventDefault();
 console.log(inputEl.value)
 showdata(inputEl.value);
})

function showdata(city){
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}`)
    .then( weather => {
        return weather.json();
      }).then(showWeatherReport)
      .catch((error) => {
        alert('Enter correct Name')
      });;

      function showWeatherReport(weather){
        
        console.log(weather)
        let city = document.querySelector('.city');
        city.innerHTML = `${weather.name},${weather.sys.country}`
        
        let tempEl = document.querySelector('.temp');
        tempEl.innerHTML = `<h2>${Math.round(weather.main.temp-273)}&deg;C</h2>`;

        let minMax = document.querySelector('.min-max');
        minMax.innerHTML = `<h2>${Math.floor(weather.main.temp_min-273)}&deg;C(min)/${Math.ceil(weather.main.temp_max-273)}&deg;C(max)</h2>`;
        
        const dateEl = document.querySelector('.time');
        let date = new Date();
        dateEl.textContent = displayDate(date);
        console.log(dateEl)


        let moodEl = document.querySelector('.mood');
        moodEl.textContent = `${weather.weather[0].main}`;
        
        if(moodEl.textContent === 'Clear'){
            document.body.style.backgroundImage = "url('./images/clear.jpg')";
        }
        else if(moodEl.textContent === 'Clouds'){
            document.body.style.backgroundImage = "url('./images/cloud.jpg')";
        }
        else if(moodEl.textContent === 'Rain'){
            document.body.style.backgroundImage = "url('./images/rain.jpg')"; 
        }
        else if(moodEl.textContent === 'Snow'){
            document.body.style.backgroundImage = "url('./images/snow.jpg')"; 
        }
        else if(moodEl.textContent === 'Sunny'){
            document.body.style.backgroundImage = "url('./images/sunny.jpg')"; 
        }
        else if(moodEl.textContent === 'Thunderstorm'){
            document.body.style.backgroundImage = "url('./images/thunderstorm.jpg')"; 
        }
        else if(moodEl.textContent === 'Mist'){
            document.body.style.backgroundImage = "url('./images/mist.jpg')"; 
        }
        else{
            document.body.style.backgroundImage = "url('./images/bg.jpg')";
        }

        }
    
}

function displayDate(item){
    const monthEl = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec'];

    let year = item.getFullYear();
    let month = monthEl[item.getMonth()];
    let date = item.getDate();

    return `${date} ${month} ${year}`;
}