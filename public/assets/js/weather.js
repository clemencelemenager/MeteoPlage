let weather = {


    
    // ========================================================
    // API Open Weather Map
    // ========================================================

    loadOpenWeatherMap: function(latitude,longitude) {
        
        // API One Call from openweathermap
        // @see https://openweathermap.org/api/one-call-api
        let endPoint = 'https://api.openweathermap.org/data/2.5/onecall?lang=fr&lat='+latitude+'&lon='+longitude+'&units=metric&appid='+api.getAPIKeyForOpenWeatherMap();

        // Set up configuration for HTTP request in fetch function
        let fetchOptions = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'
        };

        // Lauch HTTP request
        // and then, when we receive response,
        // convert the response (json) in js object
        fetch(endPoint,fetchOptions)
            .then(function(response) {
                return response.json();
                })
            .then(function(data) {
                console.log(data);

                // Save values -------------------------------------------------------------------------

                // current weather
                let airTemp                 = Math.round(data.current.temp); 
                let airTempFeelsLike        = Math.round(data.current.feels_like);
                let cloudCoverRate          = data.current.clouds;
                let humidityRate            = data.current.humidity;
                let UV                      = Math.round(data.current.uvi);
                let visibility              = weather.getVisibilityText(data.current.visibility);
                let sunrise                 = app.getTime(data.current.sunrise);
                let sunset                  = app.getTime(data.current.sunset);
                let windDegree              = data.current.wind_deg;                
                let windDir                 = app.getCardinalDirection(windDegree);
                let windSpeed               = app.getKmhSpeed(data.current.wind_speed); 
                let weatherDescr            = data.current.weather[0].description;
                let weatherIcon             = weather.getWeatherIconUrl(data.current.weather[0].icon); 
                let rainNextHour            = data.minutely;   // TODO boucle sur le tableau et somme

                // weather next hours
                let weatherNextHours        = data.hourly;   // TODO boucle

                // weather today
                let airTemp_Today           = Math.round(data.daily[0].temp.day);
                let weatherDescr_Today      = data.daily[0].weather[0].description;
                let weatherIcon_Today       = weather.getWeatherIconUrl(data.daily[0].weather[0].icon);
                let windDegree_Today        = data.daily[0].wind_deg;
                let windDir_Today           = app.getCardinalDirection(windDegree_Today);
                let windSpeed_Today         = app.getKmhSpeed(data.daily[0].wind_speed); 
            
                // weather tomorrow
                let airTemp_Tomorrow        = Math.round(data.daily[1].temp.day);
                let weatherDescr_Tomorrow   = data.daily[1].weather[0].description;
                let weatherIcon_Tomorrow    = weather.getWeatherIconUrl(data.daily[1].weather[0].icon);
                let windDegree_Tomorrow     = data.daily[1].wind_deg;  
                let windDir_Tomorrow        = app.getCardinalDirection(windDegree_Tomorrow);
                let windSpeed_Tomorrow      = app.getKmhSpeed(data.daily[1].wind_speed);
            
                // weather after tomorrow
                let airTemp_AfterTomorrow       = Math.round(data.daily[2].temp.day);
                let weatherDescr_AfterTomorrow  = data.daily[2].weather[0].description;
                let weatherIcon_AfterTomorrow   = weather.getWeatherIconUrl(data.daily[2].weather[0].icon);
                let windDegree_AfterTomorrow    = data.daily[2].wind_deg
                let windDir_AfterTomorrow       = app.getCardinalDirection(windDegree_AfterTomorrow);
                let windSpeed_AfterTomorrow     = app.getKmhSpeed(data.daily[2].wind_speed); 
        
            
            })
    },


    // ========================================================
    // Current weather
    // ========================================================

    // TODO : SUPPR APRES TRANSFERT SUR loadOpenWeatherData()

    /**
     * Display current weather 
     */
    loadCurrentWeather: function() {

        weather.fetchCurrentWeatherData().then( function(data) {
            // console.log(data);

            // Set values from API
            let description     = data.weather[0].description;
            let icon            = data.weather[0].icon
            let temperature     = data.main.temp_min;
            let windSpeed       = app.getKmhSpeed(data.wind.speed);
            let windDirection   = app.getCardinalDirection(data.wind.deg);

            // Display in webpage
            weather.displayCurrentDescription(description); 
            weather.displayCurrentIcon(icon);
            weather.displayCurrentTemperature(temperature);
            weather.displayCurrentWind(windSpeed);
            weather.displayCurrentWindDirection(windDirection);

        });
    },

    /**
     * Get current weather data from API
     * ! set your API Key
     */
    fetchCurrentWeatherData: function() {
        // API current Weather from OpenWeatherMap
        // @see https://openweathermap.org/api
        let endPoint = 'https://api.openweathermap.org/data/2.5/weather?lat=49.369682&lon=-0.871084&units=Metric&lang=fr&appid='+api.getAPIKeyForCurrentWeather();

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
     * Display current weather description
     * 
     * @param string description 
     */
    displayCurrentDescription: function(description) {

        let descriptionElement = document.querySelector(".weather__description");
        descriptionElement.textContent = description;
    },

    /**
     * Display current weather icon
     * 
     * @param string icon 
     */
    displayCurrentIcon: function(icon) {

        let iconURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";

        let iconElement = document.createElement("img");
        iconElement.setAttribute("src",iconURL);

        let iconContainer = document.querySelector(".weather__picture");
        iconContainer.appendChild(iconElement);
    },
    
    /**
     * Display current temperature 
     * 
     * @param number temperature 
     */
    displayCurrentTemperature: function(temperature) {
        let temperatureContainer = document.querySelector(".weather__temperature--Air span");
        temperatureContainer.textContent = temperature;
    },

    /**
     * Display current wind values
     * 
     * @param number windSpeed : speed in kmh
     */
    displayCurrentWind: function (windSpeed) {

        let windContainer = document.querySelector(".weather__content--wind span");
        windContainer.textContent = windSpeed+"km/h ";
    },

    /**
     * Display current wind direction
     * 
     * @param string windDirection : cardinal direction
     */
    displayCurrentWindDirection: function(windDirection) {
        let windDirContainer = document.querySelector('.weather__content--windDir span');
        windDirContainer.textContent = windDirection;
    },


    // ========================================================
    // Forecast weather
    // ========================================================

    /**
     * Display forecast weather
     */
    loadForecastWeather: function() {
        weather.fetchForecastWeatherData().then( function(data) {
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
                let time            = app.getHour(forecast.dt);
                let icon            = forecast.weather[0].icon;
                let temp            = Math.round(forecast.main.temp);
                let windSpeed       = app.getKmhSpeed(forecast.wind.speed);
                let windDir         = app.getCardinalDirection(forecast.wind.deg);

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
     * ! set your API key
     */
    fetchForecastWeatherData: function() {
        // API 5 day weather forecast from OpenWeatherMap
        // @see https://openweathermap.org/forecast5
        let endPoint = 'https://api.openweathermap.org/data/2.5/forecast?lat=49.369682&lon=-0.871084&units=Metric&cnt=3&lang=fr&appid='+api.getAPIKeyForForecastWeather();

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
     * Display specific forecast
     * 
     * @param string indexForecast 
     */
    displayForecast: function(indexForecast) {
        weather.displayForecastIcon(indexForecast["icon"], indexForecast["querySelector"]);
        weather.displayForecastTime(indexForecast['time'], indexForecast["querySelector"]);
        weather.displayForecastTemp(indexForecast['temperature'],indexForecast["querySelector"]);
        weather.displayForecastWind(indexForecast['windSpeed'],indexForecast['windDir'],indexForecast["querySelector"]);
    },

    /**
     * Display the correspondant hour of forecast 
     * 
     * @param number hour of the forecast
     * @param string querySelector : id for forecast
     */
    displayForecastTime: function(hour, querySelector) {
        let hourContainer = document.querySelector("."+querySelector+" .forecast__weather--time");
        hourContainer.textContent = hour+"h";
    },

    /**
     * Display the weather icon of forecast
     * 
     * @param string icon 
     * @param string querySelector : id for forecast
     */
    displayForecastIcon: function(icon, querySelector) {

        let iconURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
        let iconElement = document.createElement("img");
        iconElement.setAttribute("src",iconURL);

        let iconContainer = document.querySelector("."+querySelector+" .forecast__weather--icon");
        iconContainer.appendChild(iconElement);

    },

    /**
     * Display the temperature of forecast 
     * 
     * @param number temperature
     * @param string querySelector : id for forecast
     */
    displayForecastTemp: function(temp, querySelector) {
        let tempContainer = document.querySelector("."+querySelector+" .forecast__weather--temp");
        tempContainer.textContent = temp+"°"; 
    },

    /**
     * Display wind values of forecast
     * 
     * @param number windSpeed 
     * @param number windDirection 
     * @param string querySelector : id for forecast
     */
    displayForecastWind: function(windSpeed, windDirection, querySelector) {
        let windContainer = document.querySelector("."+querySelector+" .forecast__weather--wind");
        windContainer.textContent = windSpeed+"km/h "+windDirection; 

    },

    // =============================================================
    // TOOLS    
    // =============================================================

    /**
     * Get icon URL from icon code
     * 
     * @param string icon : code given by API open weather map
     * @return string iconURL : url to display weather icon in img element
     */
    getWeatherIconUrl: function(icon) {
        let iconURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
        return iconURL;
    },

    /**
     * Convert visibility value into a text description 
     * 
     * @param integer visibility : value in meters
     * @return string visibility description 
     */
    getVisibilityText: function(visibility) {
        if(visibility >= 10000) {
            return "Bonne visibilité";
        }
        else if( visibility >=5000 && visibility < 10000) {
            return "Moyenne visibilité";
        }
        else if( visibility > 0 && visibility < 5000) {
            return "Mauvaise visibilité";
        }
        else if (visibility == 0) {
            return "Très mauvaise visibilité";
        }
        else if(empty(visibility)) {
            return "NC";
        }
    },

}

