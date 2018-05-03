var WeatherApp = function () {
    var STORAGE_ID = 'weather';
    var weathers = [];
    var weather_id = 0;
    var saveToLocalStorage = function () {
        localStorage.setItem(STORAGE_ID, JSON.stringify(weathers));
    }
    var getFromLocalStorage = function () {
        return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
    }
    class Weather {
        constructor(city, temp_c, temp_f, localTime) {
            this.id = weather_id;
            this.name = city;
            this.temp_c = temp_c;
            this.temp_f = temp_f;
            this.localtime = localTime;
            this.comments = [];
        }
    }
    class Comment {
        constructor(newComment) {
            this.text = newComment;
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
                weather_id++;
                weathers.push(newWeather);
                saveToLocalStorage();
                renderWeather();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });
    }
    var renderWeather = function () {
        weathers = getFromLocalStorage();
        $('.results').empty();
        for (var i = 0; i < weathers.length; i++) {
            var source = $('#weather-result-temp').html();
            var template = Handlebars.compile(source);
            var newHTML = template(weathers[i]);
            $('.results').append(newHTML);
        }
    }
    var addComment = function (text, id) {
        var newComment = new Comment(text);
        weathers[id].comments.push(newComment);
        saveToLocalStorage();
    }
    /*var renderComments = function (id) {
        weathers = getFromLocalStorage();
        $('.comments-container').empty();
        if (weathers.length > 0) {
            for ( i = 0; i < weathers[i].comments.length; i++) {
                var source = $('#comment-result-temp').html();
                var template = Handlebars.compile(source);
                var newHTML = template(weathers[id].comments[i]);
                $('.comments-container').append(newHTML);
            }   
        }
    }*/
    renderWeather();
    //renderComments();
    return {
        getWeather: getWeather,
        renderWeather: renderWeather,
        addComment: addComment,
        //renderComments: renderComments
    };
}
var app = WeatherApp();

$('.add-city').on('click', function () {
    var $city = $('#post-city').val();
    app.getWeather($city);
});
$(document).keypress(function (e) {
    if (e.which == 13) {
        var $city = $('#post-city').val();
        app.getWeather($city);
    }
});
$('.results').on('click', 'button.add-comment',function () {
    var $comment = $(this).closest('ul.result').find('.comment-input').val();
    var wID = $(this).closest('ul.result').data().id;
    app.addComment($comment, wID);
    app.renderWeather();
});
