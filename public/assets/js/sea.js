let sea = {
    
    // ========================================================
    // API StormGlass Weather
    // ========================================================

    loadStormGlassWeather: function(latitude, longitude) {
            
        // API StormGlass Marine Weather
        // @see doc https://docs.stormglass.io/#/weather
        const params = [
                        'gust','precipitation','windDirection','windSpeed', 
                        'waterTemperature','waveHeight'
                        ].join(',');
        const source = 'sg';
        let endpoint = `https://api.stormglass.io/v2/weather/point?source=${source}&lat=${latitude}&lng=${longitude}&params=${params}`;

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

        // Lauch HTTP request, convert result in json and display data
        fetch(endpoint,fetchOptions)
            .then((response) => response.json())
            .then((data) => {

                // console.log(data);

                // Save values -------------------------------------------------------------------------

                // Prerequisite : get the current hour as index for the array data.hours
                let now     = new Date();
                let index   = now.getHours();

                // current data (live)
                let seaTemp     = Math.round(data.hours[index].waterTemperature.sg);
                let waveHeight  = sea.getWaveDescription(data.hours[index].waveHeight.sg);
                let windSpeed   = app.getKmhSpeed(data.hours[index].windSpeed.sg);
                let gust        = app.getKmhSpeed(data.hours[index].gust.sg);
                let windDegree  = data.hours[index].windDirection.sg;
                let windDir     = app.getCardinalDirection(windDegree);

                // Display in webpage -------------------------------------------------------------------------

                // current data (live)
                sea.displaySeaTemp(seaTemp);
                sea.displayWaveHeight(waveHeight);
                weather.displayCurrentWind(windSpeed);
                // Control : display gust only if > to windSpeed
                if(gust > windSpeed) {
                    weather.displayCurrentGust(gust);
                }
                weather.displayCurrentWindDirection(windDir)

            });
    },


    /**
     * Display current sea temperature in c°
     * 
     * @param integer seaTemperature 
     */
    displaySeaTemp: function(seaTemperature) {
        let seaTempContainer = document.querySelector(".sea-temperature span");
        seaTempContainer.textContent = seaTemperature;
    },

    /**
     * Display wave height
     * 
     * @param integer waveHeight in meters
     */
    displayWaveHeight: function(waveHeight) {
        let waveHeightContainer = document.querySelector(".sea-wave span");
        waveHeightContainer.textContent = waveHeight;
    },


    // ========================================================
    // API StormGlass Tide
    // ========================================================

    loadStormGlassTide: function(latitude, longitude) {

		// API StormGlass Tide
		// @see doc https://docs.stormglass.io/#/tide

		let endpoint = `https://api.stormglass.io/v2/tide/extremes/point?lat=${latitude}&lng=${longitude}`;

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

		// Lauch HTTP request, convert result in json and display data
		fetch(endpoint, fetchOptions)
			.then((response) => response.json())
			.then((data) => {

				console.log(data);

				// TODO
				// display current tide : status, type and hour 
				// afficher l'heure de la prochaine marée : 1er résultat où l'heure est > à maintenant
				const now = sea.getTideTimeFromDate(new Date())

				const tideExtremes = data.data;
				let nextTideExtremeIndex = 0;
				let match = false;
				let count = 0;
				
				// get next tide from now
				while (!match) {
					if (sea.getTideTimeFromDate(tideExtremes[count].time) > now) {
						nextTideExtremeIndex = count;
						match = true;
					}
					count = count +1;
				};

				// display next tide results
				sea.displayCurrentTide(tideExtremes[nextTideExtremeIndex].type);
				sea.displayNextTide(tideExtremes[nextTideExtremeIndex].type, tideExtremes[nextTideExtremeIndex].time);

				// display second tide : type and hour
				const secondTideExtremeIndex = nextTideExtremeIndex + 1;
				let secondTideType = tideExtremes[secondTideExtremeIndex].type;
				let secondTideHour = tideExtremes[secondTideExtremeIndex].time;
				sea.displaySecondTide(secondTideType, secondTideHour);

				// TODO : afficher le mareagramme avec focus sur l'heure actuelle

			});
	},
   

    /**
     * Display status of current tide
     * 
     * @param string tideType : french description of current tide (rising/falling)
     */
    displayCurrentTide: function(tideType) {
        let currentTideElement = document.querySelector(".currentTide-status");
        currentTideElement.textContent = sea.getTideStatus(tideType);
    },

    /**
     * Display the next tide : type (low/high) and time
     * 
     * @param string nextTideType translated in french
     * @param string nextTideHour converted in HH:mm
     */
    displayNextTide: function(nextTideType, nextTideHour) {

        let nextTideTypeContainer = document.querySelector(".nextTide-type");
        nextTideTypeContainer.textContent = sea.translateTideType(nextTideType); 

        let nextTideTimeContainer = document.querySelector(".nextTide-time");
        nextTideTimeContainer.textContent = sea.getTideTimeFromDate(nextTideHour); 
    },

    /**
     * Display the second next tide : type (low/high) and time
     * 
     * @param string secondTideType translated in french
     * @param string secondTideHour converted in HH:mm
     */
    displaySecondTide: function(secondTideType,secondTideHour) {

        let secondTideTypeContainer = document.querySelector(".secondTide-type");
        secondTideTypeContainer.textContent = sea.translateTideType(secondTideType); 

        let secondTideTimeContainer = document.querySelector(".secondTide-time");
        secondTideTimeContainer.textContent = sea.getTideTimeFromDate(secondTideHour); 

    },


    // ========================================================
    // Tide Chart
    // ========================================================

    
    /**
     * Treatment of the data to get only labels for the tide chart
     * 
     * @param array tideNextHours 
     * @return array labels
     */
    getChartLabels: function(tideNextHours) {
        
        // init array 
        let labels = [];

        // chartData contains tide details for next 24 hours 
        // for each index, get the hour number as a label for X axe
        for(const index in tideNextHours){
            let hour = app.getHour(tideNextHours[index].timestamp);
            labels.push(hour+"h");
        }
        return labels;
    },

    /**
     * Treatment of the data to get only values for the tide chart

     * @param array tideNextHours 
     * @return array heights
     */
    getTideHeights: function(tideNextHours) {

        // let chartData = tide.getSampleChartData();
        // init array 
        let heights = [];
        // chartData contains tide details for next 24 hours 
        // for each index, get the hour number as a label for X axe
        for(const index in tideNextHours){
            let height = tideNextHours[index].height;
            heights.push(height);
        }
        return heights;

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
        if(tideType == "high")      {return tideType = "haute"           ;}
        else if(tideType == "low")  {return tideType = "basse"           ;}
       
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
        if(tideType == "high")      {return "La mer monte";}
        else if(tideType == "low")  {return "La mer descend";}
       
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




    // ========================================================
    // API Tides
    // TODO - a supprimer - transfert API en cours
    // ========================================================


    /**
     * Display tides if API active
     * 
     * @param boolean activateAPI : load API (if true) or load sample data (if false)
     * 
     */
    loadTides: function(activateAPI) {

        // init variables
        let currentTide     = "";
        let nextTideType    = "";
        let nextTideHour    = "";
        let secondTideType  = "";
        let secondTideHour  = "";
        let tideNextHours   = {};

        // if activateAPI, load data from API
        if(activateAPI == true) {
            sea.fetchTidesData().then( function(data) {
                // console.log(data);
    
                // set values
                currentTide     = sea.translateTideType(data.heights[0].state);
                nextTideType    = sea.translateTideType(data.extremes[0].state);
                nextTideHour    = sea.getTideTimeFromUnix(data.extremes[0].timestamp);
                secondTideType  = sea.translateTideType(data.extremes[1].state);
                secondTideHour  = sea.getTideTimeFromUnix(data.extremes[1].timestamp);
                tideNextHours   = data.heights;

                tideDataSet     = {currentTide, nextTideType, nextTideHour, secondTideType, secondTideHour, tideNextHours};
                
                // display data on webpage
                sea.displayTideData(tideDataSet);
            });
        }

        // else, load sample data
        else {
            currentTide     = "La mer monte";
            nextTideType    = "haute";
            nextTideHour    = "22h04";
            secondTideType  = "basse";
            secondTideHour  = "05:34";
            tideNextHours   = sea.getSampleChartData();

            tideDataSet     = {currentTide, nextTideType, nextTideHour, secondTideType, secondTideHour, tideNextHours};

            // display data on webpage
            sea.displayTideData(tideDataSet);

            // display an alert message about sample data
            let messageHTML = "Attention : les données de marée sont des exemples. Contactez l'administrateur pour activer les données réelles." 
            app.alertMessage(messageHTML);
        }
    },

    /**
     * Get tides datas from API
     * ! LIMIT 100 REQUESTS PER MONTH
     * ! set your API Key
     */
    fetchTidesData: function() {
        // API Tides
        // @see https://rapidapi.com/apihood/api/tides/endpoints
        let endPoint = 'https://tides.p.rapidapi.com/tides?latitude=49.369682&longitude=-0.871084&interval=60&duration=1440&radius=10'

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
     * Get sample tide data for chart
     */
    getSampleChartData: function() {
        
        let chartData = {
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
        };
        return chartData;
    },


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



}