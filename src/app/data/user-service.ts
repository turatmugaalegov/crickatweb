import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  withCredentials: true,
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    // ... other headers if needed ...
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://dry-caverns-85169-185a985df7fb.herokuapp.com/api/v1.0'; 

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, { username, password }, httpOptions);
  }

  register(username: string, name: string, email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/auth/register`, { username, name, email, password }, httpOptions);
  }
    getUserRole() {
      return "event_host";
    }

}