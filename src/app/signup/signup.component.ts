import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  error = '';
  successMessage = '';

  signupForm : FormGroup = new FormGroup({
      emailId : new FormControl(),
      password : new FormControl(),
      userName : new FormControl()
    });
  
    constructor(private fb : FormBuilder, private authService: AuthService, private http : HttpClient, private router: Router){
      this.signupForm = this.fb.group({
        emailId : ['', [Validators.required, Validators.email]],
        password : ['', [Validators.required]],
        userName : ['', [Validators.required]]
      });
    }

  onSubmit(signupForm : any){
    if(this.signupForm.valid){
      const credentials = signupForm.value;
      this.authService.signUp(credentials).subscribe({
        next : (response) => {
          this.successMessage = "Sign Up successfull";
          setTimeout(() => {
            this.error = '';
          }, 3000);
        },
        error : (error) => {
          this.error = "Email ID already exists";
          setTimeout(() => {
            this.error = '';
          }, 3000);
        }
      });
    }

  }

  signUp(){
    this.router.navigate(['/signup']);
  }

  logIn(){
    this.router.navigate(['/login']);
  }

  goHome(){
    this.router.navigate(['/home']);
  }

}
