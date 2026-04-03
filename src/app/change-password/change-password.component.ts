import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent implements OnInit{

  changePasswordForm : FormGroup = new FormGroup({
    oldPassword : new FormControl(),
    newPassword : new FormControl(),
    emailId : new FormControl()
  });

  constructor(private fb : FormBuilder,private route : ActivatedRoute, private authService : AuthService, private router : Router){}

  ngOnInit(): void {
      const email = localStorage.getItem('email');
      this.changePasswordForm.patchValue({
        emailId : email
      });
  }

  onSubmit(){
    if(this.changePasswordForm.valid){
      const data = this.changePasswordForm.value;
      this.authService.postChangePassword(data).subscribe({
        next : (response) => {
          console.log("Password changed successfully");
          this.router.navigate(['/login']);
        },
        error : (err) => {
            console.error("Failed to save password");
        },
      });
    }
  }

}
