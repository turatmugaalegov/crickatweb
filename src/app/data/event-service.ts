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
    const token = localStorage.getItem('token'); // Retrieve the stored token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token // Include the token in the Authorization header
    });
    return this.http.post<any>(`${this.apiUrl}/create-event`, { name, date, type, ageRating, ticketPrice, location}, { headers: headers, withCredentials: true });
  }

  updateEvent(eventId: string, updatedEvent: any) {
    const token = localStorage.getItem('token'); // Retrieve the stored token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token // Include the token in the Authorization header
    });
  
    // Führe eine PUT-Anfrage aus, um das Event zu aktualisieren
    return this.http.put<any>(`${this.apiUrl}/edit-event/${eventId}`, updatedEvent, { headers: headers, withCredentials: true });
  }

  getEvents(): Observable<any> {
    return this.http.get(this.apiUrl + '/events/all');
  }

  markAsFavorite(eventId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
  
    const body = {}; // You can add any necessary data to the request body
  
    return this.http.post(`${this.apiUrl}/favorite-event/${eventId}`, body, { headers });
  }

  toggleFavorite(event: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    const body = { eventId: event }; // You can add any necessary data to the request body

    return this.http.post(`${this.apiUrl}/favorite-event/${event.id}`, body, { headers });
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
      'Authorization': 'Bearer ' + token // Include the token in the Authorization header
    });
    return this.http.get(`${this.apiUrl}/events/myevents`, { headers: headers });
  }
}