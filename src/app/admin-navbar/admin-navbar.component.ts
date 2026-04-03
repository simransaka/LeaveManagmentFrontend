import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.scss'
})
export class AdminNavbarComponent {

  sideBarOpen = false;

  constructor(private router: Router) { }


  myProfile() {
    const emailId = localStorage.getItem("email");
    this.router.navigate([`admin/dashboard/${emailId}`]);
  }

  checkEmployees(){
    this.router.navigate(['/allEmployees']);
  }

  checkRequests(){
    this.router.navigate(['/approveLeaves']);
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('email');
    this.router.navigate(['/login']);
  }

  goHome(){
    this.router.navigate(['/home']);
  }

  toggleMenu(){
    this.sideBarOpen = !this.sideBarOpen;
  }

}
