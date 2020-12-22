let sea = {
    
    // ========================================================
    // API StormGlass Weather
    // ========================================================

    loadStormGlassWeather: function(activateAPI, latitude, longitude) {
        if(activateAPI == true) {
            sea.fetchMarineWeatherData(latitude,longitude)

            .then((data) => {
                // console.log(data);
        
                // Warning console about remaining API calls (max 50/day)
                if (data.meta.requestCount >= 40){
                    console.warn("Nb d'appels API StormGlass restants aujourd'hui: ",data.meta.dailyQuota - data.meta.requestCount)
                };

                // Prerequisite : get the current hour as index for the array data.hours
                let now     = new Date();
                let index   = now.getHours();

                // current data (live)
                let marineWeatherDataSet  = {
                    seaTemp: Math.round(data.hours[index].waterTemperature.sg),
                    waveHeight: data.hours[index].waveHeight.sg,
                    windSpeed: app.getKmhSpeed(data.hours[index].windSpeed.sg),
                    gust: app.getKmhSpeed(data.hours[index].gust.sg),
                    windDegree: data.hours[index].windDirection.sg,
                };
                sea.displayMarineWeatherData(marineWeatherDataSet);
            })
            .catch(error => {
                // console.log(error);
                sea.loadSampleDataForMarineWeather();
            });
        }
        else {
            sea.loadSampleDataForMarineWeather();
        }
    },

    /**
     * API StormGlass Marine Weather
     * @see doc https://docs.stormglass.io/#/weather
     * 
     * @param {integer} latitude 
     * @param {integer} longitude 
     */
    fetchMarineWeatherData: function (latitude,longitude) {
        const params = [
            'gust','precipitation','windDirection','windSpeed', 
            'waterTemperature','waveHeight'
            ].join(',');
        const source = 'sg';
        let endPoint = `https://api.stormglass.io/v2/weather/point?source=${source}&lat=${latitude}&lng=${longitude}&params=${params}`;

        // Set up configuration for HTTP request in fetch function
        let fetchOptions = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
            // Get your key by signing up.
            'Authorization': api.getAPIStormGlass()
            }
        };
        let fetchResponse = fetch(endPoint,fetchOptions).then(function(response) {
            return response.json();
            })
        
        return fetchResponse;
    },

    /** 
     * Load sample data instead of StormGlass API data
     * 
     * (API desactivated for tests or error from API)
     */
    loadSampleDataForMarineWeather: function() {
        let marineWeatherSampleDataSet = {
            seaTemp: 15,
            waveHeight: 0,
            windSpeed: 5,
            gust: 10,
            windDegree: 150,
        };
        sea.displayMarineWeatherData(marineWeatherSampleDataSet);

        // display an alert message about sample data
        let messageHTML = "Attention : les données sont des exemples. Contactez l'administrateur pour activer les données réelles." 
        app.alertMessage(messageHTML);
    },

    // ========================================================
    // Display Marine Weather data
    // ========================================================

    /**
     * Display all marine weather data in webpage 
     * Sea temperature, wave, wind
     * 
     * @param object data set
     */
    displayMarineWeatherData: function (seaDataSet) {
        sea.displaySeaTemp(seaDataSet.seaTemp);
        sea.displayWaveHeight(seaDataSet.waveHeight);
        sea.displayCurrentWindDirection(seaDataSet.windDegree);
        sea.displayCurrentWind(seaDataSet.windSpeed);

        // Control : display gust only if > to windSpeed
        if(seaDataSet.gust > seaDataSet.windSpeed) {
            sea.displayCurrentGust(seaDataSet.gust);
        }
    },

    /**
     * Display current sea temperature in c°
     * 
     * @param integer seaTemperature 
     */
    displaySeaTemp: function(seaTemperature) {
        let seaTempContainer = document.querySelector(".marineWeather--seaTemperature span");
        seaTempContainer.textContent = seaTemperature;
    },

    /**
     * Display wave height
     * 
     * @param integer waveHeight in meters
     */
    displayWaveHeight: function(waveHeight) {
        let waveHeightContainer = document.querySelector(".marineWeather--wave span");
        waveHeightContainer.textContent = sea.getWaveDescription(waveHeight);
    },

    /**
     * Display current wind 
     * 
     * @param number windSpeed : speed in kmh
     */
    displayCurrentWind: function (windSpeed) {

        let windContainer = document.querySelector(".wind--speed-normal span");
        windContainer.textContent = windSpeed+"km/h ";
    },

    /**
    * Display current wind direction
    *
    * @param integer windDegree
    */
    displayCurrentWindDirection: function(windDegree) {
        let windDirContainer = document.querySelector('.weather__wind--direction span');
        windDirContainer.textContent = app.getCardinalDirection(windDegree);
    },

    /**
     * Display current gust (max wind)
     * 
     * @param number gust : speed in kmh
     */
    displayCurrentGust: function (gust) {
        let gustContainer = document.querySelector(".weather__wind--speed");
        let gustElement = document.createElement('div');
        gustElement.classList.add('wind--speed-gust');
        gustElement.classList.add('data--additionnal');
        gustElement.textContent = "Rafales à "+gust+"km/h";
        gustContainer.appendChild(gustElement);
    },


    // ========================================================
    // API Tides
    // ========================================================

    /**
     * Display tides if API active
     * 
     * @param boolean activateAPI : load API (if true) or load sample data (if false)
     * @param integer latitude
     * @param integer longitude

     */
    loadTides: function(activateAPI, latitude, longitude) {

        // if activateAPI, load data from API
        if(activateAPI == true) {
            sea.fetchTidesData(latitude, longitude).then( function(data) {
                // console.log(data);
                
                let tideDataSet = {
                    currentTide: sea.getTideStatus(data.heights[0].state),
                    nextTideType: sea.translateTideType(data.extremes[0].state),
                    nextTideHour: sea.getTideTimeFromUnix(data.extremes[0].timestamp),
                    secondTideType: sea.translateTideType(data.extremes[1].state),
                    secondTideHour: sea.getTideTimeFromUnix(data.extremes[1].timestamp),
                    tideNextHours: data.heights,
                };

                sea.displayTideData(tideDataSet);
            })
            .catch(error => {
                // console.log(error);
                sea.loadSampleDataForTides();
            });
        }
        else {
            sea.loadSampleDataForTides();
        }
    },

    /**
     * Get tides datas from API
     * 
     */
    fetchTidesData: function(latitude, longitude) {
        // API Tides
        // @see https://rapidapi.com/apihood/api/tides/endpoints
        let endPoint = `https://tides.p.rapidapi.com/tides?latitude=${latitude}&longitude=${longitude}&interval=60&duration=1440&radius=10`

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
     * Load sample data instead of Tides API data
     * 
     * (API desactivated for tests or error from API)
     */
    loadSampleDataForTides: function() {
        tideSampleDataSet  = {
            currentTide: "La mer monte",
            nextTideType: "haute",
            nextTideHour: "22h04",
            secondTideType: "basse",
            secondTideHour: "05:34",
            tideNextHours: sea.getSampleTides(),
        };
        sea.displayTideData(tideSampleDataSet);

        // display an alert message about sample data
        let messageHTML = "Attention : les données sont des exemples. Contactez l'administrateur pour activer les données réelles." 
        app.alertMessage(messageHTML);
    },


    // ========================================================
    // Display tides data
    // ========================================================

    /**
     * Display all tide datas on webpage
     * 
     * @param object tideDataSet 
     */
    displayTideData: function(tideDataSet) {
        sea.displayCurrentTide(tideDataSet.currentTide);
        sea.displayNextTide(tideDataSet.nextTideType, tideDataSet.nextTideHour);
        sea.displaySecondTide(tideDataSet.secondTideType,tideDataSet.secondTideHour)
    },

    /**
     * Display status of current tide
     * 
     * @param string tideType : french description of current tide (rising/falling)
     */
    displayCurrentTide: function(tideType) {
        let currentTideElement = document.querySelector(".tide--live-movement");
        currentTideElement.textContent = tideType;
    },

    /**
     * Display the next tide : type (low/high) and time
     * 
     * @param string nextTideType translated in french
     * @param string nextTideHour converted in HH:mm
     */
    displayNextTide: function(nextTideType, nextTideHour) {

        let nextTideTypeContainer = document.querySelector(".tide--live-type");
        nextTideTypeContainer.textContent = nextTideType; 

        let nextTideTimeContainer = document.querySelector(".tide--live-time");
        nextTideTimeContainer.textContent = nextTideHour; 
    },

    /**
     * Display the second next tide : type (low/high) and time
     * 
     * @param string secondTideType translated in french
     * @param string secondTideHour converted in HH:mm
     */
    displaySecondTide: function(secondTideType,secondTideHour) {

        let secondTideTypeContainer = document.querySelector(".tide--next-type");
        secondTideTypeContainer.textContent = secondTideType; 

        let secondTideTimeContainer = document.querySelector(".tide--next-time");
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
        if(tideType == "HIGH TIDE")      {return tideType = "haute"           ;}
        else if(tideType == "LOW TIDE")  {return tideType = "basse"           ;}
       
        else {
            return tideType = "NC";
        }
    },

    /**
     * Get tide status depending of tide type
     * 
     * @param string tideType : tide low or high
     */
    getTideStatus: function(tideType){
        if(tideType == "RISING")      {return "La mer monte";}
        else if(tideType == "FALLING")  {return "La mer descend";}
       
        else {
            return tideType = "NC";
        }
    },

    /** 
     * Get hh:mm format from unix timestamp
     * 
     */
    getTideTimeFromUnix: function(unix) {

        let date = new Date(unix*1000);
        let hour = date.getHours();
        let minute = date.getMinutes();

        if (minute < 10) {
            minute="0"+ minute;
        }
         
        return hour + ":" + minute;
    },

    /** 
     * Get hh:mm format from date
     * 
     */
    getTideTimeFromDate: function(date) {
        let time = new Date(date);
        let hour = time.getHours();
        let minute = time.getMinutes();

        if (hour < 10) {
            hour="0"+ hour;
        }

        if (minute < 10) {
            minute="0"+ minute;
        }
         
        return hour + ":" + minute;
    },


    /**
     * Display a description of sea depending of the wave height
     */
    getWaveDescription:function (waveHeight) {

        if( waveHeight < 0.5) {
            return "Mer calme";
        }
        if( waveHeight >= 0.5 && waveHeight < 1) {
            return "Mer agitée";
        }
        if( waveHeight >= 1 && waveHeight < 2) {
            return "Mer très agitée !";
        }
        if (waveHeight >= 2) {
            return "Wahou c'est la tempête!";
        }
    },


    /**
     * Get sample tide data 
     */
    getSampleTides: function() {
        
        return {
            0: {timestamp: 1605462966, datetime: "2020-11-15T17:56:06+00:00", height: -1.0075273508763711, state: "RISING"},
            1: {timestamp: 1605466566, datetime: "2020-11-15T18:56:06+00:00", height: 1.3282136010455832, state: "RISING"},
            2: {timestamp: 1605470166, datetime: "2020-11-15T19:56:06+00:00", height: 2.7711124808243794, state: "RISING"},
            3: {timestamp: 1605473766, datetime: "2020-11-15T20:56:06+00:00", height: 3.1760213745839456, state: "RISING"},
            4: {timestamp: 1605477366, datetime: "2020-11-15T21:56:06+00:00", height: 3.075157430072668, state: "FALLING"},
            5: {timestamp: 1605480966, datetime: "2020-11-15T22:56:06+00:00", height: 2.632354240421295, state: "FALLING"},
            6: {timestamp: 1605484566, datetime: "2020-11-15T23:56:06+00:00", height: 1.5428480707252064, state: "FALLING"},
            7: {timestamp: 1605488166, datetime: "2020-11-16T00:56:06+00:00", height: -0.11059584574574294, state: "FALLING"},
            8: {timestamp: 1605491766, datetime: "2020-11-16T01:56:06+00:00", height: -1.7617573325279117, state: "FALLING"},
            9: {timestamp: 1605495366, datetime: "2020-11-16T02:56:06+00:00", height: -3.0744115196055657, state: "FALLING"},
            10: {timestamp: 1605498966, datetime: "2020-11-16T03:56:06+00:00", height: -3.861516255952961, state: "FALLING"},
            11: {timestamp: 1605502566, datetime: "2020-11-16T04:56:06+00:00", height: -3.5715966729537225, state: "RISING"},
        };;
    },


   

}