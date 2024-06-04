import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:8080/api/auth/login';
  private userUrl = 'http://localhost:8080/users';


  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = { username, password };
    return this.http.post<any>(this.apiUrl, body, { headers });
  }

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/${username}`);
  }



}
