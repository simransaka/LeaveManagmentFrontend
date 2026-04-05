import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule, NgClass, NgFor } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DataService, LeaveRequest } from '../data.service';

@Component({
  selector: 'app-my-leaves',
  standalone: true,
  imports: [NavbarComponent,
    NgFor,
    NgClass,
    CommonModule
  ],
  templateUrl: './my-leaves.component.html',
  styleUrl: './my-leaves.component.scss'
})
export class MyLeavesComponent implements OnInit{

  pendingRequests: LeaveRequest[] = [];
  processedRequests: LeaveRequest[] = []; 
  loading = true;
  error = '';

  constructor(private route : ActivatedRoute, private dataService : DataService) {}

  ngOnInit(): void {
    const emailId = String(this.route.snapshot.paramMap.get('emailId'));

    if (emailId) {
      this.dataService.getLeaveRequest(emailId).subscribe({
        next: (data) => {
          this.pendingRequests = data.filter(item => item.status === "pending");
          this.processedRequests = data.filter(item => item.status === "approved" || item.status ===  "rejected");
          this.loading = false;
        },
        error: (err) => {
          this.error = "Unable to find emailId";
          this.loading = false;
        }
      });
    } 
    else {
      this.error = "Invalid EmailId";
      this.loading = false;
    }
  }

}
