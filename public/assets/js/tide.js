let tide = {
    
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
            tide.fetchTidesData().then( function(data) {
                // console.log(data);
    
                // set values
                currentTide     = tide.translateTideType(data.heights[0].state);
                nextTideType    = tide.translateTideType(data.extremes[0].state);
                nextTideHour    = tide.getTideTime(data.extremes[0].timestamp);
                secondTideType  = tide.translateTideType(data.extremes[1].state);
                secondTideHour  = tide.getTideTime(data.extremes[1].timestamp);
                tideNextHours   = data.heights;

                tideDataSet     = {currentTide, nextTideType, nextTideHour, secondTideType, secondTideHour, tideNextHours};
                
                // display data on webpage
                tide.displayTideData(tideDataSet);
            });
        }

        // else, load sample data
        else {
            currentTide     = "La mer monte";
            nextTideType    = "haute";
            nextTideHour    = "22h04";
            secondTideType  = "basse";
            secondTideHour  = "05:34";
            tideNextHours   = tide.getSampleChartData();

            tideDataSet     = {currentTide, nextTideType, nextTideHour, secondTideType, secondTideHour, tideNextHours};

            // display data on webpage
            tide.displayTideData(tideDataSet);

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
     * Display all tide datas on webpage
     * 
     * @param object tideDataSet 
     */
    displayTideData: function(tideDataSet) {
        tide.displayCurrentTide(tideDataSet.currentTide);
        tide.displayNextTide(tideDataSet.nextTideType, tideDataSet.nextTideHour);
        tide.displaySecondTide(tideDataSet.secondTideType,tideDataSet.secondTideHour)
        tide.loadTideChart(tideDataSet.tideNextHours);
    },

    /**
     * Display status of current tide
     * 
     * @param string tideType : french description of current tide (rising/falling)
     */
    displayCurrentTide: function(tideType) {
        let currentTideElement = document.querySelector(".currentTide-status");
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
    // Tide Chart
    // ========================================================

    /**
     * Display chart to represent tides for next hours
     * 
     */
    loadTideChart: function(tideNextHours) {

        var ctx = document.getElementById('myChart');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: tide.getChartLabels(tideNextHours),
                datasets: [{
                    label: null,
                    data: tide.getTideHeights(tideNextHours),
                    borderColor: 'rgba(255, 255, 255,1)',
                    borderWidth: 2,
                    pointRadius: 0,
                    borderCapStyle : "round",
                    fill: false,                    
                }]
            },
            options: {
                legend: {
                    display: false,
                },
                title: {
                    display:true,
                    text:'Hauteur de marée à venir',
                    position:'top',
                    fontSize:16,
                    fontColor: '#fff',
                    responsive: true,
                }
            }
        });
    },

   
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
        if(tideType == "HIGH TIDE") {return tideType = "haute"           ;}
        if(tideType == "LOW TIDE")  {return tideType = "basse"           ;}
        if(tideType == "RISING")    {return tideType = "La mer monte"   ;}
        if(tideType == "FALLING")   {return tideType = "La mer descend" ;}
        
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

}