import { Component, ChangeDetectorRef } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { Route, RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OnChanges, SimpleChanges } from '@angular/core';




@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    RouterLink,
    HttpClientModule,
    MatIconModule,
    CommonModule,

  ]
  ,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  showMenu = false; // Variable to track menu visibility
  isUserLoggedIn:boolean = false;

  constructor(
    private http: HttpClient,
    public route:Router,
    private cd: ChangeDetectorRef
  ){

  }

  ngOnInit(){
    this.userLoggedIn();
    this.toggleMenu();
  }

  toggleMenu() {
    this.showMenu = !this.showMenu; // Toggle the boolean value
  }

  userLoggedIn(){
    if(typeof localStorage !== 'undefined'){
      const userProfile = localStorage.getItem('_UserData_');
      this.isUserLoggedIn = !!userProfile;
      this.cd.detectChanges();
      if(userProfile){
        // alert("User Available");
        this.isUserLoggedIn = true;
        console.log("Is user Logged In : " , this.isUserLoggedIn);
      }
      else{
        alert("User not Found");
        this.isUserLoggedIn = false;
      }
    }
  }

  logout(){
    localStorage.removeItem('_UserData_');
    localStorage.removeItem('LoggedInUser');
    this.isUserLoggedIn = false;
    this.cd.detectChanges();
    this.route.navigate(['/login']);

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isUserLoggedIn']) {
      this.cd.detectChanges(); // Trigger change detection when isUserLoggedIn changes
    }
  }

}
