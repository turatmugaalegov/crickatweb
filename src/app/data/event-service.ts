import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

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
    return this.http.get(this.apiUrl + '/events/all');
  }
}
