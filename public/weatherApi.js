import {dataLayer} from './weatherReport.js'
import {render} from './weatherRender.js'
import {repo} from "./weatherRepo.js"


class Ajax {

    constructor(cityName) {
        this.city = cityName;
    }
    getWeather() {
        return ($.ajax({method: "GET", url: 'https://api.apixu.com/v1/current.json?key=2c25526acc2d4beb944123049180205&q=' + this.city}));
    }
}
const ajax = Ajax;

export {ajax}
