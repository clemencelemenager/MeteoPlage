let weather = {

    displayWeatherDescription: function(description) {

        let descriptionElement = document.querySelector(".weather__description");
        descriptionElement.textContent = description;
    },

    displayWeatherIcon: function(icon) {

        let iconURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";

        let iconElement = document.createElement("img");
        iconElement.setAttribute("src",iconURL);

        let iconContainer = document.querySelector(".weather__picture");
        iconContainer.appendChild(iconElement);
    },
    
    displayWeatherTemperature: function(temperature) {
        let temperatureElement = document.querySelector(".weather__temperature--Air");
        temperatureElement.textContent = temperature;


    },

    displayWeatherWind: function (windSpeed,windDirection) {

        // convert windSpeed from m/s to km/h
        windSpeed = weather.getKmhSpeed(windSpeed);
        // display in webpage
        let windSpeedElement = document.querySelector(".weather__content--wind .speed");
        windSpeedElement.textContent = windSpeed;

        // get cardinal point for wind direction
        windDirection = weather.getCardinalDirection(windDirection);
        // display in webpage
        let windDirectionElement = document.querySelector(".weather__content--wind .direction");
        windDirectionElement.textContent = windDirection;

    },

    getKmhSpeed(speed) {
        speed = Math.round(speed*3.6);
        return speed;
    },

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



}

