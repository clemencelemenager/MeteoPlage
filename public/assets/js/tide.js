let tide = {
    
    /**
     * Display tides 
     */
    loadTides: function() {

        tide.fetchTidesData().then( function(data) {
            console.log(data);

            // set values
            let currentTide         = tide.translateTideType(data.heights[0].state);
            let nextTideType        = tide.translateTideType(data.extremes[0].state);
            let nextTideHour        = tide.getTideTime(data.extremes[0].timestamp);
            let secondTideType   = tide.translateTideType(data.extremes[1].state);
            let secondTideHour   = tide.getTideTime(data.extremes[1].timestamp);

      
            // display on webpage
            tide.displayCurrentTide(currentTide);
            tide.displayNextTide(nextTideType, nextTideHour);
            tide.displaySecondTide(secondTideType,secondTideHour)

        });
    },

    /**
     * Get tides datas from API
     * ! set your API Key
     */
    fetchTidesData: function() {
        // API Tides
        // @see https://rapidapi.com/apihood/api/tides/endpoints
        let endPoint = 'https://tides.p.rapidapi.com/tides?latitude=49.369682&longitude=-0.871084&interval=60&duration=1440&radius=10'

        // ! LIMIT 100 REQUESTS PER MONTH
        let fetchOptions = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            "headers": {
                "x-rapidapi-key": api.getTidesAPIKey(),
                "x-rapidapi-host": "tides.p.rapidapi.com"
            }
        };

        let fetchResponse = fetch(endPoint,fetchOptions).then(function(response) {
            return response.json();
            })
        
        return fetchResponse;
    },

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


    // ========================================================
    // Tools
    // ========================================================


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