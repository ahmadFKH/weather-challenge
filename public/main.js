var WeatherApp = function () {
    var STORAGE_ID = 'weather';
    var weathers = [];
    var saveToLocalStorage = function () {
        localStorage.setItem(STORAGE_ID, JSON.stringify(weathers));
    }
    var getFromLocalStorage = function () {
        return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
    }
    class Weather {
        constructor(city, temp_c, temp_f, localTime) {
            this.id = weathers.length;
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
    var deleteWeather = function(wID) {
        weathers.splice(wID, 1);
        for (var i=wID; i<weathers.length; i++) {
            weathers[wID].id = wID;
        }
        saveToLocalStorage();
    }
    renderWeather();
    return {
        getWeather: getWeather,
        renderWeather: renderWeather,
        addComment: addComment,
        deleteWeather: deleteWeather
    };
}
var app = WeatherApp();

$('.add-city').on('click keypress', function () {
    var $city = $('#post-city').val();
    app.getWeather($city);
    $('#post-city').val("");
});
$(document).keypress(function(e) {
    if(e.which == 13) {
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
$('.results').on('click', '#delete',function () {
    var wID = $(this).closest('ul.result').data().id;
    app.deleteWeather(wID);
    app.renderWeather();
});
