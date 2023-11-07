import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  withCredentials: true,
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://dry-caverns-85169-185a985df7fb.herokuapp.com/api/v1.0';

  isloggedin = false;
  localrole='abc';

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, { username, password }, httpOptions);
  }

  register(username: string, name: string, email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/auth/register`, { username, name, email, password }, httpOptions);
  }

  logout(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.http.post<any>(`${this.apiUrl}/auth/logout`, {}, { headers: headers, withCredentials: true });
  }
  
  getUserRole(){
    const role = localStorage.getItem('role');
    return role;
  }
  

  updateLoggedStatus() {
    if (localStorage.getItem('token')) {
      this.isloggedin=true;
    } else {
      this.isloggedin=false;
    }
  }

  getLoggedStatus() {
    return this.isloggedin;
  }

  getUserData(): Observable<any> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      });
      return this.http.get<any>(`${this.apiUrl}/users/getuser`, { headers: headers });
    } else {
      return new Observable();
    }
  }
    
}