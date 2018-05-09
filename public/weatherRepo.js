

var STORAGE_ID = 'weather';


class Comment {
    constructor(newComment) {
        this.text = newComment;
    }
}

class Repo {

    constructor() {
        this.dataArray = [];
    }

    saveToLocalStorage() {
        localStorage.setItem(STORAGE_ID, JSON.stringify(this.dataArray));
    }


    getFromLocalStorage() {
        return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
    }

    addWeatherReport(city) {
        this.dataArray.push(city);
    }

    _findPostById(cities, id) {
        for (let i = 0; i < cities.length; i++) {
            if (cities[i].id == id) {
                return i;
            }
        }
    }

    addComment(text, id) {
        var newComment = new Comment(text);
        let cityIndex = this._findPostById(this.dataArray, id);
        this.dataArray[cityIndex].comments.push(newComment);
        this.saveToLocalStorage();
        this.dataArray = this.getFromLocalStorage();
    }
    deleteWeather(wID) {
        let cityIndex = this._findPostById(this.dataArray, wID);
        this.dataArray.splice(cityIndex, 1);
        this.saveToLocalStorage();
        this.dataArray = this.getFromLocalStorage();
    }
}
const repo = Repo;
export { repo }
