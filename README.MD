# MétéoPlage

Display live weather and tides at the beach.

For now, default location is my favorite : Omaha Beach (Normandy, France). An input to set location is to come soon!

## Getting started

### Install Composer on the project's root folder

```shell
$ composer install
```

### Set your API keys

Rename the `api.js.dist` file into `api.js` after editing with your API keys (folder `public/assets/js/`)

Here are the API used in project :

- **Tides** : Timetable for tides
  - Free plan limited to 100 calls / month 
  - [API documentation](https://rapidapi.com/apihood/api/tides/endpoints)

- **StormGlass Weather** : Marine weather
  - Free plan limited to 50 calls / day 
  - [API documentation](https://docs.stormglass.io/#/weather)

- **Open Weather Map** : Live weather
  - Free plan limited to 1M calls / month 
  - [API documentation](https://openweathermap.org/api)

### Activate API

Given the limited calls for API in free plan, the request to API can be desactivated for tests. When not activated, it loads some sample data for the display.

To activate API, set *true* to activateAPI in app.init().

## About code

The website is single page in this first version but it has a structure **PHP MVC** with a **router** and it is planed to add other pages.

All interactions with **API** and the display of weather & tides elements are for now in **vanillaJS**. Actually learning **React**, I foresee to migrate a whole new version in React in  2021!

I prioritize **User eXperience** in every web project. The User Interface has been designed **mobile-first** and focused on informations the user has come to seek. I used [Bootstrap]("https://getbootstrap.com/") for navbar and customized css with [SASS](https://sass-lang.com/) preprocessor. I used icons from [Font-awesome]("http://fontawesome.io") library.
