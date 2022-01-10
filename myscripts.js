var userlocation;
$(document).ready(function () {
    $("#search-bar").keyup(function (event) {
        if (event.which === 13) {
            submitSearch();
        }
    });
    $("#search-button").click(function () {
        submitSearch();
    })
    $("#convert-button").click(function () {
        let currentMode = document.getElementById("convert-units-btn").innerText;
        if (currentMode == "F°") {
            document.getElementById("convert-units-btn").innerHTML = "C°";
            document.getElementById("button-container").firstChild.style = "color:rgb(221, 131, 70)";
            document.getElementById("f-letter").style = "color:white";
            let f = document.getElementById("result-temp").textContent;
            let c = ftoCelsius(f);
            c = c.toFixed(2);

            document.getElementById("result-temp").innerHTML = c;
            f=document.getElementById("result-feeling").textContent;
            c = ftoCelsius(f);
            c = c.toFixed(2);
            document.getElementById("result-feeling").innerHTML = c;

            f=document.getElementById("result-mintemp").textContent.slice(0,-2);
            console.log(f);
            c = ftoCelsius(f);
            c = c.toFixed(2);
            document.getElementById("result-mintemp").innerHTML = c+"mb";

            f=document.getElementById("result-maxtemp").textContent.slice(0,-2);
            console.log(f);
            c = ftoCelsius(f);
            c = c.toFixed(2);
            document.getElementById("result-maxtemp").innerHTML = c+"mb";
        }
        else {
            document.getElementById("convert-units-btn").innerHTML = "F°";
            document.getElementById("button-container").firstChild.style = "color:white";
            document.getElementById("f-letter").style = "color:rgb(221, 131, 70)";
            let c = document.getElementById("result-temp").textContent;
            let f = celsiusToF(c);
            f = f.toFixed(2);
            document.getElementById("result-temp").innerHTML = f;

            c=document.getElementById("result-feeling").textContent;
            f = celsiusToF(c);
            f = f.toFixed(2);
            document.getElementById("result-feeling").innerHTML = f;

            c=document.getElementById("result-mintemp").textContent.slice(0,-2);
            f = celsiusToF(c);
            f = f.toFixed(2);
            document.getElementById("result-mintemp").innerHTML = f+"mb";

            c=document.getElementById("result-maxtemp").textContent.slice(0,-2);
            f = celsiusToF(c);
            f = f.toFixed(2);
            document.getElementById("result-maxtemp").innerHTML = f+"mb";
        }
    }
    )
});
function celsiusToF(celsius) {
    return celsius * 1.8 + 32;
}
function ftoCelsius(f) {
    return (f - 32) * 5 / 9;
}
function submitSearch() {
    var searchLocation = document.getElementById("search-bar").value;
    document.getElementById("convert-units-btn").innerHTML = "F°";
    document.getElementById("button-container").firstChild.style = "color:white";
    document.getElementById("f-letter").style = "color:rgb(221, 131, 70)";
    console.log(searchLocation);
    callWeatherApi(searchLocation);
}
var xhttp = new XMLHttpRequest();
xhttp.open("GET", "https://geo.ipify.org/api/v1?apiKey=at_Hp8OoUmeaLiZDusSM8OqvjbNoLDTZ", true);
xhttp.send();
xhttp.onload = function () {
    let myresponse = JSON.parse(this.response);
    userlocation = myresponse.location.postalCode.toString();
    console.log("The location of the user is: " + userlocation);
    callWeatherApi(userlocation);
}
function callWeatherApi(location) {
    console.log("weather API called...");
    let weatherRequest = new XMLHttpRequest();
    weatherRequest.open("GET", "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=49f83cd3b65feac05c15461df3b98079&units=imperial");
    weatherRequest.send("units=imperial");
    weatherRequest.onload = function () {
        let myweatherresponse = JSON.parse(this.response);
        document.getElementById("result-temp").innerHTML = myweatherresponse.main.temp;
        document.getElementById("result-place").innerHTML = myweatherresponse.name + ',' + myweatherresponse.sys.country;
        document.getElementById("result-weather").innerHTML = myweatherresponse.weather[0].main;
        document.getElementById("result-weather-desc").innerHTML = myweatherresponse.weather[0].description;
        document.getElementById("result-feeling").innerHTML = myweatherresponse.main.feels_like;
        document.getElementById("result-humidity").innerHTML = myweatherresponse.main.humidity + "%";
        document.getElementById("result-pressure").innerHTML = myweatherresponse.main.pressure + "mb";
        document.getElementById("result-mintemp").innerHTML = myweatherresponse.main.temp_min + "mb";
        document.getElementById("result-maxtemp").innerHTML = myweatherresponse.main.temp_max + "mb";
    }
}