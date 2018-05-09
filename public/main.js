import { ajax } from "./weatherApi.js";
import { dataLayer } from "./weatherReport.js";
import { repo } from "./weatherRepo.js";
import { render } from "./weatherRender.js";



var dataControl = new repo();
var dataRender = new render();

dataControl.dataArray = dataControl.getFromLocalStorage();
dataRender.renderWeather(dataControl);

$('.add-city').on('click keypress', function () {
    var $city = $('#post-city').val();
    var cityObj = new ajax($city);
    cityObj = cityObj.getWeather();
    cityObj.then(function (data) {
        var jsonObj = JSON.stringify(data);
        var obj = JSON.parse(jsonObj);
        var city = new dataLayer(obj.location.name, obj.current.temp_c, obj.current.temp_f, obj.location.localtime);
        dataControl.addWeatherReport(city);
        dataControl.saveToLocalStorage();
        dataControl.dataArray = dataControl.getFromLocalStorage();
        dataRender.renderWeather(dataControl.dataArray);
    }).catch(function (error) {
        console.log(error.data);
    })

    $('#post-city').val("");
});
/*$(document).keypress(function(e) {
    if(e.which == 13) {
        var $city = $('#post-city').val();
        app.getWeather($city);
    }
});*/
$('.results').on('click', 'button.add-comment', function () {
    var $comment = $(this).closest('ul.result').find('.comment-input').val();
    var wID = $(this).closest('ul.result').data().id;
    dataControl.addComment($comment, wID)
    dataRender.renderWeather(dataControl.dataArray);
});
$('.results').on('click', '#delete', function () {
    var wID = $(this).closest('ul.result').data().id;
    dataControl.deleteWeather(wID)
    dataRender.renderWeather(dataControl.dataArray);
    
});