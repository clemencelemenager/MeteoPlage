let app = {

     /**
     *  Init function 
     */ 
    init: function() {

        // Set latitud & longitud for Omaha Beach
        let latitude = 49.369682 ;
        let longitude = -0.871084;

        // ------------------------------------------
        // OLD DATA

        // // load weather datas from API
        // weather.loadCurrentWeather();
        // weather.loadForecastWeather();

        // load tide datas from API
        // ! API Tides limited to 100 requests/month
        // ! API default setting is inactive
        // ! Set true to activate API :
        let activateAPI = false;
        sea.loadTides(activateAPI);
        // ------------------------------------------


        // TODO --------------------------------------
        // NEW DATA

        // API Open Weather Map 
        // @see https://openweathermap.org/api/one-call-api

        weather.loadOpenWeatherMap(latitude,longitude);

        /// API StormGlass
        // ! API StormGlass limited to 50 calls/day
        sea.loadStormGlass(latitude, longitude);
        
        // add event listener
        app.seeForecast();

    }, 

   
    
    // ========================================================
    // Tools
    // ========================================================

    numAverage: function (array) {
        let total = 0;

        for (let i = 0; i < array.length; i++) {
            total += Number(array[i]);
        }
        return total/array.length;
    },


    /**
     * Convert speed from m/s to km/h
     * 
     * @param numb speed in m/s
     */
    getKmhSpeed: function (speed) {
        speed = Math.round(speed*3.6);
        return speed;
    },

    /** 
     * Get hour number from unix timestamp
     * 
     */
    getHour: function(unix) {
        let date = new Date(unix*1000);
        let hour = date.getHours();
        if (hour < 10) {
            hour="0"+ hour;
        }
        return hour;
    },

    /** 
     * Get hh:mm format from unix timestamp
     * 
     */
    getTime: function(unix) {

        let date = new Date(unix*1000);
        let hour = date.getHours();
        let minute = date.getMinutes();

        if (minute < 10) {
            minute="0"+ minute;
        }
         
        return hour + ":" + minute;
    },

    /**
     * Convert degrees in cardinal direction
     * 
     * @param number windDegree 
     */
    getCardinalDirection(windDegree) {

        // console.log(windDegree);
        
        if(windDegree >= 348.75 && windDegree < 11.25) {
            return "Nord";
        }
        else if(windDegree >= 11.25 && windDegree < 33.75) {
            return "Nord Nord-Est";
        }
        else if(windDegree >= 33.75 && windDegree < 56.25) {
            return "Nord-Est";
        }
        else if(windDegree >= 56.25 && windDegree < 78.75) {
            return "Est Nord-Est";
        }
        else if(windDegree >= 78.75 && windDegree < 101.25) {
            return "Est";
        }
        else if(windDegree >= 101.25 && windDegree < 123.75) {
            return "Est Sud-Est";
        }
        else if(windDegree >= 123.75 && windDegree < 146.25) {
            return "Sud-Est";
        }
        else if(windDegree >= 146.25 && windDegree < 168.75) {
            return "Sud Sud-Est";
        }
        else if(windDegree >= 168.75 && windDegree < 191.25) {
            return "Sud";
        }
        else if(windDegree >= 191.25 && windDegree < 213.75) {
            return "Sud Sud-Ouest";
        }
        else if(windDegree >= 213.75 && windDegree < 236.25) {
            return "Sud-Ouest";
        }
        else if(windDegree >= 236.25 && windDegree < 258.75) {
            return "Ouest Sud-Ouest";
        }
        else if(windDegree >= 258.75 && windDegree < 281.25) {
            return "Ouest";
        }
        else if(windDegree >= 281.25 && windDegree < 303.75) {
            return "Ouest Nord-Ouest";
        }
        else if(windDegree >= 303.75 && windDegree < 326.25) {
            return "Nord-Ouest";
        }
        else if(windDegree >= 326.25 && windDegree < 348.75) {
            return "Nord Nord-Ouest";
        }

    },

    /**
    * Add event listener on "see forecast" 
    */
    seeForecast: function() {
        let seeForecastElement = document.querySelector(".forecast__title");
        seeForecastElement.addEventListener('click', app.expandForecast);
    },

    /**
     * Expand forecast content (on/off)
     * Display weather and tide for next hours
     */
    expandForecast: function() {
        let forecastElement = document.querySelector(".forecast__content");
        forecastElement.classList.toggle('nodisplay');

    },

    /**
     * Display an alert message in webpage
     * 
     * @param string messageHTML : message to display
     */
    alertMessage: function(messageHTML) {

        // identify the container where to display the message
        let alertContainer = document.querySelector(".alertMessage");
        // add html to the container
        alertContainer.innerHTML = "<p>"+messageHTML+"</br><span class=\"alertMessage--close\">Ne plus afficher ce message</span></p>";

        // add event listener to close alert message
        let closeAlertMessage = document.querySelector(".alertMessage--close");
        closeAlertMessage.addEventListener('click', app.handleCloseAlertMessage);

    },

    /**
     * Remove alert message 
     */
    handleCloseAlertMessage: function() {
        let alertMessage = document.querySelector(".alertMessage");
        alertMessage.classList.add('nodisplay');
    },





}


// Call init when page ready
document.addEventListener('DOMContentLoaded', app.init);

