/**
 * Created by VEDANT KASHYAP on 5/12/2017.
 */

var location;
var weather = {};

function getWeather(latitude, longitude) {
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=b46f90d08c01a76edf575793b41a79bc",
        function (weatherData) {
            weather["conditions"] = weatherData.weather[0].description;
            weather["temperature"] = Math.ceil(weatherData.main["temp"] - 273);
            $("#conditions").html(weatherData.weather[0].description);
            $("#conditions").fadeIn(700);
            $("#temperature").html(weather.temperature + "<a id='celsius' onclick='displayFarenheight()'>°C</a>");
            $("#temperature").fadeIn(700);
        });
}

function displayFarenheight() {
    weather["temperature"] = Math.ceil(weather["temperature"] * 1.8 + 32);
    $("#temperature").html(weather["temperature"] + "<a id='farenheight' onclick='displayCelsius()'>°F</a>");
}

function displayCelsius() {
    weather["temperature"] = Math.ceil((weather["temperature"] - 32) / 1.8);
    $("#temperature").html(weather["temperature"] + "<a id='celsius' onclick='displayFarenheight()'>°C</a>");
}

function getLocation() {
    $("#city").fadeOut(500, function () {
        $.getJSON("http://ip-api.com/json/?callback=?",
            function (myLocation) {
                location["ip_address"] = myLocation["query"];
                location["latitude"] = myLocation.lat;
                location["longitude"] = myLocation.lon;
                location["city"] = myLocation.city;
                $("#city").html(location["city"]);
                $("#city").fadeIn(700);
                getWeather(location.latitude, location.longitude);
            });
    });
}