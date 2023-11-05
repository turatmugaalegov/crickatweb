import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EventService {
  private apiUrl = 'https://dry-caverns-85169-185a985df7fb.herokuapp.com/api/v1.0'; 

  constructor(private http: HttpClient) { }

  createEvent(name: string, date: string, type: string, ageRating: String, ticketPrice: number, location: string) {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token');
    // If there's no token, throw an error or handle accordingly
    if (!token) {
      throw new Error('No token found. User must be logged in to create events.');
    }
    // Set the headers with the authorization token
    const headers = { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' };

    // Make the post request with headers
    return this.http.post<any>(
      `${this.apiUrl}/create-event`, 
      { name, date, type, ageRating, ticketPrice, location },
      { headers }
    );
  }

    getData() {
        return this.http.post<any>(`${this.apiUrl}/events/all`, { });
      }
}