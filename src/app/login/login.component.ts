import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { User, UserService } from '../services/user.service';
import { Router } from '@angular/router';

import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDivider } from '@angular/material/divider';
import { error } from 'console';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    RouterModule,
    HttpClientModule,
    MatDivider
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: any;
  userData = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private loginService:LoginService,
    private userService:UserService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(){

  }



  onSubmit(event: Event) {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.loginService.login(username, password).subscribe(
        (response: any) => {
          if (response && response.message === 'Login Successful') {
            alert('Login successful');
            this.storeUsername(username);
            this.fetchAndStoreUserDetails(username);
            this.router.navigate(['home/addexpenses']); // Adjust the route as needed
          } else {
            alert('Unexpected response from server');
          }
        },
        (error) => {
          console.error('Login failed:', error);
          alert('Login failed: An unknown error occurred');
        }
      );

    }

  }

  private storeUsername(username: string): void {
    localStorage.setItem('LoggedInUser', username);
  }

  private fetchAndStoreUserDetails(username:string):void{
    this.loginService.getUserByUsername(username).subscribe((response:any)=>{
      this.userData = response;
      localStorage.setItem('_UserData_', JSON.stringify(response));
    },(error)=>{
      console.error('Error While Fetching the User',error);
    })
  }




}
