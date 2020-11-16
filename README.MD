# GoToBeach

Display weather and tide at the beach (default location : Omaha Beach)

## Getting started

### Install Composer on the project's root folder

Composants specified in composer.json will be deployed 

```shell
composer install
```

### Set your API keys

Here are the API used in project :

- **Tides** : timetable for tides 

Free plan limited to 100 calls / month - [API doc]('https://rapidapi.com/apihood/api/tides/endpoints')

> Change API key in endpoint url of following function :
> ```js
> tide.fetchTidesData()
> ```

- **Open Weather Map** : current and forecast weather 
  
Free plan limited to 1M calls / month - [API doc]("https://openweathermap.org/api")

> Change API key in endpoint url of following functions :
> ```js
> weather.fetchCurrentWeatherData()
> weather.fetchForecastWeatherData()
> ```
