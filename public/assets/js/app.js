let app = {

     /**
     *  Init function 
     */ 
    init: function() {

        // Set latitud & longitud for Omaha Beach
        let lat = 49.369682 ;
        let long = -0.871084;

        // load weather datas from API
        weather.loadCurrentWeather();
        weather.loadForecastWeather();

        // load tide datas from API
        // ! API Tides limited to 100 requests/month
        // ! API default setting is inactive
        // ! Set true to activate API :
        let activateAPI = false;
        tide.loadTides(activateAPI);
        
        // add event listener
        app.seeForecast();

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
     * Convert degrees in cardinal direction
     * 
     * @param number windDegree 
     */
    getCardinalDirection(windDegree) {
        if(windDegree => 348.75 && windDegree < 11.25) {
            return "Nord";
        }
        if(windDegree => 11.25 && windDegree < 33.75) {
            return "Nord Nord-Est";
        }
        if(windDegree => 33.75 && windDegree < 56.25) {
            return "Nord-Est";
        }
        if(windDegree => 56.25 && windDegree < 78.75) {
            return "Est Nord-Est";
        }
        if(windDegree => 78.75 && windDegree < 101.25) {
            return "Est";
        }
        if(windDegree => 101.25 && windDegree < 123.75) {
            return "Est Sud-Est";
        }
        if(windDegree => 123.75 && windDegree < 146.25) {
            return "Sud-Est";
        }
        if(windDegree => 146.25 && windDegree < 168.75) {
            return "Sud Sud-Est";
        }
        if(windDegree => 168.75 && windDegree < 191.25) {
            return "Sud";
        }
        if(windDegree => 191.25 && windDegree < 213.75) {
            return "Sud Sud-Ouest";
        }
        if(windDegree => 213.75 && windDegree < 236.25) {
            return "Sud-Ouest";
        }
        if(windDegree => 236.25 && windDegree < 258.75) {
            return "Ouest Sud-Ouest";
        }
        if(windDegree => 258.75 && windDegree < 281.25) {
            return "Ouest";
        }
        if(windDegree => 281.25 && windDegree < 303.75) {
            return "Ouest Nord-Ouest";
        }
        if(windDegree => 303.75 && windDegree < 326.25) {
            return "Nord-Ouest";
        }
        if(windDegree => 326.25 && windDegree < 348.75) {
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

