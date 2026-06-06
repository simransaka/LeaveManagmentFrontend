import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, LeaveBalance } from '../data.service';
import { NgIf } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-user-leave-balance',
  standalone: true,
  imports: [NgIf,
    NavbarComponent
  ],
  templateUrl: './user-leave-balance.component.html',
  styleUrl: './user-leave-balance.component.scss'
})
export class UserLeaveBalanceComponent implements OnInit{
  balance : LeaveBalance | null = null;
  loading = true;
  error = '';
  sideBarOpen = false;
  
  constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit(): void {
    const emailId = String(this.route.snapshot.paramMap.get('emailId'));

    if (emailId) {
      this.dataService.getLeaveBalance(emailId).subscribe({
        next: (data) => {
          console.log("Leave Balance Data:", data);
          this.balance = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = "Unable to find EmloyeeId";
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
