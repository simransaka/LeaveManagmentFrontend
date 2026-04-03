import { Component, OnInit } from '@angular/core';
import { DataService, Users } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [NgIf,
    CommonModule,
    AdminNavbarComponent
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  user: Users | null = null;
  loading = true;
  error = '';
  firstLetter = '';

  constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit(): void {
    const emailId = this.route.snapshot.paramMap.get('emailId');

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
          this.error = "Unable to load data";
          this.loading = false;
        }
      });
    }
    else {
      this.error = "Invalid emailId";
      this.loading = false;
    }
  }

  


}
