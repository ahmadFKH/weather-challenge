

class City {
    constructor(city, temp_c, temp_f, localTime) {
        this.name = city;
        this.temp_c = temp_c;
        this.temp_f = temp_f;
        this.localtime = localTime;
        this.comments = [];
        this.id = Math.random().toString(36).substr(2, 9);
    }
}

const dataLayer = City;

export { dataLayer }