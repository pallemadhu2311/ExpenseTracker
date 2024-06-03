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
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [

    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    CommonModule,
    HttpClientModule,
    RouterModule

  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  signupForm!: FormGroup;
  userdata = [];

  constructor(private fb: FormBuilder,private userService: UserService,private route:Router) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      mobile: ['', [Validators.required, Validators.maxLength(10)]],
      createdat: ['']
    });
  }

  ngOnInit() {

  }

  onSubmit() {
    if (this.signupForm.valid) {

      const currentDateandTime = new Date();

      this.signupForm.patchValue({
        createdat: currentDateandTime.toISOString()
      });

      const user: User = {
        ...this.signupForm.value,
        createdAt: currentDateandTime.toISOString()
      };

      this.userService.createUser(user).subscribe((response:any)=>{
        this.userdata = response;
        alert("User Created Successfully");
        this.route.navigate(['/login']);
      },(error) => {
        console.error('Error adding user', error);
        alert('An error occurred while adding the user.');
      });

    }
  }

}
