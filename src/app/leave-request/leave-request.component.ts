import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { UserNavbarComponent } from '../user-navbar/user-navbar.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-leave-request',
  standalone: true,
  imports: [FormsModule,
    ReactiveFormsModule,
    UserNavbarComponent,
    NgIf
  ],
  templateUrl: './leave-request.component.html',
  styleUrl: './leave-request.component.scss'
})
export class LeaveRequestComponent implements OnInit {

  leaveRequestForm: FormGroup = new FormGroup({
    emailId: new FormControl(),
    leaveType: new FormControl(),
    totalDaysOfLeave: new FormControl(),
    startDate: new FormControl(),
    endDate: new FormControl(),
    reason: new FormControl()
  });

  successMessage = '';
  error = '';
  loading = true;

  constructor(private dataService: DataService, private fb: FormBuilder) { }

  ngOnInit(): void {
    const email = localStorage.getItem('email');
    this.leaveRequestForm.patchValue({
      emailId: email
    });
    this.loading = false;
  }

  onSubmit(leaveRequestForm: any) {
    if (this.leaveRequestForm.valid) {
      const data = leaveRequestForm.value;
      this.dataService.postLeaveRequest(data).subscribe({
        next: (response) => {
          this.successMessage = "Leave request submitted successfully!";
          this.leaveRequestForm.reset();
          const email = localStorage.getItem('email');
          this.leaveRequestForm.patchValue({
            emailId : email
          });
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
        },
        error: (err) => {
          this.error = "Failed to Apply Leave - ";
          setTimeout(() => {
            this.error = '';
          }, 3000);
        }
      });
    }
  }

}
