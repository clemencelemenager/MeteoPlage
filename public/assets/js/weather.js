let weather = {


    // ========================================================
    // Current weather
    // ========================================================
    
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
        let temperatureContainer = document.querySelector(".weather__temperature--Air");
        temperatureContainer.textContent = temperature;
    },

    /**
     * Display current wind values
     * 
     * @param number windSpeed : speed in kmh
     * @param string windDirection : cardinal direction
     */
    displayCurrentWind: function (windSpeed,windDirection) {

        let windContainer = document.querySelector(".weather__content--wind");
        windContainer.textContent = windSpeed+"km/h "+windDirection;
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
        let hourContainer = document.querySelector("."+querySelector+" .weather__forecast--time");
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

        let iconContainer = document.querySelector("."+querySelector+" .weather__forecast--icon");
        iconContainer.appendChild(iconElement);

    },

    /**
     * Display the temperature of forecast 
     * 
     * @param number temperature
     * @param string querySelector : id for forecast
     */
    displayForecastTemp: function(temp, querySelector) {
        let tempContainer = document.querySelector("."+querySelector+" .weather__forecast--temp");
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
        let windContainer = document.querySelector("."+querySelector+" .weather__forecast--wind");
        windContainer.textContent = windSpeed+"km/h "+windDirection; 

    },



    // ========================================================
    // Tools
    // ========================================================

    /**
     * Convert speed from m/s to km/h
     * 
     * @param numb speed in m/s
     */
    getKmhSpeed(speed) {
        speed = Math.round(speed*3.6);
        return speed;
    },
    
    /**
     * Convert degrees in cardinal direction
     * 
     * @param number windDegree 
     */
    getCardinalDirection(windDegree) {
        if(windDegree => 348.75 && windDegree < 11.25) {
            return "N";
        }
        if(windDegree => 11.25 && windDegree < 33.75) {
            return "NNE";
        }
        if(windDegree => 33.75 && windDegree < 56.25) {
            return "NE";
        }
        if(windDegree => 56.25 && windDegree < 78.75) {
            return "ENE";
        }
        if(windDegree => 78.75 && windDegree < 101.25) {
            return "E";
        }
        if(windDegree => 101.25 && windDegree < 123.75) {
            return "ESE";
        }
        if(windDegree => 123.75 && windDegree < 146.25) {
            return "SE";
        }
        if(windDegree => 146.25 && windDegree < 168.75) {
            return "SSE";
        }
        if(windDegree => 168.75 && windDegree < 191.25) {
            return "S";
        }
        if(windDegree => 191.25 && windDegree < 213.75) {
            return "SSO";
        }
        if(windDegree => 213.75 && windDegree < 236.25) {
            return "SO";
        }
        if(windDegree => 236.25 && windDegree < 258.75) {
            return "OSO";
        }
        if(windDegree => 258.75 && windDegree < 281.25) {
            return "O";
        }
        if(windDegree => 281.25 && windDegree < 303.75) {
            return "ONO";
        }
        if(windDegree => 303.75 && windDegree < 326.25) {
            return "NO";
        }
        if(windDegree => 326.25 && windDegree < 348.75) {
            return "NNO";
        }

    },

    /** 
     * Get hour from unix timestamp
     * 
     */
    getForecastHour: function(unix) {
        let date = new Date(unix*1000);
        let hour = date.getHours();
        return hour;
    },


    /**
     * Add event listener on "see forecast" 
     */
    listenSeeForecast: function() {
        let seeForecastElement = document.querySelector(".weather__forecast--title");
        seeForecastElement.addEventListener('click', weather.seeForecast);
    },

    /**
     * Display on/off on weather forecast content
     */
    seeForecast: function() {
        let forecastElement = document.querySelector(".weather__forecast--content");
        forecastElement.classList.toggle('nodisplay');
    },

}

