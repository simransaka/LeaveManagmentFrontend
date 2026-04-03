import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_KEY = 'token';
  private readonly EMAIL_KEY = 'email';
  private readonly USERNAME_KEY = 'userName';

  private authUrl = "http://localhost:8080/auth";

  constructor(private router: Router, private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.authUrl}/logIn`, credentials).pipe(
      tap((response: any) => {
        this.storeToken(response.token);
        this.storeEmail(response.email);
        const role = response.role.toLowerCase();
        const user = {
          role: response.role,
          loginStatus: response.loginStatus,
          userName: response.userName
        };
        
        localStorage.setItem("user", JSON.stringify(user));
        if (user.role === "user") {
          if (user.loginStatus === false) {
            this.router.navigate(['change/password/']);
          }
          else if (user.loginStatus === true) {
            this.router.navigate([`user/dashboard/${response.email}`]);
          }
        }
        else if (user.role === "admin") {
          this.router.navigate([`admin/dashboard/${response.email}`]);
        }
      })
    );
  }

  storeToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  } 

  storeEmail(email : string) : void {
    localStorage.setItem(this.EMAIL_KEY, email);
  }

  signUp(credentials: any): Observable<any> {
    return this.http.post(`${this.authUrl}/signUp`, credentials).pipe(
      catchError(error => {
        console.log("Sign Up failed", error);
        return throwError(() => new Error(error.message));
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  postChangePassword(data: any): Observable<any> {
    return this.http.post(`${this.authUrl}/change/password`, data, { responseType: 'text' }).pipe(
      catchError(error => {
        console.log("Failed to update password - ", error);
        return throwError(() => new Error(error.message));
      })
    );
  }
}