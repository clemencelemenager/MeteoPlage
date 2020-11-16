

<div class="container">

    <div class="page-section clearfix">

        <!-- section Intro -->
        <section class="synthesis">
            <div class="title">
                <h1>Omaha Beach</h1>
                <p class="mb-4">
                Météo & marée à Omaha Beach (14)
                </p>
            </div>
            <div class="marquee bg-info py-2">
            <span class="text-white text-center">
                Le moment idéal pour se baigner ! 
            </span>
            </div>
        </section>

        <div class="currentContent-container">

            <!-- section current Weather -->
            <section class="weather left-0 text-center">

                <div class ="weather__container">
                    
                    <div class="weather__content">
                        <div class="weather__picture">
                                <!-- load icon from API -->
                        </div>
                        <div class="weather__description">
                            <!-- load description from API -->
                        </div>
                    </div>
                
                    <div class="weather__content">
                        <div class="weather__temperature">
                            <div class="weather__temperature--Air">
                                <i class="fas fa-thermometer-half"></i>
                                <span>
                                    <!-- load temp from API-->
                                </span>° 
                            </div>
                            <div class="weather__temperature--Sea">
                                <i class="fas fa-water"></i>
                                <span>13</span>°
                            </div>
                            
                        </div>
                        <div class="weather__content--wind">
                            <i class="fas fa-wind"></i>
                            <span>
                                <!-- load from API -->
                            </span>
                        </div>


                    </div>
                </div>

            </section>


            <!-- section current Tide -->
            <section class="tide left-0 text-center">

                <div class ="tide__container">

                    <div class="tide__currentTide">
                        <!-- load from API -->
                        La mer monte !
                    </div>
                    <div class="tide__nextTides">
                        <p class="tide__nextTide--title">
                            Prochaine marée 
                            <span class="nextTide-type">
                                <!-- load from API-->
                                haute
                            </span>
                            à 
                            <span class="nextTide-time">
                                <!-- load from API-->
                                22:05
                            </span>
                        </p>
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
                            <div class="forecast0">
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
                            <div class="forecast1">
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
                            <div class="forecast2">
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

