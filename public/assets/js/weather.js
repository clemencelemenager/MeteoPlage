let weather = {
    
    // ========================================================
    // API Open Weather Map
    // ========================================================

    loadOpenWeatherMap: function(activateAPI, latitude,longitude) {
        if(activateAPI == true) {
            weather.fetchWeatherData(latitude,longitude)
            .then(function(data) {

                let weatherLiveDataSet = {
                    airTemp: Math.round(data.current.temp),
                    airTempFeelsLike: Math.round(data.current.feels_like),
                    weatherDescr: data.current.weather[0].description,
                    weatherIcon: data.current.weather[0].icon,
                    visibility: weather.getVisibilityText(data.current.visibility),
                    humidityRate: data.current.humidity,
                    UV: Math.round(data.current.uvi),
                    nextHours: data.hourly,
                }

                weather.displayCurrentWeather(weatherLiveDataSet);

                // let sunrise = app.getTime(data.current.sunrise);
                // let sunset  = app.getTime(data.current.sunset);
    
                // let weatherTodayDataSet = {
                //     airTemp: Math.round(data.daily[0].temp.day),
                //     weatherDescr: data.daily[0].weather[0].description,
                //     weatherIcon:weather.getWeatherIconUrl(data.daily[0].weather[0].icon),
                // }

                // let weatherTomorrowDataSet = {
                //     airTemp: Math.round(data.daily[1].temp.day),
                //     weatherDescr: data.daily[1].weather[0].description,
                //     weatherIcon:weather.getWeatherIconUrl(data.daily[1].weather[0].icon),
                // }
            });
        }
        else {
            let weatherLiveSampleDataSet = {
                airTemp: 20,
                airTempFeelsLike: 18,
                weatherDescr: "Nuageux",
                weatherIcon: "02n",
                visibility: weather.getVisibilityText(10000),
                humidityRate: 80,
                UV: Math.round(5),
                nextHours: [], 
            };
            weather.displayCurrentWeather(weatherLiveSampleDataSet);
            // display an alert message about sample data
            let messageHTML = "Attention : les données sont des exemples. Contactez l'administrateur pour activer les données réelles." 
            app.alertMessage(messageHTML);
        }
        
    },

    /**
     * API One Call from openweathermap
     * 
     * @see doc https://openweathermap.org/api/one-call-api
     * @param {integer} latitude 
     * @param {integer} longitude 
     */
    fetchWeatherData: function(latitude, longitude) {
        let endPoint = 'https://api.openweathermap.org/data/2.5/onecall?lang=fr&lat='+latitude+'&lon='+longitude+'&units=metric&appid='+api.getAPIKeyForOpenWeatherMap();

        // Set up configuration for HTTP request in fetch function
        let fetchOptions = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'
        };

        // Lauch HTTP request, convert result in json and display data
        let fetchResponse = fetch(endPoint,fetchOptions).then(function(response) {
            return response.json();
            })
        
        return fetchResponse;
    },


    // ========================================================
    // Display current weather
    // ========================================================

    /**
     * Display all live weather data
     * 
     * @param object dataSet 
     */
    displayCurrentWeather: function(dataSet) {
        weather.displayCurrentDescription(dataSet.weatherDescr); 
        weather.displayCurrentIcon(dataSet.weatherIcon);
        weather.displayCurrentTemperature(dataSet.airTemp);
        weather.displayCurrentTempFeelsLike(dataSet.airTempFeelsLike);
        weather.displayVisibility(dataSet.visibility);
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

