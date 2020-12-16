let weather = {
    
    // ========================================================
    // API Open Weather Map
    // ========================================================

    loadOpenWeatherMap: function(latitude,longitude) {
        
        // API One Call from openweathermap
        // @see doc https://openweathermap.org/api/one-call-api
        let endPoint = 'https://api.openweathermap.org/data/2.5/onecall?lang=fr&lat='+latitude+'&lon='+longitude+'&units=metric&appid='+api.getAPIKeyForOpenWeatherMap();

        // Set up configuration for HTTP request in fetch function
        let fetchOptions = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'
        };

        // Lauch HTTP request, convert result in json and display data
        fetch(endPoint,fetchOptions)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                // console.log(data);

                // Save values -------------------------------------------------------------------------
                
                // STANDBY : wind values - these data may be collected from other API

                // current weather (live)
                let airTemp                 = Math.round(data.current.temp); 
                let airTempFeelsLike        = Math.round(data.current.feels_like);
                let cloudCoverRate          = data.current.clouds;
                let humidityRate            = data.current.humidity;
                let UV                      = Math.round(data.current.uvi);
                let visibility              = weather.getVisibilityText(data.current.visibility);
                let sunrise                 = app.getTime(data.current.sunrise);
                let sunset                  = app.getTime(data.current.sunset);
                let weatherDescr            = data.current.weather[0].description;
                let weatherIcon             = data.current.weather[0].icon; 
                // let windDegree              = data.current.wind_deg;                
                // let windDir                 = app.getCardinalDirection(windDegree);
                // let windSpeed               = app.getKmhSpeed(data.current.wind_speed); 

                // weather next hours
                let weatherNextHours        = data.hourly;   // TODO loop

                // weather today 
                let airTemp_Today           = Math.round(data.daily[0].temp.day);
                let weatherDescr_Today      = data.daily[0].weather[0].description;
                let weatherIcon_Today       = weather.getWeatherIconUrl(data.daily[0].weather[0].icon);
                // let windDegree_Today        = data.daily[0].wind_deg;
                // let windDir_Today           = app.getCardinalDirection(windDegree_Today);
                // let windSpeed_Today         = app.getKmhSpeed(data.daily[0].wind_speed); 
            
                // weather tomorrow
                let airTemp_Tomorrow        = Math.round(data.daily[1].temp.day);
                let weatherDescr_Tomorrow   = data.daily[1].weather[0].description;
                let weatherIcon_Tomorrow    = weather.getWeatherIconUrl(data.daily[1].weather[0].icon);
                // let windDegree_Tomorrow     = data.daily[1].wind_deg;  
                // let windDir_Tomorrow        = app.getCardinalDirection(windDegree_Tomorrow);
                // let windSpeed_Tomorrow      = app.getKmhSpeed(data.daily[1].wind_speed);
            
                // weather after tomorrow
                let airTemp_AfterTomorrow       = Math.round(data.daily[2].temp.day);
                let weatherDescr_AfterTomorrow  = data.daily[2].weather[0].description;
                let weatherIcon_AfterTomorrow   = weather.getWeatherIconUrl(data.daily[2].weather[0].icon);
                // let windDegree_AfterTomorrow    = data.daily[2].wind_deg
                // let windDir_AfterTomorrow       = app.getCardinalDirection(windDegree_AfterTomorrow);
                // let windSpeed_AfterTomorrow     = app.getKmhSpeed(data.daily[2].wind_speed); 
        
                
                // Display in webpage -------------------------------------------------------------------------

                // current weather
                weather.displayCurrentDescription(weatherDescr); 
                weather.displayCurrentIcon(weatherIcon);
                weather.displayCurrentTemperature(airTemp);
                weather.displayCurrentTempFeelsLike(airTempFeelsLike);
                weather.displayVisibility(visibility);

                // TODO humidity
                // TODO cloud cover
                // TODO uv
                // TODO sunrise/sunset
                
                // weather next hours       // TODO
                // weather today            // TODO
                // weather tomorrow         // TODO
                // weather after tomorrow   // TODO

                // // Standby
                // weather.displayCurrentWind(windSpeed);
                // weather.displayCurrentWindDirection(windDir);
            })
    },




    // ========================================================
    // Current weather
    // ========================================================


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
     * Display current temperature feels like 
     * 
     * @param number temperature feels like
     */
    displayCurrentTempFeelsLike: function(tempFeelsLike) {
        let tempFeelsLikeContainer = document.querySelector(".weather__temperature--Felt span");
        tempFeelsLikeContainer.textContent = tempFeelsLike;
    },
    

    /**
     * Display visibility description
     * 
     * @param string visibility text
     */
    displayVisibility: function (visibility) {
        let visibilityContainer = document.querySelector(".sea-visibility span");
        visibilityContainer.textContent = visibility;

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
            return "Visibilité moyenne";
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

    /**
     * Average rain precipitation for next hour
     * 
     * @param array rainData : precipitation rain per minute for next hour
     */
    getRainForNextHour: function(rainData) {

        // init variable
        let precipitation = 0;

        // add precipitations of each minute
        for(let i=0; i < rainData.length; i++) {
            precipitation += Number(rainData[i].precipitation);
        }
        // get average
        let averagePrecipitation = Math.round(precipitation/rainData.length);

        // console.log(averagePrecipitation);

        // return total value with message
        if(averagePrecipitation == 0){
            return "Pas de pluie :)";
        }

        else if(averagePrecipitation > 0 && averagePrecipitation <= 3) {
            return averagePrecipitation+"mm/heure, ça passe !";
        }

        else if(averagePrecipitation > 4 && averagePrecipitation <= 7) {
            return averagePrecipitation+"mm/heure, oublie pas un bon imper!";
        }
        else if(averagePrecipitation >= 8) {
            return averagePrecipitation+"mm/h, tu vas être trempé(e)!";

        }
    },

}

