let app = {

     /**
     *  Init function 
     */ 
    init: function() {

        // console.log('function app.init');

        // collect datas from API
        app.loadWeatherData();
 
    },


    loadWeatherData: function() {

        app.fetchWeatherData().then( function(data) {
            console.log(data);

            // Set values from API
            let description = data.weather[0].description;
            let icon = data.weather[0].icon
            let temperature = data.main.temp_min;
            let windSpeed = data.wind.speed;
            let windDirection = data.wind.deg;

            // Display in webpage
            weather.displayWeatherDescription(description); 
            weather.displayWeatherIcon(icon);
            weather.displayWeatherTemperature(temperature);
            weather.displayWeatherWind(windSpeed,windDirection);

        });


    },

    fetchWeatherData: function() {
        // API endpoint from OpenWeatherMap
        // @see https://openweathermap.org/api
        let endPoint = 'https://api.openweathermap.org/data/2.5/weather?lat=49.369682&lon=-0.871084&units=Metric&lang=fr&appid=5bdef62705627724ff162613c308c4af';

        // Set up configuration for HTTP request in fetch function
        let fetchOptions = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'
        };

        // Lauch HTTP request
        // and then, when we receive response,
        // convert the response (json) in js object
        let fetchRequest = fetch(endPoint,fetchOptions);
        let fetchResponse = fetchRequest.then(function(response) {
            return response.json();
            })
        return fetchResponse;
    },

   

}


// Call init when page ready
document.addEventListener('DOMContentLoaded', app.init);

