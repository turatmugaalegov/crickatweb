import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
}
@Injectable()
export class EventService {
    constructor(private http: HttpClient) { }
    getData() {
        return this.http.get('https://dry-caverns-85169-185a985df7fb.herokuapp.com/api/v1.0/events/all');
    }
    addData(postEvent: Object) {
        let endPoint = "https://dry-caverns-85169-185a985df7fb.herokuapp.com/api/v1.0/create-event"
        this.http.post(endPoint, postEvent).subscribe(data => {
            console.log(data);
        });
    }
    editData(patchEvent: Object) {
        let endPoint = "https://dry-caverns-85169-185a985df7fb.herokuapp.com/api/v1.0/edit-event/{id}"
        this.http.post(endPoint, patchEvent).subscribe(data => {
            console.log(data);
        });
    }
    deleteData(deleteEvent: Object) {
        let endPoint = "https://dry-caverns-85169-185a985df7fb.herokuapp.com/api/v1.0/delete-event/{id}"
        this.http.post(endPoint, deleteEvent).subscribe(data => {
            console.log(data);
        });
    }
    favData(postFavoriteEvent: Object) {
        let endPoint = "https://dry-caverns-85169-185a985df7fb.herokuapp.com/api/v1.0/favorite-event/{id}"
        this.http.post(endPoint, postFavoriteEvent).subscribe(data => {
            console.log(data);
        });
    }
    getallfavData() {
        return this.http.get('https://dry-caverns-85169-185a985df7fb.herokuapp.com/api/v1.0/events/favorites');
    }
}