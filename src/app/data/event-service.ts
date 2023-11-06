import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';
import { EventResponse } from "../graphql/eventresponse";
import { Observable } from "rxjs";


@Injectable()
export class EventService {
  private apiUrl = 'https://dry-caverns-85169-185a985df7fb.herokuapp.com/api/v1.0'; 

  constructor(private http: HttpClient) { }

  createEvent(name: string, date: string, type: string, ageRating: String, ticketPrice: number, location: string) {
    const token = localStorage.getItem('token'); // Retrieve the stored token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token // Include the token in the Authorization header
    });
    return this.http.post<any>(`${this.apiUrl}/create-event`, { name, date, type, ageRating, ticketPrice, location}, { headers: headers, withCredentials: true });
  }

  getEvents() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const query = {
      query: `
        query {
        allEvents {
        events {
        name
        date
        location
    }
  }
}
      `
    };

    return this.http.post<EventResponse>(this.apiUrl + '/graphql', query, { headers })
      .pipe(
        map(response => response.data.allEvents)
      );
  }

  getEventsForUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token // Include the token in the Authorization header
    });
    return this.http.get(`${this.apiUrl}/events/myevents`, { headers: headers });
  }
}