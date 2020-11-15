let tide = {

    /**
     * Display status of current tide
     * 
     * @param string tideType : french description of current tide (rising/falling)
     */
    displayCurrentTide: function(tideType) {
        let currentTideElement = document.querySelector(".tide__currentTide");
        currentTideElement.textContent = tideType;
    },

    /**
     * Display the next tide : type (low/high) and time
     * 
     * @param string nextTideType translated in french
     * @param string nextTideHour converted from unix in HH:mm
     */
    displayNextTide: function(nextTideType, nextTideHour) {

        let nextTideTypeContainer = document.querySelector(".nextTide-type");
        nextTideTypeContainer.textContent = nextTideType; 

        let nextTideTimeContainer = document.querySelector(".nextTide-time");
        nextTideTimeContainer.textContent = nextTideHour; 
    },

    /**
     * Display the second next tide : type (low/high) and time
     * 
     * @param string secondTideType translated in french
     * @param string secondTideHour onverted from unix in HH:mm
     */
    displaySecondTide: function(secondTideType,secondTideHour) {

        let secondTideTypeContainer = document.querySelector(".secondTide-type");
        secondTideTypeContainer.textContent = secondTideType; 

        let secondTideTimeContainer = document.querySelector(".secondTide-time");
        secondTideTimeContainer.textContent = secondTideHour; 

    },

    // --------------------------------------------------------
    // Tools
    // --------------------------------------------------------


    /**
     * Translate tide information in french
     * 
     * @param string tideType : data transmitted in english from API
     */
    translateTideType: function(tideType) {
        if(tideType == "HIGH TIDE") {return tideType = "haute"           ;}
        if(tideType == "LOW TIDE")  {return tideType = "basse"           ;}
        if(tideType == "RISING")    {return tideType = "La mer monte!"   ;}
        if(tideType == "FALLING")   {return tideType = "La mer descend!" ;}
        
        else {
            return tideType = "NC";
        }
    },

    /** 
     * Get hh:mm format from unix timestamp
     * 
     */
    getTideTime: function(unix) {

        let date = new Date(unix*1000);
        let hour = date.getHours();
        let minute = date.getMinutes();

        if (minute < 10) {
            minute="0"+ minute;
        }
         
        return hour + ":" + minute;
    },

}