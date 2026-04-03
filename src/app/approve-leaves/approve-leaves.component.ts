import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService, LeaveRequest } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';

@Component({
  selector: 'app-approve-leaves',
  standalone: true,
  imports: [FormsModule,
    ReactiveFormsModule,
    NgFor,
    AdminNavbarComponent,
    NgIf
  ],
  templateUrl: './approve-leaves.component.html',
  styleUrl: './approve-leaves.component.scss'
})
export class ApproveLeavesComponent implements OnInit {

  requests: LeaveRequest[] = [];
  loading = true;
  error = '';

  approvalForm: FormGroup = new FormGroup({
    status: new FormControl(),
    approvedBy: new FormControl()
  });

  constructor(private fb: FormBuilder, private dataService: DataService, private route: ActivatedRoute) {
    this.approvalForm = this.fb.group({
      status: ['', [Validators.required]],
      approvedBy: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.dataService.getPendingLeaveRequests().subscribe({
      next: (data) => {
        this.requests = data.filter(item => item.status === "pending");
        this.loading = false;
      },
      error: (err) => {
        this.error = "No leaves found";
        this.loading = false;
      }
    });

  }

  onSubmit(leaveRequestId: number) {
    if (this.approvalForm.valid) {
      const data = {
        ...this.approvalForm.value,
        leaveRequestId: leaveRequestId
      };
      this.dataService.patchLeaveRequest(data).subscribe({
        next: (response) => {
          console.log("Form submitted - ", response);
          this.approvalForm.reset();
          this.dataService.getPendingLeaveRequests().subscribe({
            next: (data) => {
              this.requests = data.filter(item => item.status === "pending");
              this.loading = false;
            }
          });
        },
        error: (err) => {
          console.error("Failed to submit form - ", err);
        }
      });
    }
  }

  onClick(action: string) {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);

      this.approvalForm.patchValue({
        approvedBy: parsedUser.userName
      });
    }
    
    this.approvalForm.patchValue({
      status: action
    });
  }
} 
