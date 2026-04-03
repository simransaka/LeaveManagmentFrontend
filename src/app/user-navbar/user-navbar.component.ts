import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LeaveRequest } from '../data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-navbar.component.html',
  styleUrl: './user-navbar.component.scss'
})
export class UserNavbarComponent {

  sideBarOpen = false;

  constructor(private router: Router) { }

  requestLeave() {
    this.router.navigate(['/leave/request']);
  }

  myProfile() {
    const emailId = localStorage.getItem("email");
    this.router.navigate([`user/dashboard/${emailId}`]);
  }

  checkallLeaves() {
    const emailId = localStorage.getItem("email");
    this.router.navigate([`/allLeaves/${emailId}`]);
  }

  leavePolicy() {
    this.router.navigate(['/leave/policy']);
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('email');
    this.router.navigate(['/login']);
  }

  checkLeaveBalance() {
    const emailId = localStorage.getItem('email');
    this.router.navigate([`/leaveBalance/${emailId}`]);
  }

  goHome(){
    const user = localStorage.getItem('user');
    if(user){
      this.router.navigate(['/home']);
    }
  }

  toggleMenu(){
    this.sideBarOpen = !this.sideBarOpen;
  }

  goToAttendance(){
    this.router.navigate(['/attendance']);
  }
}
