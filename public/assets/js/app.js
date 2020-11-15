let app = {

     /**
     *  Init function 
     */ 
    init: function() {

        // console.log('function app.init');

        // Set latitud & longitud for Omaha Beach
        let lat = 49.369682 ;
        let long = -0.871084;

        // collect datas from API
        weather.loadCurrentWeather();
        weather.loadForecastWeather();
        //! API Tides limited to 100 requests/month
        // tide.loadTides();

        // add event listener
        weather.listenSeeForecast();

    },    

}


// Call init when page ready
document.addEventListener('DOMContentLoaded', app.init);

