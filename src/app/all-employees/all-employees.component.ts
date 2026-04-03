import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DataService, Employee, Users } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';

@Component({
  selector: 'app-all-employees',
  standalone: true,
  imports: [NgFor,
    FormsModule,
    ReactiveFormsModule,
    AdminNavbarComponent,
    NgIf
  ],
  templateUrl: './all-employees.component.html',
  styleUrl: './all-employees.component.scss'
})
export class AllEmployeesComponent {
  employeeForm: FormGroup = new FormGroup({
    userName: new FormControl(),
    emailId: new FormControl(),
    department: new FormControl(),
    jobRole: new FormControl(),
    password: new FormControl()
  });

  loading = true;
  error = '';
  employees: Employee[] = [];
  showForm = false;
  successMessage = '';

  constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService, private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      userName: ['', [Validators.required]],
      emailId: ['', [Validators.required, Validators.email]],
      department: ['', [Validators.required]],
      jobRole: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {

    this.dataService.getAllEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = "Unable to find EmloyeeId";
        this.loading = false;
      }
    });
    
  }

  onSubmit(employeeForm: any) {
    if (this.employeeForm.valid) {
      const credentials = employeeForm.value;
      this.dataService.postEmployee(credentials).subscribe({
        next: (response) => {
          this.successMessage = "Successfully added new User. The list of Employees will be updated when the user will register himself.";
          this.showForm = false;
          this.dataService.getAllEmployees().subscribe({
            next : data =>{
              this.employees = data;
            }
          });
          this.employeeForm.reset();
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
        },
        error: (err) => {
          this.error = "Unsuccessful addition of new User";
          this.showForm = false;
          this.dataService.getAllEmployees().subscribe({
            next : data =>{
              this.employees = data;
            }
          });
          this.employeeForm.reset();
          setTimeout(() => {
            this.error = '';
          }, 3000);
        }
      });
    }
  }

  onBalance(employee: Employee) {
    this.router.navigate(['/balance', employee.employeeId]);
  }

  toggleForm(){
    this.showForm = !this.showForm;
  }

}
