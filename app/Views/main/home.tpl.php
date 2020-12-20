

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

        <div class="alertMessage nodisplay">
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

                    <!-- wind -->
                    <div class="weather__content" id="wc4">
                        <div class="weather__content--wind">
                            <div class="wind-normal">
                                <i class="fas fa-wind"></i>
                                <span>
                                    <!-- load from API -->
                                </span>
                            </div>
                            <!-- <div class="wind-max">
                            </div> -->
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
                <div class ="sea__container" id="sc1">

                    <div class="tide__currentTide">
                        <!-- load from API -->
                        <span class="currentTide-status">
                            <!-- load from API-->
                        </span>,
                         elle sera 
                        <span class="nextTide-type">
                            <!-- load from API-->
                        </span>
                         à 
                        <span class="nextTide-time">
                            <!-- load from API-->
                        </span>
                    </div>

                    <div class="tide__nextTides">
                        <p class="tide__secondTide--title">
                            Prochaine marée 
                            <span class="secondTide-type">
                                <!-- load from API-->
                            </span>
                            à 
                            <span class="secondTide-time">
                                <!-- load from API-->
                            </span>
                        </p>
                    </div>

                </div>

                <!-- sea informations -->
                <div class ="sea__container" id="sc2">
                    <div class="sea__details sea-temperature">
                        <i class="fas fa-swimmer"></i>
                        <span>
                            <!-- load from API-->
                        </span>° 
                    </div>
                    <div class="sea__details sea-wave">
                        <i class="fas fa-water"></i>
                        <span>
                            <!-- load from API-->
                        </span>
                    </div>
                    <div class="sea__details sea-visibility">
                    <i class="fas fa-eye"></i>
                        <span>
                            <!-- load from API-->
                        </span>
                    </div>
                   
                </div>

            </section>


        </div>

    
       
       

    </div>
</div>

