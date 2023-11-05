import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
}
@Injectable()
export class EventService {
    private apiUrl = 'https://dry-caverns-85169-185a985df7fb.herokuapp.com/api/v1.0'; 
  
    constructor(private http: HttpClient) { }
  
    createEvent(name: string, date: string, type: string, ageRating: String, ticketPrice: number, location: string) {
      return this.http.post<any>(`${this.apiUrl}/create-event`, { name, date, type, ageRating, ticketPrice, location});
    }

    getData() {
        return this.http.post<any>(`${this.apiUrl}/events/all`, { });
      }
}