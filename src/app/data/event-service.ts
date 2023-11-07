import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';
import { EventResponse } from "../graphql/eventresponse";
import { Observable } from "rxjs";


@Injectable()
export class EventService {
  private apiUrl = 'https://dry-caverns-85169-185a985df7fb.herokuapp.com/api/v1.0';

  events: Event[] = [];

  showFavoritesOnly: boolean = false;

  constructor(private http: HttpClient) { }



  createEvent(name: string, date: string, type: string, ageRating: String, ticketPrice: number, location: string) {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.http.post<any>(`${this.apiUrl}/events/create`, { name, date, type, ageRating, ticketPrice, location }, { headers: headers, withCredentials: true });
  }

  updateEvent(updatedEvent: any, eventId: string) {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token 
    });

    return this.http.patch<any>(`${this.apiUrl}/events/edit/${eventId}`, updatedEvent, { headers: headers, withCredentials: true });
  }

  getEvents(): Observable<any> {
    return this.http.get(this.apiUrl + '/events/all');
  }

  toggleFavorite(event: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    const body = { eventId: event };

    return this.http.post(`${this.apiUrl}/events/togglefavorite/${event.id}`, body, { headers });
  }

  getFavoriteEvents(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    return this.http.get(`${this.apiUrl}/events/favorites`, { headers });
  }

  getEventsForUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.http.get(`${this.apiUrl}/events/myevents`, { headers: headers });
  }

  deleteEvent(eventId: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
  
    return this.http.delete<any>(`${this.apiUrl}/events/delete/${eventId}`, { headers, withCredentials: true });
  }
}