var STORAGE_ID = 'weather';
var saveToLocalStorage = function () {
    localStorage.setItem(STORAGE_ID, JSON.stringify(weathers));
}
var getFromLocalStorage = function () {
    return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
}
var weathers = [];

class Weather {
    constructor(city, temp_c, temp_f, localTime) {
        this.id 
        this.city = city;
        this.temp_c = temp_c;
        this.temp_f = temp_f;
        this.localtime = localTime;
        this.comments = [];
    }
    addComment(text) {
        var comment = new Comment(text);
        this.comments.push(comment);
    }
}
class Comments {
    constructor(comment) {
        this.text = comment;
    }
}
var getWeather = function (cityName) {
    $.ajax({
        method: "GET",
        url: 'https://api.apixu.com/v1/current.json?key=2c25526acc2d4beb944123049180205&q=' + cityName,
        success: function (data) {
            var jsonObj = JSON.stringify(data);
            var obj = JSON.parse(jsonObj);
            var newWeather = new Weather(obj.location.name, obj.current.temp_c, obj.current.temp_f, obj.location.localtime);
            weathers.push(newWeather);
            saveToLocalStorage();
            renderWeather(newWeather);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    });
}
var renderWeather = function (cityFile) {
    var source = $('#weather-result-temp').html();
    var template = Handlebars.compile(source);
    var newHTML = template(cityFile);
    $('.results').append(newHTML);
}
$('.add-city').on('click', function () {
    var $city = $('#post-city').val();
    getWeather($city);
});
