let app = {

     /**
     *  Init function 
     */ 
    init: function() {

        // console.log('function app.init');

        // collect datas from API
        app.loadCurrentWeather();
        app.loadForecastWeather();

        // add event listener
        app.listenSeeForecast();

    },

    /**
     * Display current weather 
     */
    loadCurrentWeather: function() {

        app.fetchCurrentWeatherData().then( function(data) {
            // console.log(data);

            // Set values from API
            let description     = data.weather[0].description;
            let icon            = data.weather[0].icon
            let temperature     = data.main.temp_min;
            let windSpeed       = weather.getKmhSpeed(data.wind.speed);
            let windDirection   = weather.getCardinalDirection(data.wind.deg);

            // Display in webpage
            weather.displayCurrentDescription(description); 
            weather.displayCurrentIcon(icon);
            weather.displayCurrentTemperature(temperature);
            weather.displayCurrentWind(windSpeed,windDirection);

        });


    },

    /**
     * Get current weather data from API
     */
    fetchCurrentWeatherData: function() {
        // API current Weather from OpenWeatherMap
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

    /**
     * Display forecast weather
     */
    loadForecastWeather: function() {
        app.fetchForecastWeatherData().then( function(data) {
            // console.log(data);

            let forecastData = {};

            // Set values from API
            for(i = 0; i < data.list.length; i++) {
                let forecast = data.list[i];

                // init new key in forecastData
                forecastData[i] = [];

                // set values
                let querySelector   = "forecast"+i;
                let time            = weather.getForecastHour(forecast.dt);
                let icon            = forecast.weather[0].icon;
                let temp            = Math.round(forecast.main.temp);
                let windSpeed       = weather.getKmhSpeed(forecast.wind.speed);
                let windDir         = weather.getCardinalDirection(forecast.wind.deg);

                // insert values in array
                forecastData[i]["querySelector"]    = querySelector;
                forecastData[i]["time"]             = time;
                forecastData[i]["icon"]             = icon;
                forecastData[i]["temperature"]      = temp;
                forecastData[i]["windSpeed"]        = windSpeed;
                forecastData[i]["windDir"]          = windDir;

                weather.displayForecast(forecastData[i]);
            }

            // // Display in webpage forecast 
            // let forecast3h = forecastData[0];
            
            // weather.displayForecast(forecast3h);
            

        });
    },

    /**
     * Get forecast weather data from API
     */
    fetchForecastWeatherData: function() {
        // API 5 day weather forecast from OpenWeatherMap
        // @see https://openweathermap.org/forecast5
        let endPoint = 'https://api.openweathermap.org/data/2.5/forecast?lat=49.369682&lon=-0.871084&units=Metric&cnt=3&lang=fr&appid=bface5a23aac7c1c4f94d093220d3a05';

        let fetchOptions = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'
        };

        let fetchRequest = fetch(endPoint,fetchOptions);
        let fetchResponse = fetchRequest.then(function(response) {
            return response.json();
            })
        return fetchResponse;

    },

    listenSeeForecast: function() {
        let seeForecastElement = document.querySelector(".weather__forecast--title");
        seeForecastElement.addEventListener('click', app.seeForecast);
    },

    seeForecast: function() {
        let forecastElement = document.querySelector(".weather__forecast--content");
        forecastElement.classList.toggle('nodisplay');
    }

     

}


// Call init when page ready
document.addEventListener('DOMContentLoaded', app.init);

