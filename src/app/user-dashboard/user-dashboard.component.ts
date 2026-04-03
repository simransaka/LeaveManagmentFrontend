import { Component, OnInit } from '@angular/core';
import { DataService, Users } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { UserNavbarComponent } from '../user-navbar/user-navbar.component';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [NgIf,
    UserNavbarComponent
  ],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent implements OnInit{
  user : Users | null = null;
  loading = true;
  error = '';
  firstLetter = '';

  constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit(): void {
    const emailId = String(this.route.snapshot.paramMap.get('emailId'));

    if (emailId) {
      this.dataService.getUser(emailId).subscribe({
        next: (data) => {
          this.user = data;
          const userData = localStorage.getItem('user');
          if(userData){
            const parsedUser = JSON.parse(userData);
            this.firstLetter = parsedUser.userName[0];
          }
          this.loading = false;
        },
        error: (err) => {
          this.error = "Unable to find EmailId";
          this.loading = false;
        }
      });
    }
    else {
      this.error = "Invalid EmployeeId";
      this.loading = false;
    }
  } 

}
