

<div class="container">

    <div class="page-section clearfix">

        <!-- section Intro -->
        <section class="synthesis">
            <div class="title">
                <h1>
                    <i class="fas fa-map-marker-alt"></i>
                    Omaha Beach
                </h1>
            </div>
            <!-- <div class="marquee">
                Le moment idéal pour se baigner ! 
            </div> -->
        </section>

        <div class="alertMessage nodisplay">
            <!-- app.alertMessage() -->
        </div>

        <div class="flexContainer">

            <!-- section current Weather -->
            <section class="weather">
                    
                <!-- weather description -->
                <div class="bloc__content bloc__content--primary" id="weather__description">
                    <div class="weather__description--picture">
                            <!-- load icon from API -->
                    </div>
                    <div class="weather__description--text">
                        <!-- load description from API -->
                    </div>
                </div>
            
                <!-- temperature -->
                <div class="bloc__content bloc__content--primary" id="weather__temperature">
                    <div class="weather__temperature--air data--important">
                        <i class="fas fa-thermometer-half"></i>
                        <span>
                            <!-- load temp from API-->
                        </span>° 
                    </div>
                    <div class="weather__temperature--felt data--additionnal">
                        Ressenti : 
                        <span class="dataWithLabel">
                            <!-- load temp from API-->
                        </span>°
                    </div>
                </div>

                <!-- wind -->
                <div class="bloc__content bloc__content--primary" id="weather__wind">
                    <div class="weather__wind--speed">
                        <div class="wind--speed-normal data--important">
                            <i class="fas fa-wind"></i>
                            <span>
                                <!-- load from API -->
                            </span>
                        </div>
                        <!-- <div class="data--additionnal wind--speed-gust">
                        </div> -->
                    </div>
                    <div class="weather__wind--direction">
                        <i class="fas fa-location-arrow"></i>  
                        <span>
                            <!-- load from API -->
                        </span>
                    </div>
                </div>

            </section>

            <!-- section current Tide -->
            <section class="sea">

                <!-- current tide's timetable -->
                <div class ="bloc__content bloc__content--tide" id="sea-tide">

                    <div class="sea__tide--live">
                        <!-- load from API -->
                        <span class="tide--live-movement">
                            <!-- load from API-->
                        </span>,
                         elle sera 
                        <span class="tide--live-type">
                            <!-- load from API-->
                        </span>
                         à 
                        <span class="tide--live-time">
                            <!-- load from API-->
                        </span>
                    </div>

                    <div class="sea__tide--next">
                        <div class="tide--next-title">
                            Prochaine marée 
                            <span class="tide--next-type">
                                <!-- load from API-->
                            </span>
                            à 
                            <span class="tide--next-time">
                                <!-- load from API-->
                            </span>
                        </div>
                    </div>

                </div>

                <!-- sea informations -->
                <div class="bloc__content bloc__content--primary marineWeather marineWeather--seaTemperature data--important">
                    <i class="fas fa-swimmer"></i>
                    <span>
                        <!-- load from API-->
                    </span>° 
                </div>
                <div class="bloc__content bloc__content--primary marineWeather marineWeather--wave">
                    <i class="fas fa-water"></i>
                    <span>
                        <!-- load from API-->
                    </span>
                </div>
                <div class="bloc__content bloc__content--primary marineWeather marineWeather--visibility">
                    <i class="fas fa-eye"></i>
                        <span>
                            <!-- load from API-->
                        </span>
                </div>
                   

            </section>


        </div>

    
       
       

    </div>
</div>

