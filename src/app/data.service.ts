import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tick } from '@angular/core/testing';
import { catchError, Observable, throwError } from 'rxjs';

export interface Report{
  reportId : number;
  employeeId : number;
}

export interface LeaveBalance{
  leaveBalanceId : number;
  emailId : string;
  totalCasualLeaves : number;
  totalSickLeaves : number;
  usedCasualLeaves : number;
  remainingCasualLeaves : number;
  usedSickLeaves : number;
  remainingSickLeaves : number;
  totalEarnedLeaves : number;
  remainingEarnedLeaves : number;
  usedEarnedLeaves : number;
}

export interface Employee{
  employeeId : number;
  employeeName : string;
  department : string;
  jobRole : string;
  emailId : string;
}

export interface LeaveRequest{
  leaveRequestId : number;
  emailId : string;
  leaveType : string;
  totalDaysOfLeave : number;
  startDate : string;
  endDate : string;
  reason : string;
  appliedDate : Date ;
  status : string;
  approvedBy : string;
}

export interface Users{
  userId : number;
  userName : string;
  emailId : string;
  role : string;
  employeeId : number
}

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private apiUrl = "http://localhost:8080/leave";

  constructor(private http : HttpClient) { }

  getReports() : Observable<Report[]> {
    return this.http.get<Report[]>(`${this.apiUrl}/report`).pipe(
      catchError(error => {
        console.error("Report data not found - ", error);
        return throwError(() => new Error(error.message));
      })
    );
  }

  getLeaveBalance(emailId : string) : Observable<LeaveBalance> {
    return this.http.get<LeaveBalance>(`${this.apiUrl}/balance/employee/${emailId}`).pipe(
      catchError(error => {
        console.log("Leave Balance data not found - ", error);
        return throwError(() => new Error(error.message));
      })
    );
  }

  getLeaveRequest(emailId : string) : Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(`${this.apiUrl}/request/employee/${emailId}`).pipe(
      catchError(error => {
        console.log("Leave Request data not found - ", error);
        return throwError(() => new Error(error.message));
      })
    );
  }

  getPendingLeaveRequests() : Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(`${this.apiUrl}/request`).pipe(
      catchError(error => {
        console.log("Leave Request data not found - ", error);
        return throwError(() => new Error(error.message));
      })
    );
  }

  getUser(emailId : string) : Observable<Users>{
    return this.http.get<Users>(`${this.apiUrl}/user/dashboard/${emailId}`).pipe(
      catchError(error => {
        console.log("User data not found - ", error);
        return throwError(() => new Error(error.message));
      })
    );
  }

  getAllEmployees() : Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.apiUrl}/employee`).pipe(
      catchError(error => {
        console.log("No user found - ", error);
        return throwError(() => new Error(error.message));
      })
    );
  }

  postEmployee(credentials : any) : Observable<any> {
    return this.http.post(`${this.apiUrl}/user/add`, credentials).pipe(
      catchError(error => {
        console.log("Failed to post employee", error);
        return throwError(() => new Error(error.message));
      })
    );
  }

  postLeaveBalance(data : any) : Observable<any> {
    return this.http.post(`${this.apiUrl}/balance/add`, data).pipe(
      catchError(error => {
        console.log("Failed to add leave balance - ", error);
        return throwError(() => new Error(error.message));
      })
    );
  }

  postLeaveRequest(data : any) : Observable<any> {
    return this.http.post(`${this.apiUrl}/request/add`, data).pipe(
      catchError(error => {
        console.log("Failed to apply leave - ", error);
        return throwError(() => Error(error.message));
      })
    );
  }

  patchLeaveRequest(data : any) : Observable<any> {
    return this.http.patch(`${this.apiUrl}/request/update/${data.leaveRequestId}`, data).pipe(
      catchError(error => {
        console.log("Failed to approve - ", error);
        return throwError(() => new Error(error.message));
      })  
    );
  }

}
