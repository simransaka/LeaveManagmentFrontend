import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, 
    FormsModule,
    ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  error = '';

  loginForm : FormGroup = new FormGroup({
    emailId : new FormControl(),
    password : new FormControl()
  });

  constructor(private fb : FormBuilder, private authService: AuthService, private http : HttpClient, private router: Router){
    this.loginForm = this.fb.group({
      emailId : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required]]
    });
  }

  onSubmit(loginForm : any){
    if(this.loginForm.valid){
      const credentials = this.loginForm.value;
      this.authService.login(credentials).subscribe({
        next : (response) => {
          console.log("Login successful", response);
        },
        error: (error) => {
          this.error = "Login Failed due to Bad Credentials";
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

