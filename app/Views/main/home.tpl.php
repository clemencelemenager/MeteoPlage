

<div class="container">

    <div class="page-section clearfix">

        <!-- section Intro -->
        <section class="synthesis">
            <div class="title">
                <h1>Omaha Beach</h1>
                <p class="mb-2">
                Météo & marée à Omaha Beach (14)
                </p>
            </div>
            <!-- <div class="marquee">
                Le moment idéal pour se baigner ! 
            </div> -->
        </section>

        <div class="alertMessage">
            <!-- app.alertMessage() -->
        </div>

        <div class="currentContent-container">

            <!-- section current Weather -->
            <section class="weather left-0 text-center">

                <div class ="weather__container">
                    
                    <!-- weather description -->
                    <div class="weather__content" id="wc1">
                        <div class="weather__picture">
                                <!-- load icon from API -->
                        </div>
                        <div class="weather__description">
                            <!-- load description from API -->
                        </div>
                    </div>
                
                    <!-- temperature -->
                    <div class="weather__content weather__temperature" id="wc2">
                            <div class="weather__temperature--Air">
                                <i class="fas fa-thermometer-half"></i>
                                <span>
                                    <!-- load temp from API-->
                                </span>° 
                            </div>
                            <div class="weather__temperature--Felt">
                                Ressenti 
                                <span>
                                    <!-- load temp from API-->
                                </span>°
                            </div>
                    </div>

                    <!-- rain -->
                    <div class="weather__content" id="wc3">
                        <div class="weather__content--rain">
                            <i class="fas fa-cloud-rain"></i>                                <span>
                            <!-- load from API -->
                            <span>- </span>
                        </div>
                    </div>

                    <!-- wind -->
                    <div class="weather__content" id="wc4">
                        <div class="weather__content--wind">
                            <div class="wind-normal">
                                <i class="fas fa-wind"></i>
                                <span>
                                    <!-- load from API -->
                                </span>
                            </div>
                            <div class="wind-max">
                                Rafales à
                                <span ></span>km/h
                            </div>
                        </div>
                        <div class="weather__content--windDir">
                            <i class="fas fa-location-arrow"></i>  
                            <span>
                                <!-- load from API -->
                            </span>
                        </div>
                    </div>

                </div>

            </section>

            <!-- section current Tide -->
            <section class="tide left-0 text-center">

                <!-- current tide's timetable -->
                <div class ="tide__container" id="tc1">

                    <div class="tide__currentTide">
                        <!-- load from API -->
                        <span class="currentTide-status">La mer monte</span>,
                         elle sera 
                        <span class="nextTide-type">haute</span>
                         à 
                        <span class="nextTide-time">22:05</span>
                    </div>

                    <div class="tide__nextTides">
                        <p class="tide__secondTide--title">
                            Prochaine marée 
                            <span class="secondTide-type">
                                <!-- load from API-->
                                basse
                            </span>
                            à 
                            <span class="secondTide-time">
                                <!-- load from API-->
                                08:05
                            </span>
                        </p>
                    </div>

                </div>

                <!-- sea informations -->
                <!-- * TODO *-->
                <div class ="tide__container" id="tc2">
                    <div class="sea__details sea-temperature">
                        <i class="fas fa-swimmer"></i>
                        12°
                    </div>
                    <div class="sea__details sea-wave">
                        <i class="fas fa-water"></i>
                        <span>-</span>
                    </div>
                    <div class="sea__details sea-visibility">
                        <i class="fas fa-ship"></i>
                        <span>-</span>
                    </div>
                </div>

            </section>


        </div>

        <div class="forecastContent-container">

            <!-- section forecast next hours -->
            <section class="forecast">

                <div class="forecast__title">
                    <p>Prévisons des prochaines heures </p>
                    <i class="fas fa-caret-down"></i>
                </div>

                <div class="forecast__content nodisplay">

                    <!-- forecast weather next 12hours --> 
                    <div class="forecast__content--weather">
                        <div class="forecast__weather--nextHours">
                            <div class="forecast--nextHours forecast0">
                                <div class ="forecast__weather--time">
                                    <!-- load from API-->
                                </div>    
                                <div class ="forecast__weather--icon">
                                    <!-- load from API-->
                                </div>
                                <div class ="forecast__weather--temp">
                                    <!-- load from API-->
                                </div>
                                <div class ="forecast__weather--wind">
                                <!-- load from API-->
                                </div>
                            </div>
                            <div class="forecast--nextHours forecast1">
                                <div class ="forecast__weather--time">
                                    <!-- load from API-->
                                </div>    
                                <div class ="forecast__weather--icon">
                                    <!-- load from API-->
                                </div>
                                <div class ="forecast__weather--temp">
                                    <!-- load from API-->
                                </div>
                                <div class ="forecast__weather--wind">
                                <!-- load from API-->
                                </div>
                            </div>  
                            <div class="forecast--nextHours forecast2">
                                <div class ="forecast__weather--time">
                                    <!-- load from API-->
                                </div>    
                                <div class ="forecast__weather--icon">
                                    <!-- load from API-->
                                </div>
                                <div class ="forecast__weather--temp">
                                    <!-- load from API-->
                                </div>
                                <div class ="forecast__weather--wind">
                                <!-- load from API-->
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- forecast tide evolution next 12hours (chart)--> 
                    <div class="forecast__content--tideChart">
                        <canvas id="myChart"></canvas>
                    </div>
                    
                </div>

                

            </section>
        </div>

       
       

    </div>
</div>

