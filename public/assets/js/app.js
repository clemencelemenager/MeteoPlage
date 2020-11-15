let app = {

     /**
     *  Init function 
     */ 
    init: function() {

        // console.log('function app.init');

        // Set latitud & longitud for Omaha Beach
        let lat = 49.369682 ;
        let long = -0.871084;

        // collect datas from API
        app.loadCurrentWeather();
        app.loadForecastWeather();
        //! API Tides limited to 100 requests/month
        // app.loadTides();

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
            
            // init object of forecast datas
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

                // display forecast
                weather.displayForecast(forecastData[i]);
            }

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

    /**
     * Add event listener on "see forecast" 
     */
    listenSeeForecast: function() {
        let seeForecastElement = document.querySelector(".weather__forecast--title");
        seeForecastElement.addEventListener('click', app.seeForecast);
    },

    /**
     * Display on/off on weather forecast content
     */
    seeForecast: function() {
        let forecastElement = document.querySelector(".weather__forecast--content");
        forecastElement.classList.toggle('nodisplay');
    },

    /**
     * Display tides 
     */
    loadTides: function() {

        app.fetchTidesData().then( function(data) {
            console.log(data);

            // set values
            let currentTide     = tide.translateTideType(data.heights[0].state);
            let nextTideType    = tide.translateTideType(data.extremes[0].state);
            let nextTideHour    = tide.getTideTime(data.extremes[0].timestamp);
      
            // display on webpage
            tide.displayCurrentTide(currentTide);
            tide.displayNextTide(nextTideType, nextTideHour);

        });
    },

    /**
     * Get tides datas from API
     */
    fetchTidesData: function() {
        // API Tides
        // @see https://rapidapi.com/apihood/api/tides/endpoints
        // ! LIMIT 100 REQUESTS PER MONTH
        let endPoint = 'https://tides.p.rapidapi.com/tides?latitude=49.369682&longitude=-0.871084&interval=60&duration=1440&radius=10'

        let fetchOptions = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            "headers": {
                "x-rapidapi-key": "f189a2aa50msh73dd958991d441ep1301b9jsn9c4346a2dec5",
                "x-rapidapi-host": "tides.p.rapidapi.com"
            }
        };

        let fetchResponse = fetch(endPoint,fetchOptions).then(function(response) {
            return response.json();
            })
        
            

        return fetchResponse;
    },

     

}


// Call init when page ready
document.addEventListener('DOMContentLoaded', app.init);

