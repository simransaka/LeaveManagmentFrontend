import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LeaveRequest } from '../data.service';
import { CommonModule, NgIf } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  @Output() sideBarToggle = new EventEmitter<boolean>();
  sideBarOpen = false;
  role = '';
  isHomePage = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    const user = localStorage.getItem('user');
  if (user) {
    const parsedUser = JSON.parse(user);
    this.role = parsedUser.role?.toLowerCase();
  }

  this.router.events.subscribe(() => {
    const url = this.router.url;

    this.isHomePage = (url === '/home');

    console.log("URL:", url, "isHomePage:", this.isHomePage);
  });
  }

  signUp() {
    this.router.navigate(['/signup']);
  }

  logIn() {
    this.router.navigate(['/login']);
  }

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

  goHome() {
    this.router.navigate(['/home']);
  }

  toggleMenu() {
    this.sideBarOpen = !this.sideBarOpen;
    this.sideBarToggle.emit(this.sideBarOpen);
  }

  goToAttendance() {
    this.router.navigate(['/attendance']);
  }

  checkEmployees() {
    this.router.navigate(['/allEmployees']);
  }

  checkRequests() {
    this.router.navigate(['/approveLeaves']);
  }


}
