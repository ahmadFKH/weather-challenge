

var STORAGE_ID = 'weather';

var getFromLocalStorage = function () {
    return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
}


class Render {
    constructor() {
        this.data = [];
    }

    renderWeather(array) {
        this.data = array;
        $('.results').empty();
        for (var i = 0; i < array.length; i++) {
            var source = $('#weather-result-temp').html();
            var template = Handlebars.compile(source);
            var newHTML = template(this.data[i]);
            $('.results').append(newHTML);
        }
    }
}
const render = Render;
export {render}