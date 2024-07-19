import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface User {
  userId?: number;
  username: string;
  fullname: string;
  email: string;
  password: string;
  mobile: string;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private baseUrl = 'http://localhost:8080/users';

  constructor(private http:HttpClient) { }

  createUser(user : User):Observable<User>{
    return this.http.post<User>(this.baseUrl,user);
  }
}
