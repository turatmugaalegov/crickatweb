import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
}
@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }
    
    loginUser(postUser: Object) {
        let endPoint = "https://dry-caverns-85169-185a985df7fb.herokuapp.com/api/v1.0/auth/login"
        this.http.post(endPoint, postUser).subscribe(data => {
            console.log(data);
        });
    }

    logoutUser(postUser: Object) {
        let endPoint = "https://dry-caverns-85169-185a985df7fb.herokuapp.com/api/v1.0/auth/logout"
        this.http.post(endPoint, postUser).subscribe(data => {
            console.log(data);
        });
    }
}