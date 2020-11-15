let weather = {

    // --------------------------------------------------------
    // Current weather
    // --------------------------------------------------------

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


    // --------------------------------------------------------
    // Forecast weather
    // --------------------------------------------------------

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



    // --------------------------------------------------------
    // Tools
    // --------------------------------------------------------

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


}

