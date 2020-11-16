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
        //! API Tides limited to 100 requests/month
        // tide.loadTides();

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

        tide.loadTideChart();

    },





}


// Call init when page ready
document.addEventListener('DOMContentLoaded', app.init);

